'use client';

import React, { useRef, useEffect } from 'react';
import { useScrollAnimations } from './ScrollAnimationProvider';
import { cn } from '@/lib/utils';

export interface TimelineAnimationProps {
  children: React.ReactNode;
  className?: string;
  sequence?: Array<{
    selector?: string;
    delay?: number;
    duration?: number;
    from?: Record<string, any>;
    to?: Record<string, any>;
  }>;
  trigger?: string;
  start?: string;
  autoPlay?: boolean;
}

export const TimelineAnimation: React.FC<TimelineAnimationProps> = ({
  children,
  className = '',
  sequence = [],
  trigger,
  start = 'top 80%',
  autoPlay = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { createTimelineSequence } = useScrollAnimations();
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return;

    const { gsap } = require('gsap');
    const { ScrollTrigger } = require('gsap/ScrollTrigger');

    // Create timeline
    timelineRef.current = gsap.timeline({
      paused: !autoPlay,
      scrollTrigger: autoPlay ? {
        trigger: trigger ? document.querySelector(trigger) || containerRef.current : containerRef.current,
        start,
        toggleActions: 'play none none reverse',
      } : undefined,
    });

    if (sequence.length > 0) {
      // Use custom sequence
      sequence.forEach((step, index) => {
        const elements = step.selector
          ? containerRef.current!.querySelectorAll(step.selector)
          : containerRef.current!.children;

        if (elements.length === 0) return;

        const fromProps = step.from || { opacity: 0, y: 60 };
        const toProps = step.to || { opacity: 1, y: 0 };
        const delay = step.delay || index * 0.1;
        const duration = step.duration || 0.6;

        timelineRef.current!.fromTo(
          elements,
          fromProps,
          {
            ...toProps,
            duration,
            ease: 'power2.out',
          },
          delay
        );
      });
    } else {
      // Default sequence for all children
      const elements = Array.from(containerRef.current.children);
      elements.forEach((element, index) => {
        timelineRef.current!.fromTo(
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
            duration: 0.6,
            ease: 'power2.out',
          },
          index * 0.1
        );
      });
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [sequence, trigger, start, autoPlay, createTimelineSequence]);

  // Method to manually play timeline
  const play = () => {
    if (timelineRef.current) {
      timelineRef.current.play();
    }
  };

  // Method to pause timeline
  const pause = () => {
    if (timelineRef.current) {
      timelineRef.current.pause();
    }
  };

  // Method to reverse timeline
  const reverse = () => {
    if (timelineRef.current) {
      timelineRef.current.reverse();
    }
  };

  return (
    <div ref={containerRef} className={cn('timeline-animation-container', className)}>
      {children}
    </div>
  );
};

// Hook to control timeline animation
export const useTimelineControls = (timelineRef: React.RefObject<any>) => {
  return {
    play: () => (timelineRef.current as any)?.play?.(),
    pause: () => (timelineRef.current as any)?.pause?.(),
    reverse: () => (timelineRef.current as any)?.reverse?.(),
  };
};