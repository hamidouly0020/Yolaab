import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';
import { existsSync, mkdirSync } from 'fs';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // CORS configuration - adjust origins for production
  // If CORS_ORIGIN is unset or set to '*' we allow any origin by reflecting
  // the request origin. Otherwise split the comma-separated list.
  const allowedOriginsEnv = process.env.CORS_ORIGIN;
  let corsOptions: any = {
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  };

  if (allowedOriginsEnv && allowedOriginsEnv.trim() !== '*' ) {
    corsOptions.origin = allowedOriginsEnv.split(',');
  } else {
    // allow all origins (reflect) when '*' or not defined
    corsOptions.origin = true;
  }

  app.enableCors(corsOptions);

  // Enable compression middleware - reduce response size
  app.use(compression());

  // Reduce payload limits to reasonable sizes (from 100mb to 10mb)
  app.use(require('express').json({ limit: '10mb' }));
  app.use(require('express').urlencoded({ limit: '10mb', extended: true }));

  const uploadsPath = resolve(process.cwd(), 'uploads');
  if (!existsSync(uploadsPath)) {
    mkdirSync(uploadsPath, { recursive: true });
  }
  app.useStaticAssets(uploadsPath, { prefix: '/uploads' });

  const port = process.env.PORT || 3000;

  // Log SMTP configuration (sensitive info only in development)
  if (process.env.NODE_ENV !== 'production') {
    console.log('SMTP configuration:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER ? 'configured' : 'missing',
    });
  }

  await app.listen(port, '0.0.0.0');
  console.log(`Backend running on port ${port}`);
}

bootstrap();
