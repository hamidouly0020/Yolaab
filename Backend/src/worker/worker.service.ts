import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WorkerService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    try {
      return await this.prisma.worker.create({ data });
    } catch (err) {
      console.error('Failed to create worker', err);
      throw new InternalServerErrorException('Erreur serveur lors de la création de l\'ouvrier');
    }
  }

  async findAll() {
    try {
      return await this.prisma.worker.findMany({ orderBy: { createdAt: 'desc' } });
    } catch (err) {
      console.error('Failed to fetch workers', err);
      throw new InternalServerErrorException('Erreur serveur lors de la récupération des ouvriers');
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.worker.findUnique({ where: { id } });
    } catch (err) {
      console.error('Failed to fetch worker', err);
      throw new InternalServerErrorException('Erreur serveur lors de la récupération de l\'ouvrier');
    }
  }

  async update(id: string, data: any) {
    try {
      return await this.prisma.worker.update({ where: { id }, data });
    } catch (err) {
      console.error('Failed to update worker', err);
      throw new InternalServerErrorException('Erreur serveur lors de la mise à jour de l\'ouvrier');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.worker.delete({ where: { id } });
    } catch (err) {
      console.error('Failed to delete worker', err);
      throw new InternalServerErrorException('Erreur serveur lors de la suppression de l\'ouvrier');
    }
  }
}
