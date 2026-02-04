import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.application.create({ data });
  }

  async findAll() {
    return this.prisma.application.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: string) {
    return this.prisma.application.findUnique({ where: { id } });
  }

  async update(id: string, data: any) {
    return this.prisma.application.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.application.delete({ where: { id } });
  }
}
