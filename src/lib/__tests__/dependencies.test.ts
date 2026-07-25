/**
 * Dependency Configuration Tests
 * Validates that all core dependencies are properly installed and configured
 */

import { validateDependencies, validateAnimationSetup, validateTestingSetup } from '../dependency-check';

describe('Core Dependencies', () => {
  test('should have all required dependencies installed', () => {
    const result = validateDependencies();
    
    expect(result.success).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('should be able to import Framer Motion', () => {
    expect(() => {
      const { motion } = require('framer-motion');
      expect(motion).toBeDefined();
    }).not.toThrow();
  });

  test('should be able to import GSAP', () => {
    expect(() => {
      const { gsap } = require('gsap');
      expect(gsap).toBeDefined();
    }).not.toThrow();
  });

  test('should be able to import GSAP ScrollTrigger', () => {
    expect(() => {
      const { ScrollTrigger } = require('gsap/ScrollTrigger');
      expect(ScrollTrigger).toBeDefined();
    }).not.toThrow();
  });

  test('should be able to import Lenis', () => {
    expect(() => {
      const Lenis = require('@studio-freight/lenis');
      expect(Lenis).toBeDefined();
    }).not.toThrow();
  });

  test('should be able to import fast-check', () => {
    expect(() => {
      const fc = require('fast-check');
      expect(fc).toBeDefined();
      expect(fc.integer).toBeDefined();
    }).not.toThrow();
  });

  test('should be able to import React Testing Library', () => {
    expect(() => {
      const { render, screen } = require('@testing-library/react');
      expect(render).toBeDefined();
      expect(screen).toBeDefined();
    }).not.toThrow();
  });

  test('should be able to import Jest DOM matchers', () => {
    expect(() => {
      require('@testing-library/jest-dom');
    }).not.toThrow();
  });

  test('should have utility libraries available', () => {
    expect(() => {
      const clsx = require('clsx');
      const { twMerge } = require('tailwind-merge');
      const { cva } = require('class-variance-authority');
      
      expect(clsx).toBeDefined();
      expect(twMerge).toBeDefined();
      expect(cva).toBeDefined();
    }).not.toThrow();
  });
});

describe('Animation Setup', () => {
  test('should validate animation setup successfully', () => {
    // Mock window object for GSAP
    Object.defineProperty(global, 'window', {
      value: {
        matchMedia: jest.fn(() => ({
          matches: false,
          media: '',
          onchange: null,
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
        })),
      },
      writable: true,
    });

    const isValid = validateAnimationSetup();
    expect(isValid).toBe(true);
  });

  test('should be able to create motion variants', () => {
    const { fadeInUp, scaleOnHover } = require('../animations');
    
    expect(fadeInUp).toBeDefined();
    expect(fadeInUp.initial).toBeDefined();
    expect(fadeInUp.animate).toBeDefined();
    
    expect(scaleOnHover).toBeDefined();
    expect(scaleOnHover.hover).toBeDefined();
  });
});

describe('Testing Setup', () => {
  test('should validate testing setup successfully', () => {
    const isValid = validateTestingSetup();
    expect(isValid).toBe(true);
  });

  test('should have custom render function available', () => {
    const { render } = require('../test-utils');
    expect(render).toBeDefined();
  });

  test('should have property-based testing generators', () => {
    const { 
      buttonVariantArb, 
      colorArb, 
      emailArb,
      fc 
    } = require('../test-utils');
    
    expect(buttonVariantArb).toBeDefined();
    expect(colorArb).toBeDefined();
    expect(emailArb).toBeDefined();
    expect(fc).toBeDefined();
  });
});

describe('Configuration Files', () => {
  test('should have Jest configuration', () => {
    expect(() => {
      const jestConfig = require('../../../jest.config.js');
      expect(jestConfig).toBeDefined();
    }).not.toThrow();
  });

  test('should have animation configurations available', () => {
    const { initSmoothScroll } = require('../smooth-scroll');
    const { initGSAP } = require('../gsap-config');
    
    expect(initSmoothScroll).toBeDefined();
    expect(initGSAP).toBeDefined();
  });
});