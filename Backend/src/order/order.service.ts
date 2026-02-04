import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.order.create({ 
      data: { ...data, items: JSON.stringify(data.items) } 
    });
  }

  async findAll() {
    const orders = await this.prisma.order.findMany({ orderBy: { createdAt: 'desc' } });
    return orders.map(order => ({
      ...order,
      items: JSON.parse(order.items),
    }));
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    return order ? { ...order, items: JSON.parse(order.items) } : null;
  }

  async update(id: string, data: any) {
    return this.prisma.order.update({ 
      where: { id }, 
      data: { ...data, items: JSON.stringify(data.items) } 
    });
  }

  async remove(id: string) {
    return this.prisma.order.delete({ where: { id } });
  }
}
