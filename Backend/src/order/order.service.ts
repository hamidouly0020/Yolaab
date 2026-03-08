import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    try {
      return await this.prisma.order.create({
        data: { ...data, items: JSON.stringify(data.items) }
      });
    } catch (err) {
      console.error('Failed to create order', err);
      throw new InternalServerErrorException('Erreur serveur lors de la création de la commande');
    }
  }

  async findAll() {
    try {
      const orders = await this.prisma.order.findMany({ orderBy: { createdAt: 'desc' } });
      return orders.map(order => ({
        ...order,
        items: JSON.parse(order.items),
      }));
    } catch (err) {
      console.error('Failed to fetch orders', err);
      throw new InternalServerErrorException('Erreur serveur lors de la récupération des commandes');
    }
  }

  async findOne(id: string) {
    try {
      const order = await this.prisma.order.findUnique({ where: { id } });
      return order ? { ...order, items: JSON.parse(order.items) } : null;
    } catch (err) {
      console.error('Failed to fetch order', err);
      throw new InternalServerErrorException('Erreur serveur lors de la récupération de la commande');
    }
  }

  async update(id: string, data: any) {
    try {
      return await this.prisma.order.update({
        where: { id },
        data: { ...data, items: JSON.stringify(data.items) }
      });
    } catch (err) {
      console.error('Failed to update order', err);
      throw new InternalServerErrorException('Erreur serveur lors de la mise à jour de la commande');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.order.delete({ where: { id } });
    } catch (err) {
      console.error('Failed to delete order', err);
      throw new InternalServerErrorException('Erreur serveur lors de la suppression de la commande');
    }
  }
}
