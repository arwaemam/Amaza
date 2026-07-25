'use client';

import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';
import { pageVariants, slidePageVariants, fadePageVariants } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface PageTransitionProps extends Omit<HTMLMotionProps<'div'>, 'variants' | 'initial' | 'animate' | 'exit'> {
  type?: 'slide' | 'fade' | 'default';
  show?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * PageTransition Animation Component
 * 
 * Provides smooth page transitions with different animation types.
 * Used for route changes and content switching.
 */
export const PageTransition = ({ 
  type = 'default',
  show = true,
  className,
  children, 
  ...props 
}: PageTransitionProps) => {
  const getVariants = () => {
    switch (type) {
      case 'slide':
        return slidePageVariants;
      case 'fade':
        return fadePageVariants;
      default:
        return pageVariants;
    }
  };

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key={type}
          className={cn(className)}
          variants={getVariants()}
          initial="initial"
          animate="animate"
          exit="exit"
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTransition;