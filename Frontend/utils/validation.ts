// utils/validation.ts
/**
 * Validation utilities for frontend form validation
 * Ensures consistent validation across components
 */

interface ValidationResult {
  isValid: boolean
  error: string
}

// Email validation (RFC 5322 simplified)
export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.trim()) {
    return { isValid: false, error: 'Email is required' }
  }
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Invalid email format' }
  }
  if (email.length > 254) {
    return { isValid: false, error: 'Email is too long' }
  }
  return { isValid: true, error: '' }
}

// Phone number validation (Senegalese format)
export const validatePhoneNumber = (phone: string): ValidationResult => {
  const phoneRegex = /^7[0678]\d{7}$/
  const cleanPhone = phone.replace(/\s+/g, '')
  if (!cleanPhone) {
    return { isValid: false, error: 'Phone number is required' }
  }
  if (!phoneRegex.test(cleanPhone)) {
    return { isValid: false, error: 'Invalid phone format (e.g., 77 123 45 67)' }
  }
  return { isValid: true, error: '' }
}

// Text validation (names, addresses, etc.)
export const validateText = (text: string, minLength = 2, maxLength = 100): ValidationResult => {
  const textRegex = /^[a-zA-ZÀ-ÿ\s\-,']+$/
  if (!text.trim()) {
    return { isValid: false, error: 'This field is required' }
  }
  if (text.length < minLength) {
    return { isValid: false, error: `Minimum length is ${minLength} characters` }
  }
  if (text.length > maxLength) {
    return { isValid: false, error: `Maximum length is ${maxLength} characters` }
  }
  if (!textRegex.test(text)) {
    return { isValid: false, error: 'Invalid characters' }
  }
  return { isValid: true, error: '' }
}

// Number validation (ranges)
export const validateNumber = (value: any, min = 0, max = 1000000): ValidationResult => {
  const num = parseFloat(value)
  if (isNaN(num)) {
    return { isValid: false, error: 'Must be a valid number' }
  }
  if (num < min) {
    return { isValid: false, error: `Must be at least ${min}` }
  }
  if (num > max) {
    return { isValid: false, error: `Must be at most ${max}` }
  }
  return { isValid: true, error: '' }
}

// Sanitization function (XSS prevention)
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim()
}

// Batch validation
export const validateBatch = (
  fields: Record<string, { value: any; validator: (v: any) => ValidationResult }>,
): Record<string, string> => {
  const errors: Record<string, string> = {}
  
  for (const [fieldName, { value, validator }] of Object.entries(fields)) {
    const result = validator(value)
    if (!result.isValid) {
      errors[fieldName] = result.error
    }
  }
  
  return errors
}

// Rate limiting helper
export const checkRateLimit = (key: string, delayMs = 60000): boolean => {
  const lastSubmit = localStorage.getItem(`rateLimit_${key}`)
  if (lastSubmit && Date.now() - parseInt(lastSubmit) < delayMs) {
    return false
  }
  localStorage.setItem(`rateLimit_${key}`, Date.now().toString())
  return true
}