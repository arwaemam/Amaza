/**
 * Application Constants
 * Centralized location for all app-wide constants and configuration
 */

// Site Information
export const SITE_CONFIG = {
  name: 'AmazePMS',
  title: 'AmazePMS - Property Management System for Hospitality',
  description: 'Streamline your hospitality business with AmazePMS. Comprehensive property management software for hotels, vacation rentals, and B&Bs.',
  url: 'https://amazepms.com',
  ogImage: '/og-image.jpg',
  twitterImage: '/twitter-image.jpg',
  keywords: [
    'property management',
    'hospitality software', 
    'hotel management',
    'vacation rental',
    'PMS',
    'hotel PMS',
    'property management system',
    'booking system',
    'reservation management',
  ],
} as const;

// Social Media Links
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/amazepms',
  linkedin: 'https://linkedin.com/company/amazepms',
  facebook: 'https://facebook.com/amazepms',
  github: 'https://github.com/amazepms',
} as const;

// Contact Information
export const CONTACT_INFO = {
  email: 'hello@amazepms.com',
  phone: '+1 (555) 123-4567',
  address: {
    street: '123 Business Ave',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    country: 'United States',
  },
  support: 'support@amazepms.com',
  sales: 'sales@amazepms.com',
} as const;

// Navigation Links
export const NAVIGATION_LINKS = [
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Integrations', href: '/integrations' },
  { name: 'Resources', href: '/resources' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
] as const;

// Footer Links
export const FOOTER_LINKS = {
  product: [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Integrations', href: '/integrations' },
    { name: 'API Documentation', href: '/docs/api' },
    { name: 'Security', href: '/security' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Partners', href: '/partners' },
    { name: 'Contact', href: '/contact' },
  ],
  resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'Help Center', href: '/help' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Webinars', href: '/webinars' },
    { name: 'Status', href: '/status' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'GDPR', href: '/gdpr' },
    { name: 'Compliance', href: '/compliance' },
  ],
} as const;

// Animation Configuration
export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
    slower: 0.8,
  },
  easing: {
    easeOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  stagger: {
    children: 0.1,
    fast: 0.05,
    slow: 0.2,
  },
} as const;

// Breakpoints (must match Tailwind config)
export const BREAKPOINTS = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1600,
} as const;

// Feature Categories
export const FEATURE_CATEGORIES = [
  'All Features',
  'Reservations',
  'Payments', 
  'Guest Management',
  'Housekeeping',
  'Analytics',
  'Communication',
  'Integrations',
] as const;

// Pricing Plans
export const PRICING_PLANS = [
  {
    name: 'Starter',
    price: 99,
    period: 'month',
    description: 'Perfect for small properties',
    highlighted: false,
  },
  {
    name: 'Professional',
    price: 199,
    period: 'month', 
    description: 'Most popular for growing businesses',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large property groups',
    highlighted: false,
  },
] as const;

// Form Configuration
export const FORM_CONFIG = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedFileTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
  maxMessageLength: 2000,
  maxNameLength: 100,
  maxCompanyLength: 100,
} as const;

// API Configuration
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.amazepms.com',
  timeout: 10000, // 10 seconds
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
} as const;

// Performance Thresholds
export const PERFORMANCE_THRESHOLDS = {
  lcp: 2500, // Largest Contentful Paint (ms)
  fid: 100,  // First Input Delay (ms)
  cls: 0.1,  // Cumulative Layout Shift
  lighthouse: 90, // Lighthouse score threshold
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  generic: 'Something went wrong. Please try again.',
  network: 'Network error. Please check your connection.',
  validation: 'Please check your input and try again.',
  server: 'Server error. Please try again later.',
  notFound: 'The requested resource was not found.',
  unauthorized: 'You are not authorized to perform this action.',
  timeout: 'Request timed out. Please try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  contactForm: 'Thank you for your message! We\'ll get back to you soon.',
  demoRequest: 'Demo request submitted! We\'ll contact you within 24 hours.',
  newsletter: 'Successfully subscribed to our newsletter!',
  fileUpload: 'File uploaded successfully.',
} as const;

// Regular Expressions
export const REGEX_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s\-\(\)]+$/,
  website: /^https?:\/\/.+\..+/,
  strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
} as const;

// Development Configuration
export const DEV_CONFIG = {
  showGrid: process.env.NODE_ENV === 'development',
  debugAnimations: process.env.NODE_ENV === 'development',
  logLevel: process.env.NODE_ENV === 'development' ? 'debug' : 'error',
} as const;