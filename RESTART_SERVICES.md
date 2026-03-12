# Service Restart Guide - CORS Fix

## ⚠️ CRITICAL: You MUST restart both services for the CORS fix to work

The `.env` environment variables are only loaded when the development servers start. Simply creating/modifying `.env` files doesn't activate them - the servers must be restarted.

---

## Step 1: Stop the Frontend Dev Server

If you have the frontend dev server running:

**In your frontend terminal window:**
```bash
Press Ctrl+C
```

This will stop the dev server running on `http://localhost:3001`

---

## Step 2: Stop the Backend Dev Server

If you have the backend dev server running:

**In your backend terminal window:**
```bash
Press Ctrl+C
```

This will stop the backend running on `http://localhost:3000`

---

## Step 3: Restart Backend First

**In your backend terminal:**
```bash
cd c:\Users\User\OneDrive\Documents\Yolaab\Backend
npm run start:dev
```

**Expected output:**
```
[Nest] 12345 - 03/12/2026, 10:30:15 AM     LOG [NestFactory] Starting Nest application...
[Nest] 12345 - 03/12/2026, 10:30:16 AM     LOG [InstanceLoader] AppModule dependencies initialized
[Nest] 12345 - 03/12/2026, 10:30:16 AM     LOG Backend running on port 3000
[CORS] Development mode - allowing localhost origins
SMTP configuration: {
  host: 'smtp.gmail.com',
  port: '587',
  user: 'configured'
}
```

**Verify**: Backend should display `[CORS] Development mode - allowing localhost origins`

---

## Step 4: Restart Frontend in New Terminal

**Open a NEW terminal window and run:**
```bash
cd "c:\Users\User\OneDrive\Documents\Yolaab\Frontend\Site Internet pour Yolaab"
npm run dev
```

**Expected output:**
```
  ➜ Local:    http://localhost:3001/
  ➜ Network:  http://[your-ip]:3001/
```

---

## Step 5: Test the Fix

### Test 1: Admin Login (Desktop Check)
1. Open browser: `http://localhost:3001/admin`
2. Password: `yolaab2026`
3. **Expected**: Login succeeds WITHOUT any CORS errors in the browser console

### Test 2: Check Browser Console
1. Press F12 to open Developer Tools
2. Click the "Console" tab
3. **Expected**: NO red errors about CORS or "No 'Access-Control-Allow-Origin' header"
4. **Expected**: Admin dashboard loads with all data from the backend

### Test 3: Check Network Tab
1. In Developer Tools, click "Network" tab
2. Reload the page (F5)
3. Look for API calls to `/reservations`, `/products`, `/orders`
4. **Expected**: All requests should go to `http://localhost:3000` (NOT to `onrender.com`)
5. **Expected**: All requests should return status 200 (green)

---

## 🔍 If Problems Persist

### Problem: Still seeing CORS errors with `localhost:3001`

**Cause**: One or both servers haven't restarted properly

**Solution**:
1. Check if both terminal windows are still showing the startup logs
2. Verify Backend terminal shows: `[CORS] Development mode - allowing localhost origins`
3. Verify Frontend terminal shows: `➜ Local:    http://localhost:3001/`

### Problem: Still seeing requests to `onrender.com`

**Cause**: Frontend dev server loaded OLD cached configuration

**Solution**:
1. **Hard reset the frontend cache:**
   ```bash
   cd "c:\Users\User\OneDrive\Documents\Yolaab\Frontend\Site Internet pour Yolaab"
   rm -r .nuxt
   npm run dev
   ```
2. **In browser, do a hard refresh:**
   - Press `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
   - Or press `Ctrl+F5` to hard refresh

### Problem: Backend won't connect to database

**Error**: `DATABASE_URL connection failed`

**Solution**:
1. Verify your internet connection
2. Check that Railway MySQL is still running at `metro.proxy.rlwy.net:55945`
3. Check `Backend/.env` DATABASE_URL is correctly set
4. Try the backend with: `npm run start:debug` for more detailed logs

### Problem: SMTP Configuration Error

**Error**: `SMTP connection error`  
**Status**: This is OK during development - you can proceed without email

**What to do**: Don't worry about SMTP errors locally. They only matter in production for sending emails.

---

## Environment Configuration Summary

### Frontend (.env)
```
NUXT_PUBLIC_API_URL=http://localhost:3000
```
- Points to localhost backend
- Used in: `nuxt.config.ts` line 89
- Accessed via: `useRuntimeConfig().public.apiUrl`

### Backend (.env)
```
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000,http://localhost:3001,...
```
- `NODE_ENV=development` enables flexible CORS
- `CORS_ORIGIN` contains allowed origins
- Processed by: `Backend/src/main.ts` lines 11-60

---

## Quick Restart Commands (Copy-Paste Ready)

### Terminal 1 - Backend:
```bash
cd c:\Users\User\OneDrive\Documents\Yolaab\Backend && npm run start:dev
```

### Terminal 2 - Frontend:
```bash
cd "c:\Users\User\OneDrive\Documents\Yolaab\Frontend\Site Internet pour Yolaab" && npm run dev
```

---

## Success Indicators

✅ Backend terminal shows: `[CORS] Development mode - allowing localhost origins`  
✅ Frontend terminal shows: `Local: http://localhost:3001/`  
✅ Browser can access: `http://localhost:3001/admin`  
✅ No CORS errors in browser console  
✅ API calls in Network tab show `http://localhost:3000` (not onrender.com)  
✅ Admin dashboard loads data without errors  

---

**Created**: 2026-03-12  
**Purpose**: Fix CORS configuration by restarting services with updated .env files
