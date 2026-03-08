// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';

// @Injectable()
// export class ReservationService {
//   constructor(private prisma: PrismaService) {}

//   async create(data: any) {
//     return this.prisma.reservation.create({
//       data,
//     });
//   }

//   async findAll() {
//     return this.prisma.reservation.findMany({
//       orderBy: { createdAt: 'desc' },
//     });
//   }

//   async findOne(id: string) {
//     return this.prisma.reservation.findUnique({
//       where: { id },
//     });
//   }

//   async update(id: string, data: any) {
//     return this.prisma.reservation.update({
//       where: { id },
//       data,
//     });
//   }

//   async remove(id: string) {
//     return this.prisma.reservation.delete({
//       where: { id },
//     });
//   }
// }

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as nodemailer from 'nodemailer';

function getTransporter() {
  const host = process.env.SMTP_HOST
  const port = parseInt(process.env.SMTP_PORT || '587', 10)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    // don't throw here to avoid breaking reservation creation in dev without config
    console.warn('SMTP not configured; reservation emails will not be sent')
    return null
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })
}

@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    if (data.serviceDetails && typeof data.serviceDetails === 'object') {
      data.serviceDetails = JSON.stringify(data.serviceDetails);
    }
    const created = await this.prisma.reservation.create({ data })

    // Send notification email in background (fire and forget)
    this.sendReservationEmail(created).catch(e => {
      console.warn('Background email sending failed after creating reservation', e)
    })

    return created
  }

  private async sendReservationEmail(created: any) {
    try {
      const transporter = getTransporter()
      if (transporter) {
        const admin = process.env.DEVIS_RECIPIENT || process.env.RESERVATION_RECIPIENT || 'yolaab.app@gmail.com'
        const subject = `Nouvelle réservation — ${created.typeService || 'Service'}`
        const lines: string[] = []
        lines.push('Nouvelle réservation reçue via Yolaab')
        lines.push(`Nom: ${created.nom || ''}`)
        lines.push(`Prénom: ${created.prenom || ''}`)
        lines.push(`Téléphone: ${created.telephone || ''}`)
        lines.push(`Localisation: ${created.localisation || ''}`)
        lines.push(`Service: ${created.typeService || ''}`)
        lines.push('')
        lines.push('Détails:')
        lines.push(created.serviceDetails ? (typeof created.serviceDetails === 'string' ? created.serviceDetails : JSON.stringify(created.serviceDetails)) : '')

        const info = await transporter.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: admin,
          subject,
          text: lines.join('\n'),
        })
        console.log('Reservation email sent:', info.messageId || info);
        try {
          await this.prisma.emailLog.create({ data: { to: admin, subject, body: lines.join('\n'), status: 'sent', response: JSON.stringify(info || {}) } })
        } catch (e) {
          console.warn('Failed to persist reservation email log', e)
        }
      }
    } catch (err) {
      console.error('Failed to send reservation email', err)
    }
  }

  async findAll() {
    const reservations = await this.prisma.reservation.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return reservations.map(r => ({
      ...r,
      serviceDetails: (r as any).serviceDetails ? JSON.parse((r as any).serviceDetails) : null,
    }));
  }

  async findOne(id: string) {
    try {
      const r = await this.prisma.reservation.findUnique({ where: { id } });
      if (!r) return null;
      return {
        ...r,
        serviceDetails: (r as any).serviceDetails ? JSON.parse((r as any).serviceDetails) : null,
      };
    } catch (err) {
      console.error('Failed to fetch reservation', err);
      throw new InternalServerErrorException('Erreur serveur lors de la récupération de la réservation');
    }
  }

  async update(id: string, data: any) {
    try {
      if (data.serviceDetails && typeof data.serviceDetails === 'object') {
        data.serviceDetails = JSON.stringify(data.serviceDetails);
      }
      return await this.prisma.reservation.update({ where: { id }, data });
    } catch (err) {
      console.error('Failed to update reservation', err);
      throw new InternalServerErrorException('Erreur serveur lors de la mise à jour de la réservation');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.reservation.delete({ where: { id } });
    } catch (err) {
      console.error('Failed to delete reservation', err);
      throw new InternalServerErrorException('Erreur serveur lors de la suppression de la réservation');
    }
  }
}