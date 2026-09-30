import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ReservationModule } from './reservation/reservation.module';
import { ProductModule } from './product/product.module';
import { ApplicationModule } from './application/application.module';
import { OrderModule } from './order/order.module';
import { WorkerModule } from './worker/worker.module';
import { InvoiceModule } from './invoice/invoice.module';
import { RealisationModule } from './realisation/realisation.module';
import { UploadsModule } from './uploads/uploads.module';
import { DevisModule } from './devis/devis.module';
import { MailModule } from './mail/mail.module';
import { LcfModule } from './lcf/lcf.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    PrismaModule,
    ReservationModule,
    ProductModule,
    ApplicationModule,
    OrderModule,
    WorkerModule,
    InvoiceModule,
    RealisationModule,
    UploadsModule,
    DevisModule,
    MailModule,
    LcfModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
