import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, resolve } from 'path';
import { existsSync, mkdirSync } from 'fs';

@Controller('uploads')
export class UploadsController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadsPath = resolve(process.cwd(), 'uploads');
          if (!existsSync(uploadsPath)) {
            mkdirSync(uploadsPath, { recursive: true });
          }
          cb(null, uploadsPath);
        },
        filename: (req, file, cb) => {
          const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
          const fileExt = extname(file.originalname);
          cb(null, `${name}${fileExt}`);
        },
      }),
      limits: {
        fileSize: 50 * 1024 * 1024, // 50MB max
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    const publicUrl = `/uploads/${file.filename}`;
    return { url: publicUrl, filename: file.filename, size: file.size };
  }
}
