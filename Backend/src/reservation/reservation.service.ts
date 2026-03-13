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
import { MailService } from '../mail/mail.service';

@Injectable()
export class ReservationService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  async create(data: any) {
    if (data.serviceDetails && typeof data.serviceDetails === 'object') {
      data.serviceDetails = JSON.stringify(data.serviceDetails);
    }
    const created = await this.prisma.reservation.create({ data });
    // Envoi notification admin via Resend
    try {
      await this.mailService.sendReservationNotification(
        `${data.nom || ''} ${data.prenom || ''}`,
        data.email || '',
        data.description || ''
      );
    } catch (e) {
      console.warn('[RESERVATION EMAIL] Erreur lors de l\'envoi de la notification admin', e);
    }
    return created;

    // Send notification email in background (fire and forget)
    this.sendReservationEmail(created).catch(e => {
      console.warn('Background email sending failed after creating reservation', e)
    })

    return created
  }

  private async sendReservationEmail(created: any) {
    try {
      const transporter = getTransporter()
      if (!transporter) {
        console.warn('[RESERVATION EMAIL] Transporter not configured, skipping email')
        return
      }
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

        try {
          console.log(`[RESERVATION EMAIL] Sending email to ${admin}`)
          const info = await transporter.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: admin,
            subject,
            text: lines.join('\n'),
          })
          console.log('[RESERVATION EMAIL] ✓ Email sent successfully:', info.messageId || 'no messageId')
          try {
            await this.prisma.emailLog.create({ data: { to: admin, subject, body: lines.join('\n'), status: 'sent', response: JSON.stringify(info || {}) } })
          } catch (e) {
            console.warn('[RESERVATION EMAIL LOG] Failed to persist reservation email log', e)
          }
        } catch (mailErr) {
          console.error('[RESERVATION EMAIL] ✗ Error sending reservation email', {
            error: mailErr.message,
            code: (mailErr as any).code,
            command: (mailErr as any).command,
          })
          throw mailErr
        }
      }
    } catch (err) {
      console.error('[RESERVATION EMAIL] ✗ Failed to send reservation email', err)
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