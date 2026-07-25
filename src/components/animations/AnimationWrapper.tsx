'use client';

import { motion, HTMLMotionProps, Variants } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { createReducedMotionVariant } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface AnimationWrapperProps extends Omit<HTMLMotionProps<'div'>, 'variants'> {
  variants: Variants;
  reducedMotionVariants?: Variants;
  className?: string;
  children: React.ReactNode;
}

/**
 * AnimationWrapper Component
 * 
 * Wrapper component that automatically switches between full animations
 * and reduced motion variants based on user preferences.
 */
export const AnimationWrapper = ({ 
  variants,
  reducedMotionVariants,
  className,
  children, 
  ...props 
}: AnimationWrapperProps) => {
  const prefersReducedMotion = useReducedMotion();
  
  const activeVariants = prefersReducedMotion 
    ? (reducedMotionVariants || createReducedMotionVariant(variants))
    : variants;

  return (
    <motion.div
      className={cn(className)}
      variants={activeVariants}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimationWrapper;