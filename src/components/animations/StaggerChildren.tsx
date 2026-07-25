'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { staggerChildren, gridStagger, listStagger, viewportOptions } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface StaggerChildrenProps extends Omit<HTMLMotionProps<'div'>, 'variants' | 'initial' | 'whileInView'> {
  type?: 'default' | 'grid' | 'list';
  delay?: number;
  stagger?: number;
  once?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * StaggerChildren Animation Component
 * 
 * Animates children with staggered entrance animations.
 * Supports different stagger types for grids, lists, and default layouts.
 */
export const StaggerChildren = ({ 
  type = 'default',
  delay = 0,
  stagger,
  once = true,
  className,
  children, 
  ...props 
}: StaggerChildrenProps) => {
  const getVariants = () => {
    let baseVariants;
    
    switch (type) {
      case 'grid':
        baseVariants = gridStagger;
        break;
      case 'list':
        baseVariants = listStagger;
        break;
      default:
        baseVariants = staggerChildren;
        break;
    }

    // Override stagger and delay if provided
    if (stagger || delay) {
      const animateObj = (baseVariants.animate as any) || {};
      return {
        ...baseVariants,
        animate: {
          ...animateObj,
          transition: {
            ...(animateObj.transition || {}),
            ...(stagger && { staggerChildren: stagger }),
            ...(delay && { delayChildren: delay }),
          },
        },
      };
    }

    return baseVariants;
  };

  return (
    <motion.div
      className={cn(className)}
      variants={getVariants()}
      initial="initial"
      whileInView="animate"
      viewport={{ ...viewportOptions, once }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default StaggerChildren;