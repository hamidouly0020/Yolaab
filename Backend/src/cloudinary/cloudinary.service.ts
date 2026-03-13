import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'uploads',
    });
    return result.secure_url;
  }

  async deleteFile(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId);
  }
}
