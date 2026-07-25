/**
 * Lenis Smooth Scroll Configuration
 * 
 * This file provides smooth scrolling functionality using Lenis
 * with performance optimizations and accessibility considerations.
 */

/* eslint-disable no-console */
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Type definitions
export interface SmoothScrollOptions {
  duration?: number;
  easing?: (t: number) => number;
  direction?: 'vertical' | 'horizontal';
  gestureDirection?: 'vertical' | 'horizontal' | 'both';
  smooth?: boolean;
  mouseMultiplier?: number;
  smoothTouch?: boolean;
  touchMultiplier?: number;
  infinite?: boolean;
  autoResize?: boolean;
  wrapper?: HTMLElement;
  content?: HTMLElement;
}

export interface SmoothScrollInstance {
  lenis: Lenis | null;
  rafId: number | null;
  isEnabled: boolean;
  destroy: () => void;
  start: () => void;
  stop: () => void;
  scrollTo: (target: string | number | HTMLElement, options?: any) => void;
}

// Default easing function for smooth, natural feel
const defaultEasing = (t: number): number => {
  return Math.min(1, 1.001 - Math.pow(2, -10 * t));
};

// Check if user prefers reduced motion
const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Check if device is mobile/touch device
const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth < 768;
};

// Check if device has limited performance capabilities
const hasLimitedPerformance = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  
  // Check for low-end devices
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  
  if (connection) {
    // Slow connection or save-data mode
    if (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      return true;
    }
  }
  
  // Check device memory (if available)
  const deviceMemory = (navigator as any).deviceMemory;
  if (deviceMemory && deviceMemory < 4) {
    return true;
  }
  
  return false;
};

/**
 * Create optimized Lenis configuration based on device capabilities
 */
const createOptimizedConfig = (userOptions: SmoothScrollOptions = {}): SmoothScrollOptions => {
  const mobile = isMobile();
  const reducedMotion = prefersReducedMotion();
  const limitedPerformance = hasLimitedPerformance();

  // Base configuration
  const baseConfig: SmoothScrollOptions = {
    duration: 1.2,
    easing: defaultEasing,
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false, // Disabled on mobile by default for better performance
    touchMultiplier: 2,
    infinite: false,
    autoResize: true,
  };

  // Adjust for reduced motion
  if (reducedMotion) {
    return {
      ...baseConfig,
      duration: 0.1,
      smooth: false,
      ...userOptions,
    };
  }

  // Adjust for mobile devices
  if (mobile) {
    return {
      ...baseConfig,
      duration: 0.8,
      mouseMultiplier: 0.5,
      smoothTouch: false, // Keep disabled for better mobile performance
      touchMultiplier: 1.5,
      ...userOptions,
    };
  }

  // Adjust for limited performance devices
  if (limitedPerformance) {
    return {
      ...baseConfig,
      duration: 0.6,
      mouseMultiplier: 0.8,
      ...userOptions,
    };
  }

  // High-performance desktop configuration
  return {
    ...baseConfig,
    duration: 1.2,
    mouseMultiplier: 1,
    ...userOptions,
  };
};

/**
 * Initialize Lenis smooth scrolling with optimal configuration
 */
export const initSmoothScroll = (options: SmoothScrollOptions = {}): SmoothScrollInstance => {
  let lenis: Lenis | null = null;
  let rafId: number | null = null;
  let isEnabled = true;

  // Skip initialization on server-side
  if (typeof window === 'undefined') {
    return {
      lenis: null,
      rafId: null,
      isEnabled: false,
      destroy: () => {},
      start: () => {},
      stop: () => {},
      scrollTo: () => {},
    };
  }

  // Don't initialize if user prefers reduced motion and no override provided
  if (prefersReducedMotion() && !options.smooth) {
    console.log('Smooth scroll disabled due to reduced motion preference');
    return {
      lenis: null,
      rafId: null,
      isEnabled: false,
      destroy: () => {},
      start: () => {},
      stop: () => {},
      scrollTo: (target, scrollOptions) => {
        // Fallback to native scroll
        if (typeof target === 'string') {
          const element = document.querySelector(target);
          element?.scrollIntoView({ behavior: 'auto', ...scrollOptions });
        } else if (typeof target === 'number') {
          window.scrollTo({ top: target, behavior: 'auto' });
        } else if (target instanceof HTMLElement) {
          target.scrollIntoView({ behavior: 'auto', ...scrollOptions });
        }
      },
    };
  }

  try {
    // Create optimized configuration
    const config = createOptimizedConfig(options);
    
    // Initialize Lenis
    lenis = new Lenis(config);

    // Connect Lenis with GSAP ScrollTrigger for maximum compatibility
    lenis.on('scroll', ScrollTrigger.update);

    // Start the RAF loop
    const raf = (time: number) => {
      if (lenis && isEnabled) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
    };
    
    rafId = requestAnimationFrame(raf);

    // Add scroll direction class to body for CSS styling
    let lastScrollY = window.scrollY;
    lenis.on('scroll', ({ scroll }: { scroll: number }) => {
      const direction = scroll > lastScrollY ? 'down' : 'up';
      document.body.setAttribute('data-scroll-direction', direction);
      lastScrollY = scroll;
    });

    // Handle visibility change to pause/resume scroll
    const handleVisibilityChange = () => {
      if (document.hidden) {
        lenis?.stop();
      } else {
        lenis?.start();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);

    console.log('Smooth scroll initialized with Lenis');

    // Return control interface
    const instance: SmoothScrollInstance = {
      lenis,
      rafId,
      isEnabled: true,

      destroy() {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        if (lenis) {
          lenis.destroy();
          lenis = null;
        }
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        document.body.removeAttribute('data-scroll-direction');
        isEnabled = false;
        console.log('Smooth scroll destroyed');
      },

      start() {
        if (lenis && !isEnabled) {
          isEnabled = true;
          rafId = requestAnimationFrame(raf);
          console.log('Smooth scroll started');
        }
      },

      stop() {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        isEnabled = false;
        console.log('Smooth scroll stopped');
      },

      scrollTo(target, scrollOptions = {}) {
        if (lenis) {
          lenis.scrollTo(target, {
            duration: config.duration,
            easing: config.easing,
            ...scrollOptions,
          });
        }
      },
    };

    return instance;

  } catch (error) {
    console.error('Failed to initialize smooth scroll:', error);
    
    // Return fallback interface
    return {
      lenis: null,
      rafId: null,
      isEnabled: false,
      destroy: () => {},
      start: () => {},
      stop: () => {},
      scrollTo: (target, scrollOptions) => {
        // Fallback to native scroll
        if (typeof target === 'string') {
          const element = document.querySelector(target);
          element?.scrollIntoView({ behavior: 'smooth', ...scrollOptions });
        } else if (typeof target === 'number') {
          window.scrollTo({ top: target, behavior: 'smooth' });
        } else if (target instanceof HTMLElement) {
          target.scrollIntoView({ behavior: 'smooth', ...scrollOptions });
        }
      },
    };
  }
};

/**
 * Preset configurations for different use cases
 */
export const presets = {
  // Ultra-smooth for high-end desktops
  premium: {
    duration: 1.8,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    mouseMultiplier: 1.2,
  },

  // Balanced for most use cases
  standard: {
    duration: 1.2,
    easing: defaultEasing,
    mouseMultiplier: 1,
  },

  // Fast and snappy for content-heavy sites
  snappy: {
    duration: 0.8,
    easing: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    mouseMultiplier: 1.5,
  },

  // Minimal for accessibility
  minimal: {
    duration: 0.3,
    easing: (t: number) => t,
    mouseMultiplier: 0.5,
  },
};

/**
 * Utility function to scroll to an element with smooth animation
 */
export const scrollToElement = (
  target: string | HTMLElement,
  options: {
    offset?: number;
    duration?: number;
    callback?: () => void;
  } = {}
) => {
  const { offset = 0, duration = 1000, callback } = options;

  let targetElement: HTMLElement | null = null;

  if (typeof target === 'string') {
    targetElement = document.querySelector(target);
  } else {
    targetElement = target;
  }

  if (!targetElement) {
    console.warn(`Target element not found: ${target}`);
    return;
  }

  const targetPosition = targetElement.offsetTop + offset;

  // Use smooth scroll if available, otherwise fallback to native
  const smoothScroll = (window as any).lenisInstance;
  
  if (smoothScroll && smoothScroll.lenis) {
    smoothScroll.scrollTo(targetPosition, {
      duration: duration / 1000,
      onComplete: callback,
    });
  } else {
    // Native smooth scroll fallback
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
    
    if (callback) {
      setTimeout(callback, duration);
    }
  }
};

/**
 * Create a scroll spy effect for navigation highlighting
 */
export const createScrollSpy = (
  sections: string[],
  navItems: string[],
  activeClass: string = 'active'
) => {
  if (typeof window === 'undefined') return;

  const sectionElements = sections.map(selector => document.querySelector(selector)).filter(Boolean);
  const navElements = navItems.map(selector => document.querySelector(selector)).filter(Boolean);

  if (sectionElements.length === 0 || navElements.length === 0) return;

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    sectionElements.forEach((section, index) => {
      if (!section) return;
      
      const sectionTop = (section as HTMLElement).offsetTop;
      const sectionHeight = (section as HTMLElement).offsetHeight;
      const sectionBottom = sectionTop + sectionHeight;

      // Check if section is in viewport
      if (scrollY >= sectionTop - windowHeight / 3 && scrollY < sectionBottom - windowHeight / 3) {
        // Remove active class from all nav items
        navElements.forEach(nav => nav?.classList.remove(activeClass));
        
        // Add active class to corresponding nav item
        navElements[index]?.classList.add(activeClass);
      }
    });
  };

  // Use Lenis scroll event if available, otherwise use native
  const smoothScroll = (window as any).lenisInstance;
  
  if (smoothScroll && smoothScroll.lenis) {
    smoothScroll.lenis.on('scroll', handleScroll);
  } else {
    window.addEventListener('scroll', handleScroll);
  }

  // Initial call
  handleScroll();

  // Return cleanup function
  return () => {
    if (smoothScroll && smoothScroll.lenis) {
      smoothScroll.lenis.off('scroll', handleScroll);
    } else {
      window.removeEventListener('scroll', handleScroll);
    }
  };
};

// Export default initialization function
export default initSmoothScroll;