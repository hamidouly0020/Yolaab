

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

    // Send notification email in background (fire and forget - non-bloquant)
    this.mailService.sendReservationNotification(created).catch(e => {
      console.error('[RESERVATION EMAIL] Erreur lors de l\'envoi de la notification admin:', e);
    });

    return created;
  }

  async findAll(params?: { limit?: number; offset?: number }) {
    const limit = params?.limit ?? 20;
    const offset = params?.offset ?? 0;
    const reservations = await this.prisma.reservation.findMany({
      orderBy: { createdAt: 'desc' },
      skip: offset,
      take: limit,
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