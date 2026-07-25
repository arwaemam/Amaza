/**
 * Form Validation Utilities
 * Reusable validation schemas and functions for form handling
 */

import { ContactFormData, DemoRequestData, NewsletterData } from './types';

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

/**
 * Validation rule definitions
 */
export const validationRules = {
  required: (value: any, fieldName: string): ValidationError | null => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return { field: fieldName, message: `${fieldName} is required` };
    }
    return null;
  },

  email: (value: string, fieldName: string): ValidationError | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      return { field: fieldName, message: 'Please enter a valid email address' };
    }
    return null;
  },

  phone: (value: string, fieldName: string): ValidationError | null => {
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    const digitsOnly = value.replace(/\D/g, '');
    if (value && (!phoneRegex.test(value) || digitsOnly.length < 10)) {
      return { field: fieldName, message: 'Please enter a valid phone number' };
    }
    return null;
  },

  minLength: (value: string, minLength: number, fieldName: string): ValidationError | null => {
    if (value && value.length < minLength) {
      return { field: fieldName, message: `${fieldName} must be at least ${minLength} characters` };
    }
    return null;
  },

  maxLength: (value: string, maxLength: number, fieldName: string): ValidationError | null => {
    if (value && value.length > maxLength) {
      return { field: fieldName, message: `${fieldName} must be no more than ${maxLength} characters` };
    }
    return null;
  },

  number: (value: string, fieldName: string): ValidationError | null => {
    if (value && isNaN(Number(value))) {
      return { field: fieldName, message: `${fieldName} must be a valid number` };
    }
    return null;
  },

  positiveNumber: (value: string, fieldName: string): ValidationError | null => {
    const num = Number(value);
    if (value && (isNaN(num) || num <= 0)) {
      return { field: fieldName, message: `${fieldName} must be a positive number` };
    }
    return null;
  },
};

/**
 * Contact form validation schema
 */
export function validateContactForm(data: Partial<ContactFormData>): ValidationResult {
  const errors: ValidationError[] = [];

  // Required field validations
  const requiredErrors = [
    validationRules.required(data.firstName, 'First Name'),
    validationRules.required(data.lastName, 'Last Name'),
    validationRules.required(data.email, 'Email'),
    validationRules.required(data.company, 'Company'),
    validationRules.required(data.message, 'Message'),
    validationRules.required(data.consent, 'Consent'),
  ].filter(Boolean) as ValidationError[];

  errors.push(...requiredErrors);

  // Email validation
  if (data.email) {
    const emailError = validationRules.email(data.email, 'Email');
    if (emailError) errors.push(emailError);
  }

  // Phone validation (optional but must be valid if provided)
  if (data.phone) {
    const phoneError = validationRules.phone(data.phone, 'Phone');
    if (phoneError) errors.push(phoneError);
  }

  // Length validations
  if (data.firstName) {
    const error = validationRules.maxLength(data.firstName, 50, 'First Name');
    if (error) errors.push(error);
  }

  if (data.lastName) {
    const error = validationRules.maxLength(data.lastName, 50, 'Last Name');
    if (error) errors.push(error);
  }

  if (data.company) {
    const error = validationRules.maxLength(data.company, 100, 'Company');
    if (error) errors.push(error);
  }

  if (data.message) {
    const minError = validationRules.minLength(data.message, 10, 'Message');
    const maxError = validationRules.maxLength(data.message, 1000, 'Message');
    if (minError) errors.push(minError);
    if (maxError) errors.push(maxError);
  }

  // Property count validation (optional but must be positive if provided)
  if (data.propertyCount !== undefined && data.propertyCount !== null) {
    const error = validationRules.positiveNumber(String(data.propertyCount), 'Property Count');
    if (error) errors.push(error);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Demo request form validation schema
 */
export function validateDemoRequestForm(data: Partial<DemoRequestData>): ValidationResult {
  const errors: ValidationError[] = [];

  // Required field validations
  const requiredErrors = [
    validationRules.required(data.firstName, 'First Name'),
    validationRules.required(data.lastName, 'Last Name'),
    validationRules.required(data.email, 'Email'),
    validationRules.required(data.phone, 'Phone'),
    validationRules.required(data.company, 'Company'),
    validationRules.required(data.propertyType, 'Property Type'),
    validationRules.required(data.propertyCount, 'Property Count'),
    validationRules.required(data.timeframe, 'Timeframe'),
  ].filter(Boolean) as ValidationError[];

  errors.push(...requiredErrors);

  // Email validation
  if (data.email) {
    const emailError = validationRules.email(data.email, 'Email');
    if (emailError) errors.push(emailError);
  }

  // Phone validation
  if (data.phone) {
    const phoneError = validationRules.phone(data.phone, 'Phone');
    if (phoneError) errors.push(phoneError);
  }

  // Property count validation
  if (data.propertyCount !== undefined) {
    const error = validationRules.positiveNumber(String(data.propertyCount), 'Property Count');
    if (error) errors.push(error);
  }

  // Length validations
  const lengthChecks = [
    data.firstName && validationRules.maxLength(data.firstName, 50, 'First Name'),
    data.lastName && validationRules.maxLength(data.lastName, 50, 'Last Name'),
    data.company && validationRules.maxLength(data.company, 100, 'Company'),
    data.currentSoftware && validationRules.maxLength(data.currentSoftware, 100, 'Current Software'),
  ].filter(Boolean) as ValidationError[];

  errors.push(...lengthChecks);

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Newsletter signup validation schema
 */
export function validateNewsletterForm(data: Partial<NewsletterData>): ValidationResult {
  const errors: ValidationError[] = [];

  // Required email validation
  const emailRequiredError = validationRules.required(data.email, 'Email');
  if (emailRequiredError) errors.push(emailRequiredError);

  // Email format validation
  if (data.email) {
    const emailError = validationRules.email(data.email, 'Email');
    if (emailError) errors.push(emailError);
  }

  // First name validation (optional but must be valid if provided)
  if (data.firstName) {
    const error = validationRules.maxLength(data.firstName, 50, 'First Name');
    if (error) errors.push(error);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Helper function to get error message for a specific field
 */
export function getFieldError(errors: ValidationError[], fieldName: string): string | undefined {
  const error = errors.find(e => e.field === fieldName);
  return error?.message;
}

/**
 * Helper function to check if a specific field has errors
 */
export function hasFieldError(errors: ValidationError[], fieldName: string): boolean {
  return errors.some(e => e.field === fieldName);
}

/**
 * Format phone number with consistent formatting
 */
export function formatPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  } else if (digits.length === 11 && digits[0] === '1') {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  
  return phone; // Return as-is if not a standard format
}

/**
 * Sanitize form input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .slice(0, 1000); // Limit length as additional safety
}