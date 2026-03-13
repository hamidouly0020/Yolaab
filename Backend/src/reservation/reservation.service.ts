

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
      await this.mailService.sendReservationNotification(data);
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
      // Notification admin via Resend
      const admin = process.env.DEVIS_RECIPIENT || process.env.RESERVATION_RECIPIENT || 'yolaab.app@gmail.com';
      const subject = `Nouvelle réservation — ${created.typeService || 'Service'}`;
      const html = `<p>Nom: ${created.nom || ''}</p><p>Prénom: ${created.prenom || ''}</p><p>Téléphone: ${created.telephone || ''}</p><p>Localisation: ${created.localisation || ''}</p><p>Service: ${created.typeService || ''}</p><p>Détails: ${created.serviceDetails ? (typeof created.serviceDetails === 'string' ? created.serviceDetails : JSON.stringify(created.serviceDetails)) : ''}</p>`;
      await this.mailService.sendReservationNotification(created);
    } catch (e) {
      console.warn('[RESERVATION EMAIL] Erreur lors de l\'envoi de la notification admin', e);
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