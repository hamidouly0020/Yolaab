import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RealisationService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.realisation.create({ data });
  }

  async findAll() {
    return this.prisma.realisation.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async remove(id: string) {
    return this.prisma.realisation.delete({ where: { id } });
  }
}
