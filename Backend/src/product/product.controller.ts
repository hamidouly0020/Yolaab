import { Controller, Get, Post, Body, Param, Put, Delete, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, resolve } from 'path';
import { existsSync, mkdirSync, unlinkSync } from 'fs';
import { ProductService } from './product.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

const uploadsPath = resolve(process.cwd(), 'uploads');
if (!existsSync(uploadsPath)) {
  mkdirSync(uploadsPath, { recursive: true });
}

const storage = diskStorage({
  destination: uploadsPath,
  filename: (req, file, cb) => {
    const name = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`;
    const extension = extname(file.originalname) || '';
    cb(null, `${name}${extension}`);
  },
});

@Controller('products')
export class ProductController {
  constructor(
    private readonly service: ProductService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage,
      limits: { fileSize: 500 * 1024 * 1024 }, // 500 MB for product images
      fileFilter: (req, file, cb) => {
        const isImage = file.mimetype.startsWith('image/');
        if (isImage) cb(null, true);
        else cb(new Error('Type de fichier non autorisé'), false);
      },
    }),
  )
  async create(@Body() data: any, @UploadedFile() file?: Express.Multer.File) {
    if (file) {
      try {
        const uploadUrl = await this.cloudinaryService.uploadFile(file);
        data.image = uploadUrl;
      } finally {
        try {
          unlinkSync(file.path);
        } catch {
          // ignore cleanup errors
        }
      }
    }

    // Convert numeric fields coming from multipart/form-data (always strings)
    if (data.prix !== undefined) {
      const p = parseFloat(data.prix as any);
      data.prix = Number.isNaN(p) ? undefined : p;
    }
    if (data.quantite !== undefined) {
      const q = parseInt(data.quantite as any, 10);
      data.quantite = Number.isNaN(q) ? undefined : q;
    }

    // Ensure optional description if empty string
    if (data.description === '') {
      delete data.description;
    }

    return this.service.create(data);
  }

  @Get()
  findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    const p = page ? parseInt(page, 10) : 1;
    const l = limit ? parseInt(limit, 10) : 20;
    return this.service.findAll(p, l);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
