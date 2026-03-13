import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private resend: Resend;
  private adminEmail: string = 'yolaab.app@gmail.com';

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendReservationNotification(clientName: string, clientEmail: string, message: string) {
    return this.resend.emails.send({
      from: this.adminEmail,
      to: this.adminEmail,
      subject: `Nouvelle réservation de ${clientName}`,
      html: `<p>Nom: ${clientName}</p><p>Email: ${clientEmail}</p><p>Message: ${message}</p>`
    });
  }

  async sendDevisNotification(clientName: string, clientEmail: string, details: string) {
    return this.resend.emails.send({
      from: this.adminEmail,
      to: this.adminEmail,
      subject: `Nouvelle demande de devis de ${clientName}`,
      html: `<p>Nom: ${clientName}</p><p>Email: ${clientEmail}</p><p>Détails: ${details}</p>`
    });
  }
}
