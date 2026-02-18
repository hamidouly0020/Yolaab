import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RealisationService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.realisation.create({ data });
  }

  async findAll() {
    try {
      return await this.prisma.realisation.findMany({ orderBy: { createdAt: 'desc' } });
    } catch (err: any) {
      // If DB is unreachable (eg P1001), log and return empty array to keep frontend usable
      console.error('Prisma error in RealisationService.findAll:', err?.code || err?.message || err);
      return [];
    }
  }

  async remove(id: string) {
    return this.prisma.realisation.delete({ where: { id } });
  }
}
