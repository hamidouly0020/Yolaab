// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';

// @Injectable()
// export class ReservationService {
//   constructor(private prisma: PrismaService) {}

//   async create(data: any) {
//     return this.prisma.reservation.create({
//       data,
//     });
//   }

//   async findAll() {
//     return this.prisma.reservation.findMany({
//       orderBy: { createdAt: 'desc' },
//     });
//   }

//   async findOne(id: string) {
//     return this.prisma.reservation.findUnique({
//       where: { id },
//     });
//   }

//   async update(id: string, data: any) {
//     return this.prisma.reservation.update({
//       where: { id },
//       data,
//     });
//   }

//   async remove(id: string) {
//     return this.prisma.reservation.delete({
//       where: { id },
//     });
//   }
// }

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    if (data.serviceDetails && typeof data.serviceDetails === 'object') {
      data.serviceDetails = JSON.stringify(data.serviceDetails);
    }
    return this.prisma.reservation.create({
      data,
    });
  }

  async findAll() {
    const reservations = await this.prisma.reservation.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return reservations.map(r => ({
      ...r,
      serviceDetails: (r as any).serviceDetails ? JSON.parse((r as any).serviceDetails) : null,
    }));
  }

  async findOne(id: string) {
    const r = await this.prisma.reservation.findUnique({ where: { id } });
    if (!r) return null;
    return {
      ...r,
      serviceDetails: (r as any).serviceDetails ? JSON.parse((r as any).serviceDetails) : null,
    };
  }

  async update(id: string, data: any) {
    if (data.serviceDetails && typeof data.serviceDetails === 'object') {
      data.serviceDetails = JSON.stringify(data.serviceDetails);
    }
    return this.prisma.reservation.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.reservation.delete({ where: { id } });
  }
}