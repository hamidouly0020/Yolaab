import { Module } from '@nestjs/common';
import { RealisationService } from './realisation.service';
import { RealisationController } from './realisation.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RealisationController],
  providers: [RealisationService],
})
export class RealisationModule {}
