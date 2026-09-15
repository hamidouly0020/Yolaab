import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { resolve } from 'path';
import { existsSync, mkdirSync } from 'fs';
import * as compression from 'compression';
import helmet from 'helmet';
import { config as loadEnv } from 'dotenv';

const envPaths = [
  resolve(__dirname, '../.env'),
  resolve(__dirname, '../../.env'),
  resolve(process.cwd(), '.env'),
];
for (const path of envPaths) {
  if (existsSync(path)) {
    loadEnv({ path });
    break;
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Do not add a global /api prefix; backend routes are served directly at the root paths.
  app.setGlobalPrefix('api');
  
  // Security headers - configured to not block CORS for media
  app.use(helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: false,
  }));

  // CORS configuration - allow local dev and production origins.
  const allowedOriginsEnv = (process.env.CORS_ORIGIN || '').trim();
  const isDevelopment = process.env.NODE_ENV !== 'production';

  const defaultAllowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
  ];

  const allowedOrigins = allowedOriginsEnv
    ? [...new Set([...defaultAllowedOrigins, ...allowedOriginsEnv.split(',').map(o => o.trim()).filter(Boolean)])]
    : defaultAllowedOrigins;

  const corsOptions: any = {
    origin: isDevelopment || !allowedOriginsEnv ? true : allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
    optionsSuccessStatus: 200,
  };

  app.enableCors(corsOptions);

  if (isDevelopment) {
    console.log('[CORS] enabled for local development and configured origins:', allowedOrigins);
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

  // Ensure uploads directory exists
  const uploadsPath = resolve(process.cwd(), 'uploads');
  if (!existsSync(uploadsPath)) {
    mkdirSync(uploadsPath, { recursive: true });
  }

  // Configure static files middleware BEFORE compression
  // Add CORS headers to the uploads middleware for video streaming with range requests
  app.use('/uploads', (req, res, next) => {
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Range, Content-Type',
      'Access-Control-Expose-Headers': 'Content-Length, Content-Range, Content-Type',
      'Cross-Origin-Resource-Policy': 'cross-origin',
    });
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  app.use('/uploads', express.static(uploadsPath, {
    etag: true,
    lastModified: true,
  }));

  // Enable compression middleware - reduce response size
  app.use(compression());

  // Increase payload limits for file uploads - NestJS app should handle form-data separately
  // But set these high enough to not interfere
  app.use(express.json({ limit: '500mb' }));
  app.use(express.urlencoded({ limit: '500mb', extended: true }));

  const port = process.env.PORT || 3000;

  // Log SMTP configuration (sensitive info only in development)
  if (isDevelopment) {
    console.log('SMTP configuration:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER ? 'configured' : 'missing',
    });
  }

  // Configure HTTP server timeouts for large file uploads
  const server = await app.listen(port, '0.0.0.0');
  server.setTimeout(10 * 60 * 1000); // 10 minutes timeout for uploads
  server.keepAliveTimeout = 65 * 1000; // 65 seconds keepalive
  
  console.log(`Backend running on port ${port}`);
}

bootstrap();
