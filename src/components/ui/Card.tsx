import React from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { cardHover, fadeInUp } from '@/lib/animations';

const cardVariants = cva(
  [
    'rounded-xl transition-all duration-200',
    'border border-neutral-200 bg-white',
  ],
  {
    variants: {
      variant: {
        default: [
          'shadow-soft',
          'hover:shadow-medium',
        ],
        elevated: [
          'shadow-medium border-neutral-100',
          'hover:shadow-large hover:-translate-y-1',
        ],
        glass: [
          'glass shadow-glass border-glass-border',
          'hover:shadow-lg hover:bg-glass-bg/20',
        ],
        outline: [
          'border-neutral-300 shadow-none bg-transparent',
          'hover:border-neutral-400 hover:shadow-soft',
        ],
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
      hoverable: {
        true: 'cursor-pointer',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      hoverable: false,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  enableHover?: boolean;
  enableFadeIn?: boolean;
  delay?: number;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant, 
    padding, 
    hoverable, 
    header, 
    footer, 
    children,
    enableHover = false,
    enableFadeIn = false,
    delay = 0,
    ...props 
  }, ref) => {
    const CardComponent = (enableHover || enableFadeIn) ? motion.div : 'div';
    
    const getMotionProps = () => {
      const motionProps: any = {};
      
      if (enableFadeIn) {
        motionProps.variants = fadeInUp;
        motionProps.initial = 'initial';
        motionProps.whileInView = 'animate';
        motionProps.viewport = { once: true, margin: '-100px' };
        
        if (delay > 0) {
          motionProps.transition = { delay };
        }
      }
      
      if (enableHover && hoverable) {
        const hoverVariants = enableFadeIn 
          ? { ...fadeInUp, ...cardHover }
          : cardHover;
        
        motionProps.variants = hoverVariants;
        motionProps.initial = enableFadeIn ? 'initial' : 'rest';
        motionProps.whileHover = 'hover';
        motionProps.whileTap = 'tap';
        
        if (enableFadeIn) {
          motionProps.whileInView = 'animate';
          motionProps.viewport = { once: true, margin: '-100px' };
        }
      }
      
      return motionProps;
    };

    return (
      <CardComponent
        ref={ref}
        className={cn(
          cardVariants({ variant, hoverable }),
          // Override padding when header/footer are present
          header || footer ? 'p-0' : cardVariants({ padding }),
          className
        )}
        {...getMotionProps()}
        {...props}
      >
        {/* Card Header */}
        {header && (
          <div className="border-b border-neutral-200 px-6 py-4">
            {header}
          </div>
        )}

        {/* Card Content */}
        <div 
          className={cn(
            header || footer ? 'px-6 py-4' : '',
            // Apply padding to content when header/footer exist
            header || footer ? cardVariants({ padding: padding || 'md' }).split(' ').find(c => c.startsWith('p-')) : ''
          )}
        >
          {children}
        </div>

        {/* Card Footer */}
        {footer && (
          <div className="border-t border-neutral-200 px-6 py-4 bg-neutral-50/50">
            {footer}
          </div>
        )}
      </CardComponent>
    );
  }
);

Card.displayName = 'Card';

// Sub-components for more flexible composition
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
    {...props}
  >
    {children}
  </h3>
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-neutral-500', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  cardVariants 
};