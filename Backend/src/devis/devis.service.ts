import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class DevisService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  async sendDevisEmail(payload: any) {
    // Construction du message
    const subject = `Nouvelle demande de devis — ${payload.service || payload.typeService || 'Service'}`;
    let details = '';
    if (payload.serviceDetails) {
      try {
        details = typeof payload.serviceDetails === 'string' ? payload.serviceDetails : JSON.stringify(payload.serviceDetails);
      } catch (e) {
        details = String(payload.serviceDetails);
      }
    }
    const html = `<p>Nom: ${payload.nom || ''}</p><p>Prénom: ${payload.prenom || ''}</p><p>Téléphone: ${payload.telephone || ''}</p><p>Localisation: ${payload.localisation || ''}</p><p>Service: ${payload.service || payload.typeService || ''}</p><p>Description: ${payload.description || ''}</p><p>Détails: ${details}</p>`;
    try {
      await this.mailService.sendDevisNotification(
        `${payload.nom || ''} ${payload.prenom || ''}`,
        payload.email || '',
        html
      );
      return { ok: true };
    } catch (err) {
      throw new InternalServerErrorException('Erreur lors de l\'envoi de l\'e-mail');
    }
  }

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
      } });

      // Envoi notification admin via Resend
      try {
        await this.sendDevisEmail(payload);
      } catch (e) {
        console.warn('[DEVIS EMAIL] Erreur lors de l\'envoi de la notification admin', e);
      }

      return created;
    } catch (err) {
      console.error('[DEVIS CREATE] Failed to create devis', err);
      throw new InternalServerErrorException('Erreur serveur lors de la création de la demande');
    }
  }
}
      }
    }

    const text = bodyLines.join('\n')

    const emailLog: EmailLogEntry = { to: adminEmail, subject, body: text, status: 'pending' }
    try {
      console.log(`[DEVIS EMAIL] Sending email to ${adminEmail}`)
      const info = await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: adminEmail,
        subject,
        text,
      })
      emailLog.status = 'sent'
      emailLog.response = info
      console.log('[DEVIS EMAIL] ✓ Email sent successfully:', info.messageId || 'no messageId')
      // persist email log
      try {
        await this.prisma.emailLog.create({ data: { to: emailLog.to, subject: emailLog.subject, body: emailLog.body, status: emailLog.status, response: JSON.stringify(emailLog.response || {}) } })
      } catch (e) {
        console.warn('[DEVIS EMAIL LOG] Failed to persist email log', e)
      }
      return { ok: true, info }
    } catch (err) {
      console.error('[DEVIS EMAIL] ✗ Error sending devis email', {
        error: err.message,
        code: (err as any).code,
        command: (err as any).command,
      })
      emailLog.status = 'failed'
      emailLog.response = String(err?.message || err)
      try {
        await this.prisma.emailLog.create({ data: { to: emailLog.to, subject: emailLog.subject, body: emailLog.body, status: emailLog.status, response: emailLog.response } })
      } catch (e) {
        console.warn('[DEVIS EMAIL LOG] Failed to persist failed email log', e)
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

      // Send email in background (fire and forget) - don't block creation if email fails
      this.sendDevisEmail(payload).catch(e => {
        console.warn('[DEVIS] Background email sending failed (demande still saved):', e.message)
      })

      return created
    } catch (err) {
      console.error('[DEVIS CREATE] Failed to create devis', err)
      throw new InternalServerErrorException('Erreur serveur lors de la création de la demande')
    }
  }
}
