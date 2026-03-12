import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';
import { existsSync, mkdirSync } from 'fs';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // CORS configuration - robust handling for dev and production
  const allowedOriginsEnv = process.env.CORS_ORIGIN || '';
  const isDevelopment = process.env.NODE_ENV !== 'production';

  // Default origins list (always allow localhost for development)
  let allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
  ];

  // Add environment-configured origins
  if (allowedOriginsEnv.trim()) {
    const envOrigins = allowedOriginsEnv.split(',').map(o => o.trim()).filter(o => o);
    allowedOrigins = [...new Set([...allowedOrigins, ...envOrigins])];
  }

  // In production, be more restrictive if CORS_ORIGIN is properly set
  if (!isDevelopment && allowedOriginsEnv.trim()) {
    allowedOrigins = allowedOriginsEnv.split(',').map(o => o.trim()).filter(o => o);
  }

  const corsOptions: any = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      // Allow requests with no origin (like mobile apps or Postman)
      if (!origin) {
        return callback(null, true);
      }

      // In development, allow all origins for convenience
      if (isDevelopment) {
        return callback(null, true);
      }

      // In production, check against allowed list
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`[CORS] Rejected origin: ${origin}`);
        callback(new Error(`CORS: Origin ${origin} not allowed`));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
    optionsSuccessStatus: 200,
  };

  app.enableCors(corsOptions);

  // Log CORS configuration in development
  if (isDevelopment) {
    console.log('[CORS] Development mode - allowing localhost origins');
  }

  // Add middleware to proxy missing upload files to S3 if configured
  if (process.env.STORAGE_TYPE === 's3' || (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY && process.env.S3_BUCKET && process.env.AWS_REGION)) {
    const bucket = process.env.S3_BUCKET;
    const region = process.env.AWS_REGION;
    const publicBase = process.env.S3_PUBLIC_URL || (bucket ? `https://${bucket}.s3.${region}.amazonaws.com` : '');
    app.use('/uploads/:file', (req, res, next) => {
      const p = resolve(process.cwd(), 'uploads', req.params.file);
      if (existsSync(p)) {
        return next();
      }
      if (publicBase) {
        // redirect to S3 location
        return res.redirect(`${publicBase}/realisations/${req.params.file}`);
      }
      next();
    });
  }

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
  if (isDevelopment) {
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
