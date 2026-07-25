'use client';

import React, { useRef, useEffect } from 'react';
import { useCounter } from './ScrollAnimationProvider';
import { cn } from '@/lib/utils';

export interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  format?: (value: number) => string;
  prefix?: string;
  suffix?: string;
  className?: string;
  trigger?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  from = 0,
  to,
  duration = 2,
  format,
  prefix = '',
  suffix = '',
  className = '',
  trigger,
}) => {
  const counterRef = useRef<HTMLSpanElement>(null);

  // Default format function
  const defaultFormat = (value: number) => {
    const formatted = Math.round(value).toLocaleString('en-US');
    return `${prefix}${formatted}${suffix}`;
  };

  // Use counter hook
  useCounter(counterRef, {
    from,
    to,
    duration,
    format: format || defaultFormat,
    trigger: trigger ? document.querySelector(trigger) || undefined : undefined,
  });

  return (
    <span
      ref={counterRef}
      className={cn('counter tabular-nums', className)}
      data-count={to}
    >
      {defaultFormat(from)}
    </span>
  );
};