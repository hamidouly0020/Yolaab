import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    try {
      return await this.prisma.invoice.create({ data });
    } catch (err) {
      console.error('Failed to create invoice', err);
      throw new InternalServerErrorException('Erreur serveur lors de la création de la facture');
    }
  }

  async findAll() {
    try {
      return await this.prisma.invoice.findMany({ orderBy: { createdAt: 'desc' } });
    } catch (err) {
      console.error('Failed to fetch invoices', err);
      throw new InternalServerErrorException('Erreur serveur lors de la récupération des factures');
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.invoice.findUnique({ where: { id } });
    } catch (err) {
      console.error('Failed to fetch invoice', err);
      throw new InternalServerErrorException('Erreur serveur lors de la récupération de la facture');
    }
  }

  async update(id: string, data: any) {
    try {
      return await this.prisma.invoice.update({ where: { id }, data });
    } catch (err) {
      console.error('Failed to update invoice', err);
      throw new InternalServerErrorException('Erreur serveur lors de la mise à jour de la facture');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.invoice.delete({ where: { id } });
    } catch (err) {
      console.error('Failed to delete invoice', err);
      throw new InternalServerErrorException('Erreur serveur lors de la suppression de la facture');
    }
  }
}
