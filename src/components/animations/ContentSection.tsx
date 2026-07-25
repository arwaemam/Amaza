'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { contentSectionFade, contentSectionStagger, viewportOptions } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface ContentSectionProps extends Omit<HTMLMotionProps<'section'>, 'variants' | 'initial' | 'whileInView'> {
  stagger?: boolean;
  delay?: number;
  once?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * ContentSection Animation Component
 * 
 * Animates content sections with fade-in animations when they enter the viewport.
 * Supports staggered animations for child elements.
 */
export const ContentSection = ({ 
  stagger = false,
  delay = 0,
  once = true,
  className,
  children, 
  ...props 
}: ContentSectionProps) => {
  const getVariants = () => {
    if (stagger) {
      return {
        ...contentSectionStagger,
        visible: {
          ...(contentSectionStagger.visible as any),
          transition: {
            ...(contentSectionStagger.visible as any)?.transition,
            delayChildren: delay,
          },
        },
      };
    }
    
    return {
      ...contentSectionFade,
      visible: {
        ...(contentSectionFade.visible as any),
        transition: {
          ...(contentSectionFade.visible as any)?.transition,
          delay,
        },
      },
    };
  };

  return (
    <motion.section
      className={cn(className)}
      variants={getVariants()}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...viewportOptions, once }}
      {...props}
    >
      {children}
    </motion.section>
  );
};

export default ContentSection;