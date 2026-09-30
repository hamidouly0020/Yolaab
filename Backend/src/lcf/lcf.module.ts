import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LcfController } from './lcf.controller';
import { LcfService } from './lcf.service';

@Module({
  imports: [ConfigModule],
  controllers: [LcfController],
  providers: [LcfService],
  exports: [LcfService],
})
export class LcfModule {}
