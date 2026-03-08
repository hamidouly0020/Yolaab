import { Injectable, InternalServerErrorException } from '@nestjs/common'
import * as nodemailer from 'nodemailer'
import { PrismaService } from '../prisma/prisma.service'

interface EmailLogEntry {
  to: string
  subject: string
  body: string
  status: string
  response?: any
}

@Injectable()
export class DevisService {
  private transporter: nodemailer.Transporter | null = null
  constructor(private prisma: PrismaService) {}

  private async getTransporter() {
    if (this.transporter) return this.transporter
    const host = process.env.SMTP_HOST
    const port = parseInt(process.env.SMTP_PORT || '587', 10)
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS

    if (!host || !user || !pass) {
      throw new InternalServerErrorException('SMTP configuration missing (SMTP_HOST/SMTP_USER/SMTP_PASS)')
    }

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      debug: true, // Enable debug logging
      logger: true, // Enable logger
    })

    // Verify connection
    try {
      await this.transporter.verify()
      console.log('SMTP connection verified successfully')
    } catch (error) {
      console.error('SMTP connection failed:', error)
      throw new InternalServerErrorException(`SMTP connection failed: ${error.message}`)
    }

    return this.transporter
  }

  async sendDevisEmail(payload: any) {
    const transporter = await this.getTransporter()

    const adminEmail = process.env.DEVIS_RECIPIENT || 'yolaab.app@gmail.com'

    const subject = `Nouvelle demande de devis — ${payload.service || payload.typeService || 'Service'}`
    const bodyLines: string[] = []
    bodyLines.push('Nouvelle demande de devis reçue via le site Yolaab')
    bodyLines.push('')
    bodyLines.push(`Nom: ${payload.nom || ''}`)
    bodyLines.push(`Prénom: ${payload.prenom || ''}`)
    bodyLines.push(`Téléphone: ${payload.telephone || ''}`)
    bodyLines.push(`Localisation: ${payload.localisation || ''}`)
    bodyLines.push(`Service: ${payload.service || payload.typeService || ''}`)
    bodyLines.push('')
    bodyLines.push('Description:')
    bodyLines.push(payload.description || '')
    bodyLines.push('')
    if (payload.serviceDetails) {
      bodyLines.push('Détails du service:')
      try {
        const details = typeof payload.serviceDetails === 'string' ? JSON.parse(payload.serviceDetails) : payload.serviceDetails
        bodyLines.push(JSON.stringify(details, null, 2))
      } catch (e) {
        bodyLines.push(String(payload.serviceDetails))
      }
    }

    const text = bodyLines.join('\n')

    const emailLog: EmailLogEntry = { to: adminEmail, subject, body: text, status: 'pending' }
    try {
      const info = await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: adminEmail,
        subject,
        text,
      })
      emailLog.status = 'sent'
      emailLog.response = info
      console.log('Devis email sent:', info.messageId || info)
      // persist email log
      try {
        await this.prisma.emailLog.create({ data: { to: emailLog.to, subject: emailLog.subject, body: emailLog.body, status: emailLog.status, response: JSON.stringify(emailLog.response || {}) } })
      } catch (e) {
        console.warn('Failed to persist email log', e)
      }
      return { ok: true, info }
    } catch (err) {
      console.error('Error sending devis email', err)
      emailLog.status = 'failed'
      emailLog.response = String(err?.message || err)
      try {
        await this.prisma.emailLog.create({ data: { to: emailLog.to, subject: emailLog.subject, body: emailLog.body, status: emailLog.status, response: emailLog.response } })
      } catch (e) {
        console.warn('Failed to persist failed email log', e)
      }
      throw new InternalServerErrorException('Erreur lors de l\'envoi de l\'e-mail')
    }
  }

  // create a Devis record and send email + log
  async create(payload: any) {
    try {
      const created = await this.prisma.devis.create({ data: {
        nom: payload.nom || '',
        prenom: payload.prenom || '',
        telephone: payload.telephone || '',
        localisation: payload.localisation || null,
        typeService: payload.typeService || '',
        description: payload.description || '',
        serviceDetails: payload.serviceDetails ? (typeof payload.serviceDetails === 'string' ? payload.serviceDetails : JSON.stringify(payload.serviceDetails)) : null,
      } })

      // attempt to send email (best-effort)
      try {
        await this.sendDevisEmail(payload)
      } catch (e) {
        // sendDevisEmail already logs emailLog and throws; we swallow to not fail creation
        console.warn('Email sending failed after creating devis', e)
      }

      return created
    } catch (err) {
      console.error('Failed to create devis', err)
      throw new InternalServerErrorException('Erreur serveur lors de la création de la demande')
    }
  }
}
