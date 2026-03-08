import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    try {
      return await this.prisma.application.create({ data });
    } catch (err) {
      console.error('Failed to create application', err);
      throw new InternalServerErrorException('Erreur serveur lors de la création de la candidature');
    }
  }

  async findAll() {
    try {
      return await this.prisma.application.findMany({ orderBy: { createdAt: 'desc' } });
    } catch (err) {
      console.error('Failed to fetch applications', err);
      throw new InternalServerErrorException('Erreur serveur lors de la récupération des candidatures');
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.application.findUnique({ where: { id } });
    } catch (err) {
      console.error('Failed to fetch application', err);
      throw new InternalServerErrorException('Erreur serveur lors de la récupération de la candidature');
    }
  }

  async update(id: string, data: any) {
    try {
      return await this.prisma.application.update({ where: { id }, data });
    } catch (err) {
      console.error('Failed to update application', err);
      throw new InternalServerErrorException('Erreur serveur lors de la mise à jour de la candidature');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.application.delete({ where: { id } });
    } catch (err) {
      console.error('Failed to delete application', err);
      throw new InternalServerErrorException('Erreur serveur lors de la suppression de la candidature');
    }
  }
}
