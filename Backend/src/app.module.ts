import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ReservationModule } from './reservation/reservation.module';
import { ProductModule } from './product/product.module';
import { ApplicationModule } from './application/application.module';
import { OrderModule } from './order/order.module';
import { WorkerModule } from './worker/worker.module';
import { InvoiceModule } from './invoice/invoice.module';
import { RealisationModule } from './realisation/realisation.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [
    PrismaModule,
    ReservationModule,
    ProductModule,
    ApplicationModule,
    OrderModule,
    WorkerModule,
    InvoiceModule,
    RealisationModule,
    UploadsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
