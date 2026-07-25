/**
 * GSAP Configuration and Setup
 * 
 * This file contains GSAP initialization, ScrollTrigger setup,
 * and complex animation sequences for the AmazePMS website.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// GSAP Global Configuration
gsap.config({
  nullTargetWarn: false,
  trialWarn: false,
});

// Set global defaults
gsap.defaults({
  duration: 0.6,
  ease: 'power2.out',
});

/**
 * Initialize GSAP with performance optimizations
 */
export const initGSAP = () => {
  if (typeof window === 'undefined') return;

  // Set up ScrollTrigger defaults
  ScrollTrigger.defaults({
    toggleActions: 'play none none reverse',
    markers: false, // Set to true for debugging
    start: 'top 80%',
    end: 'bottom 20%',
  });

  // Performance optimizations
  ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
  });

  // Refresh ScrollTrigger on window resize (debounced)
  let resizeTimeout: NodeJS.Timeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
  });
};

/**
 * Cleanup GSAP instances
 */
export const cleanupGSAP = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  gsap.globalTimeline.clear();
};

/**
 * Hero Section Parallax Animation
 */
export const createHeroParallax = (selector: string) => {
  if (typeof window === 'undefined') return;

  const element = document.querySelector(selector);
  if (!element) return;

  return gsap.to(element, {
    yPercent: -50,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
};

/**
 * Staggered Reveal Animation
 */
export const createStaggerReveal = (
  selector: string,
  options: {
    stagger?: number;
    start?: string;
    end?: string;
    y?: number;
    opacity?: number;
    duration?: number;
  } = {}
) => {
  if (typeof window === 'undefined') return;

  const {
    stagger = 0.2,
    start = 'top 80%',
    end = 'bottom 20%',
    y = 100,
    opacity = 0,
    duration = 0.6,
  } = options;

  const elements = document.querySelectorAll(selector);
  if (elements.length === 0) return;

  // Set initial state
  gsap.set(elements, { y, opacity });

  return gsap.to(elements, {
    y: 0,
    opacity: 1,
    duration,
    stagger,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: elements[0],
      start,
      end,
      toggleActions: 'play none none reverse',
    },
  });
};

/**
 * Counter Animation
 */
export const createCounter = (
  selector: string,
  options: {
    start?: number;
    end: number;
    duration?: number;
    format?: (value: number) => string;
  }
) => {
  if (typeof window === 'undefined') return;

  const element = document.querySelector(selector);
  if (!element) return;

  const {
    start = 0,
    end,
    duration = 2,
    format = (value: number) => Math.round(value).toString(),
  } = options;

  const counter = { value: start };

  return gsap.to(counter, {
    value: end,
    duration,
    ease: 'power2.out',
    onUpdate() {
      element.textContent = format(counter.value);
    },
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });
};

/**
 * Text Reveal Animation (mask-based)
 */
export const createTextReveal = (selector: string) => {
  if (typeof window === 'undefined') return;

  const elements = document.querySelectorAll(selector);
  if (elements.length === 0) return;

  elements.forEach((element) => {
    const text = element.textContent;
    if (!text) return;

    // Wrap each word in a span
    const words = text.split(' ').map((word) => `<span>${word}</span>`);
    element.innerHTML = words.join(' ');

    const wordSpans = element.querySelectorAll('span');

    // Set initial state
    gsap.set(wordSpans, {
      y: '100%',
      opacity: 0,
    });

    // Create reveal animation
    gsap.to(wordSpans, {
      y: '0%',
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  });
};

/**
 * Floating Animation for Dashboard Elements
 */
export const createFloatingElements = (selector: string) => {
  if (typeof window === 'undefined') return;

  const elements = document.querySelectorAll(selector);
  if (elements.length === 0) return;

  elements.forEach((element, index) => {
    gsap.to(element, {
      y: -20,
      duration: 2 + index * 0.5,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
      delay: index * 0.3,
    });
  });
};

/**
 * Morphing Background Gradient
 */
export const createMorphingGradient = (selector: string) => {
  if (typeof window === 'undefined') return;

  const element = document.querySelector(selector);
  if (!element) return;

  const tl = gsap.timeline({ repeat: -1, yoyo: true });

  tl.to(element, {
    background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
    duration: 4,
    ease: 'power2.inOut',
  })
    .to(element, {
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      duration: 4,
      ease: 'power2.inOut',
    })
    .to(element, {
      background: 'linear-gradient(225deg, #4facfe 0%, #00f2fe 100%)',
      duration: 4,
      ease: 'power2.inOut',
    });

  return tl;
};

/**
 * Progressive Loading Animation
 */
export const createProgressiveLoad = (selectors: string[]) => {
  if (typeof window === 'undefined') return;

  const tl = gsap.timeline();

  selectors.forEach((selector, index) => {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) return;

    tl.fromTo(
      elements,
      {
        opacity: 0,
        y: 50,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      },
      index * 0.2
    );
  });

  return tl;
};

/**
 * Scroll-triggered Pin Animation
 */
export const createPinAnimation = (
  triggerSelector: string,
  pinSelector: string,
  options: {
    start?: string;
    end?: string;
    scrub?: boolean | number;
  } = {}
) => {
  if (typeof window === 'undefined') return;

  const { start = 'top top', end = 'bottom top', scrub = true } = options;

  return ScrollTrigger.create({
    trigger: triggerSelector,
    pin: pinSelector,
    start,
    end,
    scrub,
    pinSpacing: false,
  });
};

/**
 * Mouse Parallax Effect
 */
export const createMouseParallax = (
  selector: string,
  intensity: number = 0.1
) => {
  if (typeof window === 'undefined') return;

  const element = document.querySelector(selector);
  if (!element) return;

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    const xPercent = (clientX / innerWidth - 0.5) * 100 * intensity;
    const yPercent = (clientY / innerHeight - 0.5) * 100 * intensity;

    gsap.to(element, {
      x: xPercent,
      y: yPercent,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  window.addEventListener('mousemove', handleMouseMove);

  // Cleanup function
  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
  };
};

/**
 * Image Reveal Animation with Mask
 */
export const createImageReveal = (selector: string) => {
  if (typeof window === 'undefined') return;

  const images = document.querySelectorAll(selector);
  if (images.length === 0) return;

  images.forEach((img) => {
    // Create mask overlay
    const mask = document.createElement('div');
    mask.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent 0%, white 50%, transparent 100%);
      z-index: 1;
    `;

    const parent = img.parentElement;
    if (parent) {
      parent.style.position = 'relative';
      parent.style.overflow = 'hidden';
      parent.appendChild(mask);

      // Animate mask
      gsap.fromTo(
        mask,
        { x: '-100%' },
        {
          x: '100%',
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: img,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          onComplete: () => {
            mask.remove();
          },
        }
      );
    }
  });
};

/**
 * Create custom ScrollTrigger batch for performance
 */
export const createScrollBatch = (
  selector: string,
  animation: GSAPTweenVars,
  options: ScrollTrigger.BatchVars = {}
) => {
  if (typeof window === 'undefined') return;

  return ScrollTrigger.batch(selector, {
    onEnter: (elements) => gsap.from(elements, animation),
    onLeave: (elements) => gsap.to(elements, { opacity: 0.3 }),
    onEnterBack: (elements) => gsap.to(elements, { opacity: 1 }),
    start: 'top bottom-=100',
    end: 'bottom top+=100',
    ...options,
  });
};

// Utility function to check if animations should be reduced
export const shouldReduceMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Apply reduced motion settings
export const applyReducedMotion = () => {
  if (shouldReduceMotion()) {
    gsap.globalTimeline.timeScale(100); // Make animations nearly instantaneous
    ScrollTrigger.config({ limitCallbacks: true });
  }
};

// Export all animation creators
export const animations = {
  createHeroParallax,
  createStaggerReveal,
  createCounter,
  createTextReveal,
  createFloatingElements,
  createMorphingGradient,
  createProgressiveLoad,
  createPinAnimation,
  createMouseParallax,
  createImageReveal,
  createScrollBatch,
};

export default animations;