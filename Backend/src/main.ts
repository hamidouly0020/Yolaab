// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { NestExpressApplication } from '@nestjs/platform-express';
// import { join, resolve } from 'path';
// import { existsSync, mkdirSync } from 'fs';

// async function bootstrap() {
//   const app = await NestFactory.create<NestExpressApplication>(AppModule);
//   // Enable CORS explicitly for local development (frontend on :3001)
//   app.enableCors({
//     origin: [process.env.FRONTEND_URL || 'http://localhost:3001', 'http://localhost:3000'],
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//     allowedHeaders: 'Content-Type, Accept, Authorization',
//     credentials: true,
//   });

//   // Handle preflight OPTIONS requests reliably via middleware (add CORS headers)
//   const allowedOrigins = [process.env.FRONTEND_URL || 'http://localhost:3001', 'http://localhost:3000'];
//   app.use((req, res, next) => {
//     if (req.method === 'OPTIONS') {
//       const origin = (req.headers.origin as string) || allowedOrigins[0];
//       const allowed = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
//       res.header('Access-Control-Allow-Origin', allowed);
//       res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
//       res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
//       res.header('Access-Control-Allow-Credentials', 'true');
//       return res.sendStatus(200);
//     }
//     next();
//   });

//   // Increase payload size limits for file uploads
//   app.use((req, res, next) => {
//     const express = require('express');
//     next();
//   });
  
//   // Configure express to accept larger payloads
//   app.use(require('express').json({ limit: '100mb' }));
//   app.use(require('express').urlencoded({ limit: '100mb', extended: true }));
  
//   // Serve uploads folder - use absolute path and create if missing
//   const uploadsPath = resolve(process.cwd(), 'uploads');
//   if (!existsSync(uploadsPath)) {
//     mkdirSync(uploadsPath, { recursive: true });
//     console.log('Created uploads directory at', uploadsPath);
//   }
//   app.useStaticAssets(uploadsPath, { prefix: '/uploads' });
  
//   const port = process.env.PORT || 3000;
//   await app.listen(port, '0.0.0.0');
//   console.log(`Backend running on http://localhost:${port}`);
// }

// bootstrap();


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';
import { existsSync, mkdirSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: false,
  });

  app.use(require('express').json({ limit: '100mb' }));
  app.use(require('express').urlencoded({ limit: '100mb', extended: true }));

  const uploadsPath = resolve(process.cwd(), 'uploads');
  if (!existsSync(uploadsPath)) {
    mkdirSync(uploadsPath, { recursive: true });
  }
  app.useStaticAssets(uploadsPath, { prefix: '/uploads' });

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Backend running on http://localhost:${port}`);
}

bootstrap();