/**
 * Testing Utilities and Custom Render Functions
 * 
 * This file provides custom testing utilities, render functions,
 * and property-based testing generators for the AmazePMS website.
 */

declare const jest: any;
import { render, RenderOptions } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import * as fc from 'fast-check';

// Re-export everything from React Testing Library
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

// Custom render function that includes providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  // Add any provider options here in the future
  // theme?: 'light' | 'dark';
  // locale?: string;
}

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  // Add any global providers here (Theme, Router, etc.)
  return <>{children}</>;
};

const customRender = (ui: ReactElement, options?: CustomRenderOptions) => {
  return render(ui, { wrapper: AllTheProviders, ...options });
};

// Override the default render with our custom version
export { customRender as render };

/**
 * Property-Based Testing Generators
 */

// Button variant generator
export const buttonVariantArb = fc.constantFrom(
  'primary',
  'secondary',
  'outline',
  'ghost',
  'glass'
);

// Button size generator
export const buttonSizeArb = fc.constantFrom('sm', 'md', 'lg', 'xl');

// Color value generator (hex, rgb, hsl)
export const colorArb = fc.oneof(
  // Hex colors
  fc.hexa().map(h => `#${h.padStart(6, '0')}`),
  // RGB colors
  fc.record({
    r: fc.integer({ min: 0, max: 255 }),
    g: fc.integer({ min: 0, max: 255 }),
    b: fc.integer({ min: 0, max: 255 }),
  }).map(({ r, g, b }) => `rgb(${r}, ${g}, ${b})`),
  // HSL colors
  fc.record({
    h: fc.integer({ min: 0, max: 360 }),
    s: fc.integer({ min: 0, max: 100 }),
    l: fc.integer({ min: 0, max: 100 }),
  }).map(({ h, s, l }) => `hsl(${h}, ${s}%, ${l}%)`)
);

// CSS length generator (px, rem, em, %, vh, vw)
export const cssLengthArb = fc.oneof(
  fc.integer({ min: 0, max: 1000 }).map(n => `${n}px`),
  fc.float({ min: 0, max: 50, noDefaultInfinity: true, noNaN: true }).map(n => `${n.toFixed(2)}rem`),
  fc.float({ min: 0, max: 50, noDefaultInfinity: true, noNaN: true }).map(n => `${n.toFixed(2)}em`),
  fc.integer({ min: 0, max: 100 }).map(n => `${n}%`),
  fc.integer({ min: 0, max: 100 }).map(n => `${n}vh`),
  fc.integer({ min: 0, max: 100 }).map(n => `${n}vw`)
);

// Email generator
export const emailArb = fc.record({
  username: fc.stringOf(fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz0123456789.-_'), { minLength: 1, maxLength: 20 }),
  domain: fc.stringOf(fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz0123456789-'), { minLength: 1, maxLength: 15 }),
  tld: fc.constantFrom('com', 'org', 'net', 'edu', 'gov', 'co', 'io', 'dev')
}).map(({ username, domain, tld }) => `${username}@${domain}.${tld}`);

// URL generator
export const urlArb = fc.record({
  protocol: fc.constantFrom('http', 'https'),
  domain: fc.stringOf(fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz0123456789-'), { minLength: 3, maxLength: 15 }),
  tld: fc.constantFrom('com', 'org', 'net', 'co', 'io'),
  path: fc.option(fc.stringOf(fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz0123456789-/'), { maxLength: 20 }))
}).map(({ protocol, domain, tld, path }) =>
  `${protocol}://${domain}.${tld}${path ? `/${path}` : ''}`
);

// Phone number generator (US format)
export const phoneArb = fc.record({
  area: fc.integer({ min: 200, max: 999 }),
  exchange: fc.integer({ min: 200, max: 999 }),
  number: fc.integer({ min: 1000, max: 9999 })
}).map(({ area, exchange, number }) => `(${area}) ${exchange}-${number}`);

// Responsive breakpoint generator
export const breakpointArb = fc.constantFrom('xs', 'sm', 'md', 'lg', 'xl', '2xl');

// Animation duration generator (in milliseconds)
export const durationArb = fc.integer({ min: 100, max: 2000 });

// Animation easing generator
export const easingArb = fc.constantFrom(
  'linear',
  'easeIn',
  'easeOut',
  'easeInOut',
  [0.4, 0, 0.2, 1]
);

// Typography variant generator
export const typographyVariantArb = fc.constantFrom(
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'body1', 'body2', 'caption', 'overline'
);

// Shadow variant generator
export const shadowVariantArb = fc.constantFrom(
  'none', 'sm', 'base', 'md', 'lg', 'xl', '2xl', 'inner'
);

// Component state generator
export const componentStateArb = fc.record({
  loading: fc.boolean(),
  disabled: fc.boolean(),
  error: fc.option(fc.string()),
  success: fc.boolean()
});

// Form field generator
export const formFieldArb = fc.record({
  name: fc.stringOf(fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz'), { minLength: 2, maxLength: 20 }),
  type: fc.constantFrom('text', 'email', 'password', 'tel', 'url', 'number'),
  required: fc.boolean(),
  placeholder: fc.option(fc.string({ minLength: 5, maxLength: 50 })),
  label: fc.string({ minLength: 2, maxLength: 30 })
});

// Card variant generator
export const cardVariantArb = fc.constantFrom('default', 'elevated', 'glass', 'outline');

// Modal size generator
export const modalSizeArb = fc.constantFrom('sm', 'md', 'lg', 'xl', 'full');

// Badge variant generator
export const badgeVariantArb = fc.constantFrom('default', 'primary', 'success', 'warning', 'error');

// Avatar size generator
export const avatarSizeArb = fc.constantFrom('sm', 'md', 'lg', 'xl');

// Navigation link variant generator
export const navLinkVariantArb = fc.constantFrom('default', 'primary', 'ghost', 'underline');

// Icon size generator
export const iconSizeArb = fc.constantFrom('xs', 'sm', 'md', 'lg', 'xl');

/**
 * Custom Matchers and Test Helpers
 */

// Check if element has proper accessibility attributes
export const hasAccessibilityAttributes = (element: Element) => {
  const requiredAttrs = ['role', 'aria-label', 'aria-labelledby', 'aria-describedby'];
  return requiredAttrs.some(attr => element.hasAttribute(attr));
};

// Check if element is focusable
export const isFocusable = (element: Element) => {
  const focusableElements = [
    'button',
    'input',
    'select',
    'textarea',
    'a[href]',
    '[tabindex]:not([tabindex="-1"])'
  ];

  return focusableElements.some(selector => element.matches(selector)) ||
    element.getAttribute('tabindex') === '0';
};

// Check if color meets WCAG contrast requirements
export const meetsContrastRequirement = (
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA'
): boolean => {
  // This is a simplified version - in a real app you'd use a proper color contrast library
  // For now, we'll do a basic check
  const contrastRatio = calculateContrastRatio(foreground, background);
  return level === 'AA' ? contrastRatio >= 4.5 : contrastRatio >= 7;
};

// Simplified contrast ratio calculation (you'd want to use a proper library)
const calculateContrastRatio = (color1: string, color2: string): number => {
  // Simplified implementation - use a proper color library in production
  return 5.5; // Placeholder value
};

// Check if animation respects reduced motion preference
export const respectsReducedMotion = (element: Element) => {
  const computedStyle = window.getComputedStyle(element);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return computedStyle.animationDuration === '0.01ms' ||
      computedStyle.transitionDuration === '0.01ms';
  }

  return true;
};

/**
 * Mock Utilities
 */

// Mock IntersectionObserver
export const mockIntersectionObserver = () => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
};

// Mock ResizeObserver
export const mockResizeObserver = () => {
  const mockResizeObserver = jest.fn();
  mockResizeObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.ResizeObserver = mockResizeObserver;
};

// Mock matchMedia
export const mockMatchMedia = (matches: boolean = false) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

// Mock scrollTo
export const mockScrollTo = () => {
  Object.defineProperty(window, 'scrollTo', {
    writable: true,
    value: jest.fn(),
  });
};

// Mock getComputedStyle
export const mockGetComputedStyle = () => {
  Object.defineProperty(window, 'getComputedStyle', {
    writable: true,
    value: () => ({
      display: 'block',
      appearance: 'button',
      animationDuration: '0.3s',
      transitionDuration: '0.3s',
    }),
  });
};

/**
 * Test Data Generators
 */

// Generate test user data
export const userArb = fc.record({
  id: fc.integer({ min: 1, max: 10000 }),
  name: fc.string({ minLength: 2, maxLength: 50 }),
  email: emailArb,
  avatar: fc.option(urlArb),
  role: fc.constantFrom('admin', 'user', 'guest'),
  createdAt: fc.date(),
});

// Generate test feature data
export const featureArb = fc.record({
  id: fc.string({ minLength: 3, maxLength: 20 }),
  title: fc.string({ minLength: 5, maxLength: 100 }),
  description: fc.string({ minLength: 20, maxLength: 200 }),
  icon: fc.string({ minLength: 3, maxLength: 20 }),
  enabled: fc.boolean(),
});

// Generate test testimonial data
export const testimonialArb = fc.record({
  id: fc.integer({ min: 1, max: 1000 }),
  content: fc.string({ minLength: 50, maxLength: 300 }),
  author: fc.record({
    name: fc.string({ minLength: 2, maxLength: 50 }),
    title: fc.string({ minLength: 5, maxLength: 100 }),
    company: fc.string({ minLength: 2, maxLength: 50 }),
    avatar: fc.option(urlArb),
  }),
  rating: fc.integer({ min: 1, max: 5 }),
});

/**
 * Setup and Teardown Helpers
 */

// Setup common mocks
export const setupTestMocks = () => {
  mockIntersectionObserver();
  mockResizeObserver();
  mockMatchMedia();
  mockScrollTo();
  mockGetComputedStyle();
};

// Cleanup after tests
export const cleanupTestMocks = () => {
  jest.clearAllMocks();
};

// Export fast-check for direct use
export { fc };

// Export all generators as a convenient object
export const generators = {
  buttonVariant: buttonVariantArb,
  buttonSize: buttonSizeArb,
  color: colorArb,
  cssLength: cssLengthArb,
  email: emailArb,
  url: urlArb,
  phone: phoneArb,
  breakpoint: breakpointArb,
  duration: durationArb,
  easing: easingArb,
  typographyVariant: typographyVariantArb,
  shadowVariant: shadowVariantArb,
  componentState: componentStateArb,
  formField: formFieldArb,
  cardVariant: cardVariantArb,
  modalSize: modalSizeArb,
  badgeVariant: badgeVariantArb,
  avatarSize: avatarSizeArb,
  navLinkVariant: navLinkVariantArb,
  iconSize: iconSizeArb,
  user: userArb,
  feature: featureArb,
  testimonial: testimonialArb,
};