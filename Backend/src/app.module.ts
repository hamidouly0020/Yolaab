import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { ReservationModule } from './reservation/reservation.module';
import { ProductModule } from './product/product.module';
import { ApplicationModule } from './application/application.module';
import { OrderModule } from './order/order.module';
import { WorkerModule } from './worker/worker.module';
import { InvoiceModule } from './invoice/invoice.module';
import { RealisationModule } from './realisation/realisation.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    PrismaModule,
    ReservationModule,
    ProductModule,
    ApplicationModule,
    OrderModule,
    WorkerModule,
    InvoiceModule,
    RealisationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
