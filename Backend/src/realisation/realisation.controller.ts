import { Controller, Get, Post, Delete, Param, Body, UseInterceptors, UploadedFile, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
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

const storage = diskStorage({
  destination: uploadsPath,
  filename: (req, file, cb) => {
    const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
    cb(null, `${randomName}${extname(file.originalname)}`);
  },
});

// Initialize S3 client only if env vars are provided
let s3Client: any = null;
const S3_BUCKET = process.env.S3_BUCKET || '';
if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY && S3_BUCKET && process.env.AWS_REGION) {
  try {
    const awsS3 = require('@aws-sdk/client-s3');
    S3Client = awsS3.S3Client;
    PutObjectCommand = awsS3.PutObjectCommand;
    s3Client = new S3Client({ region: process.env.AWS_REGION });
  } catch (e) {
    console.warn('AWS SDK not installed or failed to load, S3 uploads disabled');
    s3Client = null;
  }
}

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
        // If S3 is configured, upload file to S3 and use public URL
        if (s3Client) {
          const fileStream = require('fs').createReadStream(resolve(uploadsPath, file.filename));
          const key = `realisations/${file.filename}`;
          try {
            await s3Client.send(new PutObjectCommand({ Bucket: S3_BUCKET, Key: key, Body: fileStream, ContentType: file.mimetype, ACL: 'public-read' } as any));
            // Construct public URL (S3 static website or bucket URL depending on provider)
            const url = process.env.S3_PUBLIC_URL || `https://${S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
            data.url = url;
            // Remove local file after upload to free space
            try { unlinkSync(resolve(uploadsPath, file.filename)); } catch (e) { /* ignore */ }
          } catch (e) {
            console.error('S3 upload failed, falling back to local file', e);
            data.url = `/uploads/${file.filename}`;
          }
        } else {
          data.url = `/uploads/${file.filename}`;
        }
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
