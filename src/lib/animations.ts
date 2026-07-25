/**
 * Framer Motion Animation Variants and Utilities
 * 
 * This file contains pre-built animation variants for consistent
 * animations across the AmazePMS website components.
 */

import { Variants, Transition } from 'framer-motion';

// Easing functions - Using proper Framer Motion format
export const easings = {
  linear: 'linear',
  easeIn: 'easeIn',
  easeOut: 'easeOut',
  easeInOut: 'easeInOut',
  bounce: [0.25, 0.46, 0.45, 0.94],
  smooth: [0.25, 0.1, 0.25, 1.0],
  snappy: [0.4, 0.0, 0.2, 1.0],
} as const;

// Duration constants
export const durations = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
} as const;

// Common transitions
export const transitions: Record<string, Transition> = {
  default: {
    duration: durations.normal,
    ease: easings.easeOut,
  },
  fast: {
    duration: durations.fast,
    ease: easings.snappy,
  },
  smooth: {
    duration: durations.slow,
    ease: easings.smooth,
  },
  bounce: {
    duration: durations.normal,
    ease: easings.bounce,
  },
};

// Basic fade animations
export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 60,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: transitions.default,
  },
  exit: {
    opacity: 0,
    y: -60,
    transition: transitions.fast,
  },
};

export const fadeIn: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: transitions.default,
  },
  exit: {
    opacity: 0,
    transition: transitions.fast,
  },
};

export const fadeInDown: Variants = {
  initial: {
    opacity: 0,
    y: -60,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: transitions.default,
  },
  exit: {
    opacity: 0,
    y: 60,
    transition: transitions.fast,
  },
};

export const fadeInLeft: Variants = {
  initial: {
    opacity: 0,
    x: -60,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: transitions.default,
  },
  exit: {
    opacity: 0,
    x: 60,
    transition: transitions.fast,
  },
};

export const fadeInRight: Variants = {
  initial: {
    opacity: 0,
    x: 60,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: transitions.default,
  },
  exit: {
    opacity: 0,
    x: -60,
    transition: transitions.fast,
  },
};

// Scale animations
export const scaleIn: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: transitions.bounce,
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: transitions.fast,
  },
};

export const scaleOnHover: Variants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: transitions.fast,
  },
  tap: {
    scale: 0.95,
    transition: transitions.fast,
  },
};

// Stagger animations for children
export const staggerChildren: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerChildrenFast: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const staggerChildrenSlow: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

// Page transitions
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    x: -200,
  },
  in: {
    opacity: 1,
    x: 0,
    transition: transitions.smooth,
  },
  out: {
    opacity: 0,
    x: 200,
    transition: transitions.fast,
  },
};

// Modal animations
export const modalVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.9,
    y: -50,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: transitions.bounce,
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -50,
    transition: transitions.fast,
  },
};

export const overlayVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: transitions.fast,
  },
  exit: {
    opacity: 0,
    transition: transitions.fast,
  },
};

// Drawer/sidebar animations
export const drawerVariants: Variants = {
  closed: {
    x: '-100%',
    transition: transitions.default,
  },
  open: {
    x: 0,
    transition: transitions.smooth,
  },
};

// Card animations
export const cardHover: Variants = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: '0 2px 8px -2px rgba(0, 0, 0, 0.08)',
  },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: '0 8px 25px -8px rgba(0, 0, 0, 0.15)',
    transition: transitions.default,
  },
  tap: {
    scale: 0.98,
    transition: transitions.fast,
  },
};

// Button animations
export const buttonVariants: Variants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.02,
    transition: transitions.fast,
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

export const buttonPulse: Variants = {
  rest: {
    scale: 1,
  },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: easings.easeInOut,
    },
  },
};

// Navigation animations
export const navItemVariants: Variants = {
  closed: {
    opacity: 0,
    x: -20,
  },
  open: {
    opacity: 1,
    x: 0,
  },
};

// Loading animations
export const spinnerVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: easings.linear,
    },
  },
};

export const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [1, 0.7, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: easings.easeInOut,
    },
  },
};

// Advanced scroll-triggered animations
export const scrollReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easings.easeOut,
    },
  },
};

export const scrollRevealWithDelay = (delay: number): Variants => ({
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easings.easeOut,
      delay,
    },
  },
});

// Text animations
export const textReveal: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const letterReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: easings.easeOut,
    },
  },
};

// Feature-specific animations
export const heroTextVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easings.easeOut,
      staggerChildren: 0.2,
    },
  },
};

export const featureCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easings.easeOut,
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: transitions.default,
  },
};

// Utility functions
export const createStaggerVariants = (stagger: number = 0.1): Variants => ({
  animate: {
    transition: {
      staggerChildren: stagger,
      delayChildren: stagger,
    },
  },
});

export const createDelayedVariants = (delay: number): Variants => ({
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      ...transitions.default,
      delay,
    },
  },
});

// Viewport animation settings
export const viewportOptions = {
  once: true,
  margin: '-100px',
  amount: 0.3,
} as const;

// Grid and List stagger animations
export const gridStagger: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const listStagger: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Enhanced interactive element animations
export const interactiveHover: Variants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: '0 2px 8px -2px rgba(0, 0, 0, 0.08)',
  },
  hover: {
    scale: 1.02,
    y: -2,
    boxShadow: '0 8px 25px -8px rgba(0, 0, 0, 0.15)',
    transition: transitions.fast,
  },
  tap: {
    scale: 0.98,
    y: 1,
    transition: { duration: 0.1 },
  },
};

export const tapScale: Variants = {
  rest: { scale: 1 },
  tap: { 
    scale: 0.95,
    transition: { duration: 0.1, ease: easings.easeOut }
  },
};

// Enhanced page transitions
export const slidePageVariants: Variants = {
  initial: { opacity: 0, x: 300 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5,
      ease: easings.easeOut,
    }
  },
  exit: { 
    opacity: 0, 
    x: -300,
    transition: {
      duration: 0.3,
      ease: easings.easeIn,
    }
  },
};

export const fadePageVariants: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: easings.easeOut,
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: easings.easeIn,
    }
  },
};

// Content section animations
export const contentSectionFade: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easings.easeOut,
    },
  },
};

export const contentSectionStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// Performance-optimized animations with reduced motion support
export const createReducedMotionVariant = (normalVariant: Variants): Variants => {
  const reducedVariant: Variants = {};
  
  Object.keys(normalVariant).forEach(key => {
    const state = normalVariant[key];
    if (typeof state === 'object' && state !== null) {
      reducedVariant[key] = {
        ...state,
        transition: { duration: 0.01 },
      };
    }
  });
  
  return reducedVariant;
};

// Accessibility-aware animation hook variants
export const accessibleFadeIn: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3,
      ease: easings.easeOut,
    }
  },
};

// Export all variants as a collection for easy importing
export const variants = {
  fadeIn,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  scaleOnHover,
  staggerChildren,
  staggerChildrenFast,
  staggerChildrenSlow,
  gridStagger,
  listStagger,
  pageVariants,
  slidePageVariants,
  fadePageVariants,
  modalVariants,
  overlayVariants,
  drawerVariants,
  cardHover,
  buttonVariants,
  buttonPulse,
  navItemVariants,
  spinnerVariants,
  pulseVariants,
  scrollReveal,
  textReveal,
  letterReveal,
  heroTextVariants,
  featureCardVariants,
  interactiveHover,
  tapScale,
  contentSectionFade,
  contentSectionStagger,
  accessibleFadeIn,
} as const;

export default variants;