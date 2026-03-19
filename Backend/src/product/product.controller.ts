import { Controller, Get, Post, Body, Param, Put, Delete, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import multerStorageCloudinary from 'multer-storage-cloudinary';
import { ProductService } from './product.service';

const storage = multerStorageCloudinary({
  cloudinary: require('cloudinary').v2,
  params: (req, file) => ({
    folder: 'products',
    resource_type: 'auto',
  }),
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
      data.image = file.path || (file as any).secure_url;
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
