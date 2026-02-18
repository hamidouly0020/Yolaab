import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    // Attempt to connect with retries to handle transient DB outages
    const maxRetries = 5;
    let attempt = 0;
    while (attempt < maxRetries) {
      try {
        await this.$connect();
        console.log('Prisma connected')
        break;
      } catch (err) {
        attempt++;
        const delay = Math.pow(2, attempt) * 1000;
        console.error(`Prisma connect attempt ${attempt} failed. Retrying in ${delay}ms...`, err?.message || err);
        await new Promise((res) => setTimeout(res, delay));
      }
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
