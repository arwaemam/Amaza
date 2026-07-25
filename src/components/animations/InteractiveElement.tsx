'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { interactiveHover, tapScale } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface InteractiveElementProps extends Omit<HTMLMotionProps<'div'>, 'variants' | 'initial' | 'whileHover' | 'whileTap'> {
  hover?: boolean;
  tap?: boolean;
  scale?: boolean;
  lift?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * InteractiveElement Animation Component
 * 
 * Provides hover and tap animations for interactive elements.
 * Supports different interaction types: scale, lift, or both.
 */
export const InteractiveElement = ({ 
  hover = true,
  tap = true,
  scale = false,
  lift = false,
  className,
  children, 
  ...props 
}: InteractiveElementProps) => {
  const getHoverVariants = () => {
    if (!hover) return undefined;
    
    if (lift) {
      return interactiveHover;
    }
    
    if (scale) {
      return tapScale;
    }
    
    return {
      rest: { scale: 1 },
      hover: { 
        scale: 1.02,
        transition: { duration: 0.2, ease: 'easeOut' }
      },
    };
  };

  const getTapVariants = () => {
    if (!tap) return undefined;
    
    return {
      tap: { 
        scale: 0.98,
        transition: { duration: 0.1, ease: 'easeOut' }
      }
    };
  };

  const variants = {
    ...getHoverVariants(),
    ...getTapVariants(),
  };

  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="rest"
      whileHover={hover ? "hover" : undefined}
      whileTap={tap ? "tap" : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default InteractiveElement;