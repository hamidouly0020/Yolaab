import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class DevisService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

    // Cache simple pour la liste des devis
    private devisCache: { [key: string]: any } = {};

    async findAll(params?: { limit?: number; offset?: number }) {
      const limit = params?.limit ?? 20;
      const offset = params?.offset ?? 0;
      const cacheKey = `devis_${limit}_${offset}`;
      if (this.devisCache[cacheKey]) {
        return this.devisCache[cacheKey];
      }
      const devis = await this.prisma.devis.findMany({
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit,
      });
      this.devisCache[cacheKey] = devis;
      return devis;
    }
  async sendDevisEmail(payload: any) {
    try {
      await this.mailService.sendDevisNotification(payload);
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

      // Send notification email in background (fire and forget - non-bloquant)
      this.sendDevisEmail(payload).catch(e => {
        console.error('[DEVIS EMAIL] Erreur lors de l\'envoi de la notification admin:', e);
      });

      return created;
    } catch (err) {
      console.error('[DEVIS CREATE] Failed to create devis', err);
      throw new InternalServerErrorException('Erreur serveur lors de la création de la demande');
    }
  }
}