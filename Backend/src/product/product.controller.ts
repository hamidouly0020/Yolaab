import { Controller, Get, Post, Body, Param, Put, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProductService } from './product.service';

const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
    cb(null, `${randomName}${extname(file.originalname)}`);
  },
});

@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

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
  create(@Body() data: any, @UploadedFile() file?: Express.Multer.File) {
    if (file) {
      data.image = `/uploads/${file.filename}`;
    }

    // Convert numeric fields coming from multipart/form-data (always strings)
    if (data.prix !== undefined) {
      const p = parseFloat(data.prix as any)
      data.prix = Number.isNaN(p) ? undefined : p
    }
    if (data.quantite !== undefined) {
      const q = parseInt(data.quantite as any, 10)
      data.quantite = Number.isNaN(q) ? undefined : q
    }

    // Ensure optional description if empty string
    if (data.description === '') {
      delete data.description
    }

    return this.service.create(data);
  }

  @Get()
  findAll() {
    return this.service.findAll();
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
