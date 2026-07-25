'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { fadeInUp, viewportOptions } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface FadeInUpProps extends Omit<HTMLMotionProps<'div'>, 'variants' | 'initial' | 'whileInView'> {
  delay?: number;
  once?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * FadeInUp Animation Component
 * 
 * Animates children with a fade-in-up motion when they enter the viewport.
 * Respects reduced motion preferences automatically.
 */
export const FadeInUp = ({ 
  delay = 0, 
  once = true, 
  className,
  children, 
  ...props 
}: FadeInUpProps) => {
  const variants = {
    ...fadeInUp,
    animate: {
      ...fadeInUp.animate,
      transition: {
        ...(fadeInUp.animate && typeof fadeInUp.animate === 'object' && 'transition' in fadeInUp.animate ? fadeInUp.animate.transition : {}),
        delay,
      },
    },
  };

  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="initial"
      whileInView="animate"
      exit="exit"
      viewport={{ ...viewportOptions, once }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default FadeInUp;