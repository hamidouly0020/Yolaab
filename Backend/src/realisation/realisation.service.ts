import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';

@Injectable()
export class RealisationService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    // Try to create in DB, but if DB is down, persist to local cache so content is not lost
    try {
      const created = await this.prisma.realisation.create({ data });
      // update cache
      try {
        const cacheDir = resolve(process.cwd(), 'data');
        if (!existsSync(cacheDir)) mkdirSync(cacheDir, { recursive: true });
        const cacheFile = resolve(cacheDir, 'realisations_cache.json');
        const existing = existsSync(cacheFile) ? JSON.parse(readFileSync(cacheFile, 'utf-8')) : [];
        existing.unshift(created);
        writeFileSync(cacheFile, JSON.stringify(existing.slice(0, 200), null, 2), 'utf-8');
      } catch (e) {
        // ignore cache errors
      }
      return created;
    } catch (err) {
      console.error('Prisma create failed, saving to local cache', err?.code || err?.message || err);
      // Persist locally as fallback
      try {
        const cacheDir = resolve(process.cwd(), 'data');
        if (!existsSync(cacheDir)) mkdirSync(cacheDir, { recursive: true });
        const cacheFile = resolve(cacheDir, 'realisations_cache.json');
        const existing = existsSync(cacheFile) ? JSON.parse(readFileSync(cacheFile, 'utf-8')) : [];
        const offlineRecord = { id: `offline-${Date.now()}`, ...data, createdAt: new Date().toISOString() };
        existing.unshift(offlineRecord);
        writeFileSync(cacheFile, JSON.stringify(existing.slice(0, 200), null, 2), 'utf-8');
        return offlineRecord;
      } catch (e) {
        throw err;
      }
    }
  }

  async findAll(page: number = 1, limit: number = 20) {
    const skip = Math.max(0, (page - 1) * limit);
    try {
      return await this.prisma.realisation.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      });
    } catch (err: any) {
      // If DB is unreachable (eg P1001), log and try to return cached entries from filesystem
      console.error('Prisma error in RealisationService.findAll:', err?.code || err?.message || err);
      try {
        const cacheFile = resolve(process.cwd(), 'data', 'realisations_cache.json');
        if (existsSync(cacheFile)) {
          const cached = JSON.parse(readFileSync(cacheFile, 'utf-8'));
          return cached.slice(skip, skip + limit);
        }
      } catch (e) {
        // ignore
      }
      return [];
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.realisation.delete({ where: { id } });
    } catch (err) {
      console.error('Failed to delete realisation', err);
      throw new InternalServerErrorException('Erreur serveur lors de la suppression de la réalisation');
    }
  }
}
