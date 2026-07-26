'use client';

import React, { createContext, useContext, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { initSmoothScroll, type SmoothScrollInstance } from '@/lib/smooth-scroll';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollAnimationContextType {
  smoothScroll: SmoothScrollInstance | null;
  isInitialized: boolean;
  refreshAnimations: () => void;
  createParallax: (element: HTMLElement, options?: ParallaxOptions) => void;
  createCounter: (element: HTMLElement, options: CounterOptions) => void;
  createStaggerReveal: (elements: NodeListOf<Element> | Element[], options?: StaggerOptions) => void;
  createTimelineSequence: (elements: Element[], options?: TimelineOptions) => gsap.core.Timeline;
}

interface ParallaxOptions {
  yPercent?: number;
  speed?: number;
  trigger?: string | Element;
  start?: string;
  end?: string;
}

interface CounterOptions {
  from: number;
  to: number;
  duration?: number;
  format?: (value: number) => string;
  trigger?: string | Element;
}

interface StaggerOptions {
  stagger?: number;
  duration?: number;
  y?: number;
  opacity?: number;
  scale?: number;
  trigger?: string | Element;
  start?: string;
}

interface TimelineOptions {
  stagger?: number;
  duration?: number;
  ease?: string;
  trigger?: string | Element;
  start?: string;
}

const ScrollAnimationContext = createContext<ScrollAnimationContextType | null>(null);

export const useScrollAnimations = () => {
  const context = useContext(ScrollAnimationContext);
  if (!context) {
    throw new Error('useScrollAnimations must be used within ScrollAnimationProvider');
  }
  return context;
};

export interface ScrollAnimationProviderProps {
  children: React.ReactNode;
  enableSmoothScroll?: boolean;
}

export const ScrollAnimationProvider: React.FC<ScrollAnimationProviderProps> = ({
  children,
  enableSmoothScroll = true,
}) => {
  const [isInitialized, setIsInitialized] = React.useState(false);
  const smoothScrollRef = useRef<SmoothScrollInstance | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const initializationRef = useRef(false);

  const setupGlobalAnimations = useCallback(() => {
    if (prefersReducedMotion) return;

    // Hero parallax background
    const heroBackground = document.querySelector('.hero-bg');
    if (heroBackground) {
      gsap.to(heroBackground, {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }

    // Header scroll behavior
    const header = document.querySelector('.site-header');
    if (header) {
      gsap.to(header, {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        duration: 0.3,
        scrollTrigger: {
          trigger: 'body',
          start: 'top -100px',
          end: 'bottom bottom',
          toggleActions: 'play none none reverse',
        },
      });
    }

    // Section reveals
    const sections = document.querySelectorAll('.animate-section');
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 80,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Feature cards stagger
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length > 0) {
      gsap.fromTo(
        featureCards,
        {
          opacity: 0,
          y: 60,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, [prefersReducedMotion]);

  // Initialize animations and smooth scroll
  useEffect(() => {
    if (typeof window === 'undefined' || initializationRef.current) return;
    
    initializationRef.current = true;

    // Set up GSAP defaults
    gsap.defaults({
      duration: 0.6,
      ease: 'power2.out',
    });

    // Configure ScrollTrigger
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
      start: 'top 80%',
      end: 'bottom 20%',
    });

    // Initialize smooth scroll if enabled and not reduced motion
    if (enableSmoothScroll && !prefersReducedMotion) {
      smoothScrollRef.current = initSmoothScroll({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
      });
    }

    // Set up global scroll animations
    setupGlobalAnimations();

    setIsInitialized(true);

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (smoothScrollRef.current) {
        smoothScrollRef.current.destroy();
      }
    };
  }, [enableSmoothScroll, prefersReducedMotion, setupGlobalAnimations]);

  // Create parallax effect for any element
  const createParallax = (element: HTMLElement, options: ParallaxOptions = {}) => {
    if (prefersReducedMotion) return;

    const {
      yPercent = -50,
      trigger = element,
      start = 'top bottom',
      end = 'bottom top',
    } = options;

    gsap.to(element, {
      yPercent,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start,
        end,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
  };

  // Create animated counter
  const createCounter = (element: HTMLElement, options: CounterOptions) => {
    if (prefersReducedMotion) return;

    const {
      from,
      to,
      duration = 2,
      format = (value: number) => Math.round(value).toLocaleString(),
      trigger = element,
    } = options;

    const counter = { value: from };

    gsap.to(counter, {
      value: to,
      duration,
      ease: 'power2.out',
      onUpdate() {
        element.textContent = format(counter.value);
      },
      scrollTrigger: {
        trigger,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  };

  // Create stagger reveal animation
  const createStaggerReveal = (
    elements: NodeListOf<Element> | Element[],
    options: StaggerOptions = {}
  ) => {
    if (prefersReducedMotion || elements.length === 0) return;

    const {
      stagger = 0.15,
      duration = 0.6,
      y = 60,
      opacity = 0,
      scale = 1,
      trigger = elements[0],
      start = 'top 80%',
    } = options;

    gsap.fromTo(
      elements,
      {
        opacity,
        y,
        scale: scale === 1 ? undefined : 0.8,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration,
        stagger,
        ease: 'power2.out',
        scrollTrigger: {
          trigger,
          start,
          toggleActions: 'play none none reverse',
        },
      }
    );
  };

  // Create timeline-based animation sequence
  const createTimelineSequence = (
    elements: Element[],
    options: TimelineOptions = {}
  ): gsap.core.Timeline => {
    const {
      stagger = 0.1,
      duration = 0.6,
      ease = 'power2.out',
      trigger = elements[0],
      start = 'top 80%',
    } = options;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        start,
        toggleActions: 'play none none reverse',
      },
    });

    elements.forEach((element, index) => {
      tl.fromTo(
        element,
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration,
          ease,
        },
        index * stagger
      );
    });

    return tl;
  };

  // Refresh all animations
  const refreshAnimations = () => {
    ScrollTrigger.refresh();
  };

  const contextValue: ScrollAnimationContextType = {
    smoothScroll: smoothScrollRef.current,
    isInitialized,
    refreshAnimations,
    createParallax,
    createCounter,
    createStaggerReveal,
    createTimelineSequence,
  };

  return (
    <ScrollAnimationContext.Provider value={contextValue}>
      {children}
    </ScrollAnimationContext.Provider>
  );
};

// Hook for creating parallax effects
export const useParallax = (
  elementRef: React.RefObject<HTMLElement>,
  options?: ParallaxOptions
) => {
  const { createParallax } = useScrollAnimations();

  useEffect(() => {
    if (elementRef.current) {
      createParallax(elementRef.current, options);
    }
  }, [createParallax, elementRef, options]);
};

// Hook for creating counters
export const useCounter = (
  elementRef: React.RefObject<HTMLElement>,
  options: CounterOptions
) => {
  const { createCounter } = useScrollAnimations();

  useEffect(() => {
    if (elementRef.current) {
      createCounter(elementRef.current, options);
    }
  }, [createCounter, elementRef, options]);
};

// Hook for creating stagger reveals
export const useStaggerReveal = (
  elementsRef: React.RefObject<HTMLElement>,
  options?: StaggerOptions
) => {
  const { createStaggerReveal } = useScrollAnimations();

  useEffect(() => {
    if (elementsRef.current) {
      const elements = elementsRef.current.children;
      if (elements.length > 0) {
        createStaggerReveal(Array.from(elements), options);
      }
    }
  }, [createStaggerReveal, elementsRef, options]);
};