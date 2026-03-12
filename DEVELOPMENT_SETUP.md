# Local Development Setup Guide

## Overview
To develop locally, you need **both** the frontend and backend running on your machine.

## Backend Setup

### 1. Install Dependencies
```bash
cd Backend
npm install
```

### 2. Environment Variables
The `.env` file is set to development mode:
```
NODE_ENV=development
PORT=3000
CORS_ORIGIN="http://localhost:3000,http://localhost:3001,http://127.0.0.1:3000,http://127.0.0.1:3001,..."
```

### 3. Start Local Backend
```bash
cd Backend
npm run start:dev
# or
npm run dev
```

The backend will run on **http://localhost:3000**

⚠️ **IMPORTANT**: Ensure `NODE_ENV=development` is set in `.env`. This enables:
- Automatic CORS allowance for localhost origins
- Debug logging
- Development mode features

## Frontend Setup

### 1. Install Dependencies
```bash
cd Frontend
npm install
```

### 2. Environment Variables
The `.env` file is already configured for local development:
```
NUXT_PUBLIC_API_URL=http://localhost:3000
```

### 3. Start Frontend Dev Server
```bash
cd "Frontend/Site Internet pour Yolaab"
npm run dev
# or
yarn dev
```

The frontend will run on **http://localhost:3001** (or similar port)

### 4. Access the App
- **Home**: http://localhost:3001/home
- **Reservation**: http://localhost:3001/reservation
- **Quote Request**: http://localhost:3001/devis
- **Admin**: http://localhost:3001/admin (password: `yolaab2026`)

## Troubleshooting CORS Errors

### Error: "CORS policy: No 'Access-Control-Allow-Origin' header"

**Issue**: Backend running in production mode
- Check `NODE_ENV` in Backend/.env - must be `development`
- Restart backend after changing .env

**Solution**:
```bash
# In Backend/.env
NODE_ENV=development  # NOT production

# Restart backend
npm run start:dev
```

### Admin Dashboard Login Fails

**Ensure**:
1. Backend is running on http://localhost:3000
2. Frontend is configured with `NUXT_PUBLIC_API_URL=http://localhost:3000`
3. Both services are accessible
4. Try: `curl http://localhost:3000/health` to test backend

## Production Deployment

### Backend (Render)
1. Set environment variables in Render dashboard:
   ```
   NODE_ENV=production
   CORS_ORIGIN=https://your-frontend-url.vercel.app
   DATABASE_URL=your_database_url
   ```
2. Don't commit sensitive variables to `.env`

### Frontend (Vercel)
1. Set environment variable in Vercel project settings:
   ```
   NUXT_PUBLIC_API_URL=https://yolaab-api.onrender.com
   ```
2. The `.env.production` file contains this configuration

## Port Reference

| Service | Local Port | Environment |
|---------|-----------|---|
| Backend | 3000 | http://localhost:3000 |
| Frontend | 3001 | http://localhost:3001 |
| Database | 3306 | SSH tunnel/Railway |

## Development Workflow

```bash
# Terminal 1: Backend
cd Backend
npm run start:dev

# Terminal 2: Frontend
cd "Frontend/Site Internet pour Yolaab"
npm run dev

# Then open browser to http://localhost:3001
```

## Common Issues

| Issue | Solution |
|-------|----------|
| CORS errors | Ensure NODE_ENV=development in Backend/.env |
| "Cannot connect to API" | Check backend is running on port 3000 |
| Blank admin page | Check browser console for errors |
| "Realisations not loading" | Backend must have realisations data in database |

## Testing API directly

```bash
# Test if backend is responding
curl http://localhost:3000/reservations

# Test CORS headers
curl -H "Origin: http://localhost:3001" \
     -H "Access-Control-Request-Method: GET" \
     -X OPTIONS http://localhost:3000/reservations
```

---

For production deployment instructions, see `DEPLOYMENT.md`
