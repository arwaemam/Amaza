'use client';

import React, { useRef, useEffect } from 'react';
import { useStaggerReveal, useScrollAnimations } from './ScrollAnimationProvider';
import { cn } from '@/lib/utils';

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
  y?: number;
  scale?: number;
  trigger?: string;
  start?: string;
  enableStagger?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  stagger = 0.15,
  duration = 0.6,
  delay = 0,
  y = 60,
  scale = 1,
  trigger,
  start = 'top 80%',
  enableStagger = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { createStaggerReveal, createTimelineSequence } = useScrollAnimations();

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = Array.from(containerRef.current.children);
    if (elements.length === 0) return;

    if (enableStagger && elements.length > 1) {
      // Use stagger reveal for multiple elements
      createStaggerReveal(elements, {
        stagger,
        duration,
        y,
        scale: scale === 1 ? undefined : 0.8,
        trigger: trigger ? document.querySelector(trigger) || containerRef.current : containerRef.current,
        start,
      });
    } else {
      // Use timeline sequence for single element or complex animations
      const timeline = createTimelineSequence(elements, {
        stagger: elements.length > 1 ? stagger : 0,
        duration,
        trigger: trigger ? document.querySelector(trigger) || containerRef.current : containerRef.current,
        start,
      });

      if (delay > 0) {
        timeline.delay(delay);
      }
    }
  }, [
    createStaggerReveal,
    createTimelineSequence,
    stagger,
    duration,
    delay,
    y,
    scale,
    trigger,
    start,
    enableStagger,
  ]);

  return (
    <div ref={containerRef} className={cn('scroll-reveal-container', className)}>
      {children}
    </div>
  );
};