import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    try {
      return await this.prisma.product.create({ data });
    } catch (err) {
      console.error('Failed to create product', err);
      throw new InternalServerErrorException('Erreur serveur lors de la création du produit');
    }
  }

  async findAll(page: number = 1, limit: number = 20) {
    try {
      const skip = Math.max(0, (page - 1) * limit);
      return await this.prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      });
    } catch (err) {
      console.error('Failed to fetch products', err);
      throw new InternalServerErrorException('Erreur serveur lors de la récupération des produits');
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.product.findUnique({ where: { id } });
    } catch (err) {
      console.error('Failed to fetch product', err);
      throw new InternalServerErrorException('Erreur serveur lors de la récupération du produit');
    }
  }

  async update(id: string, data: any) {
    try {
      return await this.prisma.product.update({ where: { id }, data });
    } catch (err) {
      console.error('Failed to update product', err);
      throw new InternalServerErrorException('Erreur serveur lors de la mise à jour du produit');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.product.delete({ where: { id } });
    } catch (err) {
      console.error('Failed to delete product', err);
      throw new InternalServerErrorException('Erreur serveur lors de la suppression du produit');
    }
  }
}
