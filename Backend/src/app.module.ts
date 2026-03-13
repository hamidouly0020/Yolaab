import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
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

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 60 * 1000, // 60 seconds
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
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
