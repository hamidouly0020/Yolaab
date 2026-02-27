import { Module } from '@nestjs/common'
import { DevisService } from './devis.service'
import { DevisController } from './devis.controller'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  providers: [DevisService],
  controllers: [DevisController],
})
export class DevisModule {}
