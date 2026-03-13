import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class DevisService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  async sendDevisEmail(payload: any) {
    // Ne transmet que les champs essentiels
    const minimalPayload = {
      nom: payload.nom || '',
      prenom: payload.prenom || '',
      email: payload.email || '',
      telephone: payload.telephone || '',
      localisation: payload.localisation || '',
      typeService: payload.typeService || '',
    };
    try {
      await this.mailService.sendDevisNotification(minimalPayload);
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
