import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter | null = null;
  private readonly logger = new Logger(MailService.name);

  constructor() {
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : NaN;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpPort && smtpUser && smtpPass) {
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        requireTLS: smtpPort === 587,
        tls: {
          rejectUnauthorized: false,
        },
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        family: 4,
      });
      this.logger.log('SMTP configuré pour l’envoi d’email.');
    } else {
      this.logger.warn('SMTP non configuré. Les emails ne seront pas envoyés.');
    }
  }

  private async safeSendMail(mailOptions: any) {
    if (!this.transporter) {
      this.logger.warn(`SMTP non configuré. Mail skipped: ${mailOptions.subject}`);
      return null;
    }

    try {
      return await this.transporter.sendMail(mailOptions);
    } catch (error: any) {
      const message = error?.message || String(error);
      this.logger.warn(`Échec envoi mail (${mailOptions.subject}): ${message}`);
      return null;
    }
  }

  async sendReservationNotification(data: any) {
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER || 'yolaab.app@gmail.com',
      to: process.env.RESERVATION_RECIPIENT || 'yolaab.app@gmail.com',
      subject: `Nouvelle réservation de ${data.nom || ''} ${data.prenom || ''}`,
      html: this.generateReservationEmailContent(data),
    };

    return await this.safeSendMail(mailOptions);
  }

  private generateReservationEmailContent(data: any): string {
    const serviceLabels: { [key: string]: string } = {
      'nettoyage-automobile': 'Nettoyage Automobile',
      'tapis': 'Nettoyage de Tapis',
      'canapes': 'Nettoyage de Canapés',
      'fin-de-chantier': 'Fin de Chantier',
      'entretien-bureaux': 'Entretien Bureaux'
    };

    let html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
          Nouvelle demande de réservation Yolaab
        </h2>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e40af; margin-top: 0;">Informations du client</h3>
          <p><strong>Nom:</strong> ${data.nom || 'Non fourni'}</p>
          <p><strong>Prénom:</strong> ${data.prenom || 'Non fourni'}</p>
          <p><strong>Téléphone:</strong> ${data.telephone || 'Non fourni'}</p>
          <p><strong>Localisation:</strong> ${data.localisation || 'Non fournie'}</p>
        </div>
        
        <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #059669; margin-top: 0;">Service demandé</h3>
          <p><strong>Type de service:</strong> ${serviceLabels[data.typeService] || data.typeService || 'Non spécifié'}</p>
    `;

    // Ajouter les détails spécifiques selon le service
    if (data.serviceDetails) {
      html += `<h4 style="color: #059669; margin-top: 15px;">Détails du service</h4>`;

      switch (data.typeService) {
        case 'canapes':
          if (data.serviceDetails.places) {
            html += `<p><strong>Nombre de places:</strong> ${data.serviceDetails.places}</p>`;
          }
          break;

        case 'tapis':
          if (data.serviceDetails.longueur && data.serviceDetails.largeur) {
            const surface = data.serviceDetails.longueur * data.serviceDetails.largeur;
            html += `<p><strong>Dimensions:</strong> ${data.serviceDetails.longueur}m x ${data.serviceDetails.largeur}m</p>`;
            html += `<p><strong>Surface:</strong> ${surface}m²</p>`;
          }
          break;

        case 'nettoyage-automobile':
          if (data.serviceDetails.typeVehicule) {
            html += `<p><strong>Type de véhicule:</strong> ${data.serviceDetails.typeVehicule}</p>`;
          }
          break;

        case 'fin-de-chantier':
          if (data.serviceDetails.surface) {
            html += `<p><strong>Surface à nettoyer:</strong> ${data.serviceDetails.surface}m²</p>`;
          }
          break;

        case 'entretien-bureaux':
          if (data.serviceDetails.nombrePieces) {
            html += `<p><strong>Nombre de pièces/bureaux:</strong> ${data.serviceDetails.nombrePieces}</p>`;
          }
          break;
      }
    }

    html += `
        </div>
        
        <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
          <p style="margin: 0; color: #92400e;">
            <strong>Action requise:</strong> Contactez le client rapidement pour confirmer la disponibilité et planifier l'intervention.
          </p>
        </div>
        
        <p style="color: #6b7280; font-size: 12px; text-align: center; margin-top: 30px;">
          Cet email a été envoyé automatiquement depuis l'application Yolaab.
        </p>
      </div>
    `;

    return html;
  }

  async sendDevisNotification(data: any) {
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER || 'yolaab.app@gmail.com',
      to: process.env.DEVIS_RECIPIENT || 'yolaab.app@gmail.com',
      subject: `Nouvelle demande de nettoyage professionnel de ${data.nom || ''} ${data.prenom || ''}`,
      html: this.generateDevisEmailContent(data),
    };

    return await this.safeSendMail(mailOptions);
  }

  private generateDevisEmailContent(data: any): string {
    const serviceLabels: { [key: string]: string } = {
      'nettoyage-automobile': 'Nettoyage Automobile',
      'tapis': 'Nettoyage de Tapis',
      'canapes': 'Nettoyage de Canapés',
      'fin-de-chantier': 'Fin de Chantier',
      'entretien-bureaux': 'Entretien Bureaux'
    };

    let html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
          Nouvelle demande de nettoyage professionnel Yolaab
        </h2>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e40af; margin-top: 0;">Informations du client</h3>
          <p><strong>Nom:</strong> ${data.nom || 'Non fourni'}</p>
          <p><strong>Prénom:</strong> ${data.prenom || 'Non fourni'}</p>
          <p><strong>Téléphone:</strong> ${data.telephone || 'Non fourni'}</p>
          <p><strong>Localisation:</strong> ${data.localisation || 'Non fournie'}</p>
        </div>
        
        <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #059669; margin-top: 0;">Service demandé</h3>
          <p><strong>Type de service:</strong> ${serviceLabels[data.typeService] || data.typeService || 'Non spécifié'}</p>
    `;

    // Ajouter les détails spécifiques selon le service
    if (data.serviceDetails) {
      // Si c'est une chaîne JSON, parser-la
      let serviceDetails = data.serviceDetails;
      if (typeof serviceDetails === 'string') {
        try {
          serviceDetails = JSON.parse(serviceDetails);
        } catch (e) {
          serviceDetails = data.serviceDetails;
        }
      }

      html += `<h4 style="color: #059669; margin-top: 15px;">Détails du service</h4>`;

      switch (data.typeService) {
        case 'canapes':
          if (serviceDetails.places) {
            html += `<p><strong>Nombre de places:</strong> ${serviceDetails.places}</p>`;
          }
          break;

        case 'tapis':
          if (serviceDetails.longueur && serviceDetails.largeur) {
            const surface = serviceDetails.longueur * serviceDetails.largeur;
            html += `<p><strong>Dimensions:</strong> ${serviceDetails.longueur}m x ${serviceDetails.largeur}m</p>`;
            html += `<p><strong>Surface:</strong> ${surface}m²</p>`;
          }
          break;

        case 'nettoyage-automobile':
          if (serviceDetails.typeVehicule) {
            html += `<p><strong>Type de véhicule:</strong> ${serviceDetails.typeVehicule}</p>`;
          }
          break;

        case 'fin-de-chantier':
          if (serviceDetails.surface) {
            html += `<p><strong>Surface à nettoyer:</strong> ${serviceDetails.surface}m²</p>`;
          }
          break;

        case 'entretien-bureaux':
          if (serviceDetails.nombrePieces) {
            html += `<p><strong>Nombre de pièces/bureaux:</strong> ${serviceDetails.nombrePieces}</p>`;
          }
          break;
      }
    }

    html += `
        </div>
        
        <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
          <p style="margin: 0; color: #92400e;">
            <strong>Action requise:</strong> Contactez le client rapidement pour proposer un devis et planifier l'intervention.
          </p>
        </div>
        
        <p style="color: #6b7280; font-size: 12px; text-align: center; margin-top: 30px;">
          Cet email a été envoyé automatiquement depuis l'application Yolaab.
        </p>
      </div>
    `;

    return html;
  }
}
