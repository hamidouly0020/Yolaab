import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendReservationNotification(data: any) {
    console.log('📧 Tentative envoi mail réservation...');
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.RESERVATION_RECIPIENT,
      subject: `Nouvelle réservation de ${data.nom || ''} ${data.prenom || ''}`,
      html:
        `<p>Nom: ${data.nom || ''}</p>` +
        `<p>Prénom: ${data.prenom || ''}</p>` +
        `<p>Email: ${data.email || ''}</p>` +
        `<p>Téléphone: ${data.telephone || ''}</p>` +
        `<p>Localisation: ${data.localisation || ''}</p>` +
        `<p>Service: ${data.typeService || ''}</p>`,
    };
    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('✅ Mail réservation envoyé avec succès:', info.messageId);
      return info;
    } catch (error) {
      console.error('❌ Erreur envoi mail réservation:', error.message);
      console.error('❌ Détails:', error);
      await this.transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: process.env.RESERVATION_RECIPIENT,
        subject: 'Erreur lors de l\'envoi de la notification réservation',
        html: `<p>Erreur : ${error?.message || error}</p>`,
      });
      throw error;
    }
  }

  async sendDevisNotification(data: any) {
    console.log('📧 Tentative envoi mail devis...');
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.DEVIS_RECIPIENT,
      subject: `Nouvelle demande de devis de ${data.nom || ''} ${data.prenom || ''}`,
      html:
        `<p>Nom: ${data.nom || ''}</p>` +
        `<p>Prénom: ${data.prenom || ''}</p>` +
        `<p>Email: ${data.email || ''}</p>` +
        `<p>Téléphone: ${data.telephone || ''}</p>` +
        `<p>Localisation: ${data.localisation || ''}</p>` +
        `<p>Service: ${data.typeService || ''}</p>`,
    };
    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log('✅ Mail devis envoyé avec succès:', result.messageId);
      return result;
    } catch (error) {
      console.error('❌ Erreur envoi mail devis:', error.message);
      console.error('❌ Détails:', error);
      await this.transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: process.env.DEVIS_RECIPIENT,
        subject: 'Erreur lors de l\'envoi de la notification devis',
        html: `<p>Erreur : ${error?.message || error}</p>`,
      });
      throw error;
    }
  }
}
