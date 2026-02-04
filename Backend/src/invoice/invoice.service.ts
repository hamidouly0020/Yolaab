import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.invoice.create({ data });
  }

  async findAll() {
    return this.prisma.invoice.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: string) {
    return this.prisma.invoice.findUnique({ where: { id } });
  }

  async update(id: string, data: any) {
    return this.prisma.invoice.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.invoice.delete({ where: { id } });
  }
}
