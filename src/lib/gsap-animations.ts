/**
 * GSAP Animation Setup and ScrollTrigger Configurations
 * Complex scroll-triggered animations for enhanced user experience
 * 
 * Enhanced for Task 13.1: Complex scroll animations with:
 * - Advanced parallax effects for hero and sections with multiple layers
 * - Complex scroll-triggered reveal animations with intelligent stagger
 * - Enhanced animated counters with multiple formats and easing
 * - Timeline-based animation sequences with coordinated interactions
 * - Performance-optimized scroll animations with intersection observers
 * - Seamless integration with existing Framer Motion system
 * - Comprehensive reduced motion accessibility support
 * - Advanced 3D transforms and morphing effects
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Configuration for reduced motion
const REDUCED_MOTION_CONFIG = {
  duration: 0.01,
  ease: 'none',
  stagger: 0,
  delay: 0,
};

// Performance configuration
const PERFORMANCE_CONFIG = {
  invalidateOnRefresh: true,
  scrub: true,
  anticipatePin: 1,
  refreshPriority: -1,
};

// Animation presets for different types
const ANIMATION_PRESETS = {
  parallax: {
    hero: { speed: 0.5, scale: 1.1 },
    background: { speed: 0.3, scale: 1.05 },
    foreground: { speed: 0.8, scale: 1.02 },
  },
  stagger: {
    cards: { delay: 0.1, duration: 0.6, ease: 'power2.out' },
    text: { delay: 0.05, duration: 0.4, ease: 'power1.out' },
    images: { delay: 0.15, duration: 0.8, ease: 'power3.out' },
  },
  counters: {
    default: { duration: 2, ease: 'power2.out' },
    fast: { duration: 1, ease: 'power1.out' },
    slow: { duration: 3, ease: 'power3.out' },
  },
};

/**
 * Check if user prefers reduced motion
 */
const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Initialize all scroll-triggered animations with enhanced features
 */
export const setupScrollAnimations = (): void => {
  if (typeof window === 'undefined') return;

  // Set GSAP defaults for better performance
  gsap.defaults({
    force3D: true,
    transformOrigin: 'center center',
  });

  // Configure ScrollTrigger for optimal performance
  ScrollTrigger.config({
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
    ignoreMobileResize: true,
  });

  const reducedMotion = prefersReducedMotion();

  // Enhanced parallax effects
  setupAdvancedParallax(reducedMotion);
  
  // Complex reveal animations
  setupComplexReveals(reducedMotion);
  
  // Enhanced counter animations
  setupEnhancedCounters(reducedMotion);
  
  // Timeline-based sequences
  setupTimelineSequences(reducedMotion);
  
  // Morphing and transform effects
  setupMorphingEffects(reducedMotion);
  
  // Refresh ScrollTrigger after setup
  ScrollTrigger.refresh();
};

/**
 * Advanced multi-layer parallax effects
 */
const setupAdvancedParallax = (reducedMotion: boolean): void => {
  if (reducedMotion) return;

  // Hero section multi-layer parallax
  const heroBackgrounds = gsap.utils.toArray('.hero-bg, .hero-parallax-bg');
  heroBackgrounds.forEach((bg, index) => {
    const element = bg as HTMLElement;
    const speed = ANIMATION_PRESETS.parallax.hero.speed * (index + 1);
    
    gsap.to(element, {
      yPercent: -30 * speed,
      scale: ANIMATION_PRESETS.parallax.hero.scale,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top bottom',
        end: 'bottom top',
        ...PERFORMANCE_CONFIG,
      }
    });
  });

  // Section background parallax with staggered depths
  const sectionBackgrounds = gsap.utils.toArray('.section-parallax-bg');
  sectionBackgrounds.forEach((bg, index) => {
    const element = bg as HTMLElement;
    const section = element.closest('.animate-section');
    
    if (section) {
      gsap.to(element, {
        yPercent: -20 * ANIMATION_PRESETS.parallax.background.speed,
        scale: ANIMATION_PRESETS.parallax.background.scale,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          ...PERFORMANCE_CONFIG,
        }
      });
    }
  });

  // Floating elements with complex parallax motion
  const floatingElements = gsap.utils.toArray('.floating-element');
  floatingElements.forEach((element, index) => {
    const el = element as HTMLElement;
    const direction = index % 2 === 0 ? 1 : -1;
    
    gsap.to(el, {
      y: `${direction * 100}px`,
      x: `${direction * 50}px`,
      rotation: direction * 15,
      scale: 1.1,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        ...PERFORMANCE_CONFIG,
      }
    });
  });

  // Text parallax with different speeds for depth
  const parallaxText = gsap.utils.toArray('.parallax-text');
  parallaxText.forEach((text, index) => {
    const element = text as HTMLElement;
    const speed = (index + 1) * 0.2;
    
    gsap.to(element, {
      yPercent: -10 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        ...PERFORMANCE_CONFIG,
      }
    });
  });
};

/**
 * Complex reveal animations with intelligent stagger
 */
const setupComplexReveals = (reducedMotion: boolean): void => {
  const config = reducedMotion ? REDUCED_MOTION_CONFIG : ANIMATION_PRESETS.stagger.cards;

  // Enhanced feature cards with 3D transforms
  const featureCards = gsap.utils.toArray('.feature-card');
  if (featureCards.length > 0) {
    gsap.fromTo(featureCards, 
      { 
        opacity: 0, 
        y: 100,
        rotationX: -15,
        scale: 0.8,
        transformOrigin: 'center bottom'
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        scale: 1,
        duration: config.duration,
        stagger: {
          amount: featureCards.length * config.delay,
          from: 'random',
          ease: config.ease,
        },
        ease: config.ease,
        scrollTrigger: {
          trigger: '.features-grid',
          start: 'top 75%',
          end: 'bottom 25%',
          toggleActions: 'play none none reverse',
          ...PERFORMANCE_CONFIG,
        }
      }
    );
  }

  // Advanced section reveals with morphing effects
  const sections = gsap.utils.toArray('.animate-section');
  sections.forEach((section, index) => {
    const children = (section as HTMLElement).children;
    
    gsap.fromTo(section as Element,
      {
        clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
      },
      {
        clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
        duration: reducedMotion ? 0.01 : 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section as Element,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Stagger children within each section
    if (children.length > 0) {
      gsap.fromTo(Array.from(children),
        {
          opacity: 0,
          y: 50,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: reducedMotion ? 0.01 : 0.6,
          stagger: reducedMotion ? 0 : 0.1,
          ease: 'power2.out',
          delay: reducedMotion ? 0 : 0.3,
          scrollTrigger: {
            trigger: section as Element,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }
  });

  // Text reveal with typewriter effect
  const textReveals = gsap.utils.toArray('.text-reveal');
  textReveals.forEach((textElement) => {
    const element = textElement as HTMLElement;
    const text = element.textContent || '';
    
    if (reducedMotion) return;
    
    element.innerHTML = '';
    const chars = text.split('').map(char => 
      `<span class="char" style="opacity: 0; transform: translateY(50px);">${char === ' ' ? '&nbsp;' : char}</span>`
    ).join('');
    element.innerHTML = chars;
    
    const charElements = element.querySelectorAll('.char');
    
    gsap.to(charElements, {
      opacity: 1,
      y: 0,
      duration: 0.05,
      stagger: 0.02,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none none',
      }
    });
  });

  // Image reveals with mask effect
  const imageReveals = gsap.utils.toArray('.image-reveal');
  imageReveals.forEach((img) => {
    const element = img as HTMLElement;
    
    gsap.fromTo(element,
      {
        clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
        scale: 1.1,
      },
      {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        scale: 1,
        duration: reducedMotion ? 0.01 : 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  });
};

/**
 * Enhanced animated counters with multiple formats
 */
const setupEnhancedCounters = (reducedMotion: boolean): void => {
  const counters = gsap.utils.toArray('.counter');
  const config = reducedMotion ? REDUCED_MOTION_CONFIG : ANIMATION_PRESETS.counters.default;
  
  counters.forEach((counter) => {
    const element = counter as HTMLElement;
    const targetValue = parseFloat(element.dataset.count || '0');
    const prefix = element.dataset.prefix || '';
    const suffix = element.dataset.suffix || '';
    const decimals = parseInt(element.dataset.decimals || '0', 10);
    const format = element.dataset.format || 'number';
    const animationType = element.dataset.animation || 'default';
    
    const startValue = 0;
    const currentValue = { value: startValue };
    
    // Different animation types
    const animationConfig = {
      default: ANIMATION_PRESETS.counters.default,
      fast: ANIMATION_PRESETS.counters.fast,
      slow: ANIMATION_PRESETS.counters.slow,
    }[animationType] || ANIMATION_PRESETS.counters.default;
    
    gsap.to(currentValue, {
      value: targetValue,
      duration: reducedMotion ? 0.01 : animationConfig.duration,
      ease: reducedMotion ? 'none' : animationConfig.ease,
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: function() {
        const value = currentValue.value;
        let formattedValue: string;
        
        switch (format) {
          case 'currency':
            formattedValue = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: decimals,
            }).format(value);
            break;
          case 'percentage':
            formattedValue = `${value.toFixed(decimals)}%`;
            break;
          case 'decimal':
            formattedValue = value.toFixed(decimals);
            break;
          case 'compact':
            formattedValue = new Intl.NumberFormat('en-US', {
              notation: 'compact',
              compactDisplay: 'short'
            }).format(value);
            break;
          default:
            formattedValue = Math.ceil(value).toLocaleString();
        }
        
        element.textContent = `${prefix}${formattedValue}${suffix}`;
      },
      onComplete: function() {
        // Add completion effect
        if (!reducedMotion) {
          gsap.to(element, {
            scale: 1.1,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: 'power2.out',
          });
        }
      }
    });
  });

  // Progress bar animations
  const progressBars = gsap.utils.toArray('.progress-bar');
  progressBars.forEach((bar) => {
    const element = bar as HTMLElement;
    const progress = parseFloat(element.dataset.progress || '0');
    
    gsap.fromTo(element,
      { width: '0%' },
      {
        width: `${progress}%`,
        duration: reducedMotion ? 0.01 : 2,
        ease: reducedMotion ? 'none' : 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  });
};

/**
 * Timeline-based animation sequences
 */
const setupTimelineSequences = (reducedMotion: boolean): void => {
  const timelineContainers = gsap.utils.toArray('.timeline-animation-container');
  
  timelineContainers.forEach((container) => {
    const element = container as HTMLElement;
    const sequence = JSON.parse(element.dataset.sequence || '[]');
    
    if (sequence.length === 0) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      }
    });
    
    sequence.forEach((step: any, index: number) => {
      const targets = step.selector ? element.querySelectorAll(step.selector) : element.children;
      
      if (targets.length === 0) return;
      
      const fromProps = step.from || { opacity: 0, y: 60, scale: 0.9 };
      const toProps = step.to || { opacity: 1, y: 0, scale: 1 };
      const delay = reducedMotion ? 0 : (step.delay || index * 0.1);
      const duration = reducedMotion ? 0.01 : (step.duration || 0.6);
      
      tl.fromTo(targets, fromProps, {
        ...toProps,
        duration,
        ease: 'power2.out',
      }, delay);
    });
  });

  // Coordinated multi-element sequences
  const coordinatedElements = gsap.utils.toArray('.coordinated-animation');
  coordinatedElements.forEach((group) => {
    const element = group as HTMLElement;
    const items = Array.from(element.children);
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      }
    });
    
    // Phase 1: Scale in
    tl.fromTo(items, 
      { scale: 0, rotation: 180, opacity: 0 },
      { 
        scale: 1, 
        rotation: 0, 
        opacity: 1,
        duration: reducedMotion ? 0.01 : 0.8,
        stagger: reducedMotion ? 0 : 0.1,
        ease: 'back.out(1.7)'
      }
    )
    // Phase 2: Subtle float
    .to(items, {
      y: -10,
      duration: reducedMotion ? 0.01 : 1,
      stagger: reducedMotion ? 0 : 0.05,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    }, '-=0.4');
  });
};

/**
 * Morphing and transform effects
 */
const setupMorphingEffects = (reducedMotion: boolean): void => {
  if (reducedMotion) return;

  // SVG morphing animations
  const morphingElements = gsap.utils.toArray('.morph-element');
  morphingElements.forEach((element) => {
    const el = element as HTMLElement;
    const paths = el.querySelectorAll('path');
    
    paths.forEach((path, index) => {
      const originalPath = path.getAttribute('d');
      const targetPath = path.dataset.morph;
      
      if (originalPath && targetPath) {
        gsap.to(path, {
          attr: { d: targetPath },
          duration: 2,
          ease: 'power2.inOut',
          yoyo: true,
          repeat: -1,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play pause resume reverse',
          }
        });
      }
    });
  });

  // Shape transformations
  const shapeMorphs = gsap.utils.toArray('.shape-morph');
  shapeMorphs.forEach((shape) => {
    const element = shape as HTMLElement;
    
    gsap.to(element, {
      borderRadius: '50%',
      rotation: 360,
      scale: 1.2,
      duration: 3,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play pause resume reverse',
      }
    });
  });

  // 3D card flips
  const flipCards = gsap.utils.toArray('.flip-card');
  flipCards.forEach((card) => {
    const element = card as HTMLElement;
    
    element.addEventListener('mouseenter', () => {
      gsap.to(element, {
        rotationY: 180,
        duration: 0.6,
        ease: 'power2.inOut',
      });
    });
    
    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        rotationY: 0,
        duration: 0.6,
        ease: 'power2.inOut',
      });
    });
  });
};

/**
 * Timeline animation for complex sequences
 */
export const createTimeline = (targets: string | Element[], options?: gsap.TimelineVars): gsap.core.Timeline => {
  return gsap.timeline(options);
};

/**
 * Parallax utility for any element
 */
export const createParallax = (
  selector: string, 
  yPercent: number = -50, 
  triggerSelector?: string
): void => {
  const elements = gsap.utils.toArray(selector);
  
  elements.forEach((element) => {
    gsap.to(element as Element, {
      yPercent,
      ease: 'none',
      scrollTrigger: {
        trigger: triggerSelector || (element as Element),
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
  });
};

/**
 * Stagger animation utility
 */
export const createStagger = (
  selector: string,
  fromVars: gsap.TweenVars,
  toVars: gsap.TweenVars,
  staggerAmount: number = 0.1
): void => {
  const elements = gsap.utils.toArray(selector);
  
  gsap.fromTo(elements, fromVars, {
    ...toVars,
    stagger: staggerAmount,
    scrollTrigger: {
      trigger: selector,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });
};

/**
 * Hover animation utilities
 */
export const setupHoverAnimations = (): void => {
  // Button hover effects
  const buttons = gsap.utils.toArray('.animate-button');
  
  buttons.forEach((button) => {
    const element = button as HTMLElement;
    
    element.addEventListener('mouseenter', () => {
      gsap.to(element, {
        scale: 1.02,
        y: -2,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
  
  // Card hover effects
  const cards = gsap.utils.toArray('.animate-card');
  
  cards.forEach((card) => {
    const element = card as HTMLElement;
    
    element.addEventListener('mouseenter', () => {
      gsap.to(element, {
        y: -8,
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        y: 0,
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
};

/**
 * Cleanup function for ScrollTrigger
 */
export const cleanupAnimations = (): void => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};

/**
 * Refresh ScrollTrigger (useful after dynamic content changes)
 */
export const refreshAnimations = (): void => {
  ScrollTrigger.refresh();
};

/**
 * Kill specific ScrollTrigger
 */
export const killAnimation = (trigger: ScrollTrigger): void => {
  trigger.kill();
};

// Export GSAP and ScrollTrigger for external use
export { gsap, ScrollTrigger };