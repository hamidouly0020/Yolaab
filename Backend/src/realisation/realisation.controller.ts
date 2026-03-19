import { Controller, Get, Post, Delete, Param, Body, UseInterceptors, UploadedFile, BadRequestException, InternalServerErrorException, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import multerStorageCloudinary from 'multer-storage-cloudinary';
import { extname, resolve } from 'path';
import { existsSync, mkdirSync, unlinkSync } from 'fs';
// Make AWS SDK optional to avoid compile errors when package is not installed
declare const require: any;
let S3Client: any, PutObjectCommand: any;
import { RealisationService } from './realisation.service';

const uploadsPath = resolve(process.cwd(), 'uploads');
if (!existsSync(uploadsPath)) {
  mkdirSync(uploadsPath, { recursive: true });
}

const storage = multerStorageCloudinary({
  cloudinary: require('cloudinary').v2,
  params: (req, file) => ({
    folder: 'uploads',
    resource_type: 'auto',
  }),
});

// Initialize S3 client only if env vars are provided (use STORAGE_TYPE="s3" to force)
let s3Client: any = null;
const S3_BUCKET = process.env.S3_BUCKET || '';
const useS3 = (process.env.STORAGE_TYPE === 's3') ||
  (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY && S3_BUCKET && process.env.AWS_REGION);
if (useS3) {
  try {
    const awsS3 = require('@aws-sdk/client-s3');
    S3Client = awsS3.S3Client;
    PutObjectCommand = awsS3.PutObjectCommand;
    s3Client = new S3Client({ region: process.env.AWS_REGION });
  } catch (e) {
    console.warn('AWS SDK not installed or failed to load, S3 uploads disabled');
    s3Client = null;
  }
  if (s3Client) {
    console.log('S3 storage enabled for realisation uploads');
  }
}

@Controller('realisations')
export class RealisationController {
  constructor(
    private readonly service: RealisationService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
      limits: { fileSize: 500 * 1024 * 1024 }, // 500 MB
    }),
  )
  async create(@Body() data: any, @UploadedFile() file?: Express.Multer.File) {
    try {
      console.log('Realisation create called', { body: data, file: file ? { originalname: file.originalname, mimetype: file.mimetype, path: file.path } : null });

      if (file) {
        // Upload direct Cloudinary
        const url = file.path || (file as any).secure_url;
        data.url = url;
      }

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
  async findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    try {
      const p = page ? parseInt(page, 10) : 1;
      const l = limit ? parseInt(limit, 10) : 20;
      return await this.service.findAll(p, l);
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
