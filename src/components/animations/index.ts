export { FadeInUp } from './FadeInUp';
export { StaggerChildren } from './StaggerChildren';
export { InteractiveElement } from './InteractiveElement';
export { PageTransition } from './PageTransition';
export { ContentSection } from './ContentSection';
export { AnimationWrapper } from './AnimationWrapper';

// Complex scroll animations
export { ScrollAnimationProvider, useScrollAnimations, useParallax, useCounter, useStaggerReveal } from './ScrollAnimationProvider';
export { ParallaxBackground } from './ParallaxBackground';
export { AnimatedCounter } from './AnimatedCounter';
export { ScrollReveal } from './ScrollReveal';
export { TimelineAnimation, useTimelineControls } from './TimelineAnimation';

// Re-export all animation utilities for convenience
export * from '@/lib/animations';
export { useReducedMotion } from '@/hooks/useReducedMotion';