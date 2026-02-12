import { Controller, Get, Post, Delete, Param, Body, UseInterceptors, UploadedFile, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, resolve } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { RealisationService } from './realisation.service';

const uploadsPath = resolve(process.cwd(), 'uploads');
if (!existsSync(uploadsPath)) {
  mkdirSync(uploadsPath, { recursive: true });
}

const storage = diskStorage({
  destination: uploadsPath,
  filename: (req, file, cb) => {
    const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
    cb(null, `${randomName}${extname(file.originalname)}`);
  },
});

@Controller('realisations')
export class RealisationController {
  constructor(private readonly service: RealisationService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
      limits: { fileSize: 500 * 1024 * 1024 }, // 500 MB
    }),
  )
  async create(@Body() data: any, @UploadedFile() file?: Express.Multer.File) {
    try {
      console.log('Realisation create called', { body: data, file: file ? { originalname: file.originalname, mimetype: file.mimetype, filename: file.filename } : null });

      if (file) {
        data.url = `http://localhost:3000/uploads/${file.filename}`;
      }

      // ensure type is present
      if (!data.type) data.type = 'image';

      return this.service.create(data);
    } catch (err: any) {
      console.error('Error creating realisation', err);
      if (err.message && err.message.includes('Type de fichier')) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Erreur serveur lors de la création de la réalisation');
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.service.findAll();
    } catch (err) {
      console.error('Error fetching realisations', err);
      throw new InternalServerErrorException('Erreur serveur lors du chargement des réalisations');
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
