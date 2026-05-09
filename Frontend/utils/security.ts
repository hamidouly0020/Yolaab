// utils/security.ts
/**
 * Security utilities for frontend protection
 * Includes CSRF token management, secure storage, etc.
 */

interface CSRFToken {
  token: string
  timestamp: number
}

const CSRF_STORAGE_KEY = 'csrf_token'
const CSRF_TOKEN_LIFETIME = 60 * 60 * 1000 // 1 hour

/**
 * Generate or retrieve CSRF token
 */
export const getCSRFToken = (): string => {
  const stored = localStorage.getItem(CSRF_STORAGE_KEY)
  
  if (stored) {
    const parsed: CSRFToken = JSON.parse(stored)
    // Check if token is still valid
    if (Date.now() - parsed.timestamp < CSRF_TOKEN_LIFETIME) {
      return parsed.token
    }
  }

  // Generate new token
  const token = generateRandomToken()
  localStorage.setItem(CSRF_STORAGE_KEY, JSON.stringify({
    token,
    timestamp: Date.now(),
  }))
  
  return token
}

/**
 * Generate random token for CSRF protection
 */
export const generateRandomToken = (): string => {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

/**
 * Secure fetch wrapper with CSRF token
 */
export const secureFetch = (
  url: string,
  options: RequestInit = {},
): Promise<Response> => {
  const headers = new Headers(options.headers || {})
  
  // Add CSRF token for non-GET requests
  if (options.method && options.method !== 'GET') {
    headers.set('X-CSRF-Token', getCSRFToken())
  }
  
  // Add security headers
  headers.set('X-Requested-With', 'XMLHttpRequest')
  
  return fetch(url, {
    ...options,
    headers,
  })
}

/**
 * Content Security Policy helper
 * Should be used in nuxt.config.ts for server-side CSP headers
 */
export const getCSPHeaders = (): string => {
  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com",
    "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
    "img-src 'self' data: https:",
    "font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com",
    "connect-src 'self' https://sc2alqj9462.universe.wf https://api.whatsapp.com",
    "frame-src 'self' https://www.google.com/recaptcha/ https://recaptcha.google.com/",
    "object-src 'none'",
    "upgrade-insecure-requests",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
  ].join('; ')
}

/**
 * Prevent clickjacking
 */
export const getXFrameOptions = (): string => {
  return 'SAMEORIGIN'
}

/**
 * Check for suspicious input patterns
 */
export const isSuspiciousInput = (input: string): boolean => {
  const suspiciousPatterns = [
    /<script[^>]*>.*?<\/script>/gi, // Script tags
    /javascript:/gi, // JavaScript protocol
    /on\w+\s*=/gi, // Event handlers
    /sql|union|select|insert|delete|drop|update|exec|execute/gi, // SQL injection patterns
  ]

  return suspiciousPatterns.some(pattern => pattern.test(input))
}

/**
 * Sanitize URL to prevent open redirect
 */
export const isSafeURL = (url: string): boolean => {
  try {
    const parsed = new URL(url, window.location.origin)
    // Only allow same-origin redirects
    return parsed.origin === window.location.origin
  } catch {
    return false
  }
}