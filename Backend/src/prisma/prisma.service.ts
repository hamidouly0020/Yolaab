import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

function isAuthError(message: string) {
  return message.includes('Authentication failed') || message.includes('invalid database credentials');
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    const maxRetries = 5;
    let attempt = 0;
    while (attempt < maxRetries) {
      try {
        await this.$connect();
        console.log('Prisma connected');
        break;
      } catch (err) {
        attempt++;
        const message = err?.message ? String(err.message) : String(err);
        if (isAuthError(message)) {
          console.error('Prisma connection failed: invalid database credentials. Please update Backend/.env DATABASE_URL.');
          break;
        }
        if (attempt >= maxRetries) {
          console.error(`Prisma connect attempt ${attempt} failed. No more retries.`, message);
          break;
        }
        const delay = Math.pow(2, attempt) * 1000;
        console.error(`Prisma connect attempt ${attempt} failed. Retrying in ${delay}ms...`, message);
        await new Promise((res) => setTimeout(res, delay));
      }
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
