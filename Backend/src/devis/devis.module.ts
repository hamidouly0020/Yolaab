import { Module } from '@nestjs/common'
import { DevisService } from './devis.service'
import { DevisController } from './devis.controller'
import { PrismaModule } from '../prisma/prisma.module'

import { MailModule } from '../mail/mail.module';

@Module({
  imports: [PrismaModule, MailModule],
  providers: [DevisService],
  controllers: [DevisController],
})
export class DevisModule {}
