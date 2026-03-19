import { Module } from '@nestjs/common';
import { RealisationService } from './realisation.service';
import { RealisationController } from './realisation.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [PrismaModule, CloudinaryModule],
  controllers: [RealisationController],
  providers: [RealisationService],
})
export class RealisationModule {}
