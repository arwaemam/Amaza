import React from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import { Card } from './Card';
import { NavLink } from './NavLink';
import { featureCardVariants as featureCardAnimations, fadeInUp } from '@/lib/animations';

const featureCardVariants = cva(
  [
    'group cursor-pointer transition-all duration-300',
  ],
  {
    variants: {
      variant: {
        default: [
          'hover:shadow-medium hover:-translate-y-1',
        ],
        highlighted: [
          'ring-2 ring-primary-200 bg-primary-50/50',
          'hover:ring-primary-300 hover:bg-primary-100/50',
          'hover:shadow-large hover:-translate-y-2',
        ],
        glass: [
          'glass',
          'hover:shadow-glass-lg hover:-translate-y-1',
        ],
      },
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface FeatureCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof featureCardVariants> {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: {
    text: string;
    href: string;
    external?: boolean;
  };
  enableAnimation?: boolean;
  delay?: number;
}

const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({
    className,
    variant,
    size,
    icon,
    title,
    description,
    link,
    onClick,
    enableAnimation = true,
    delay = 0,
    ...props
  }, ref) => {
    const isClickable = onClick || link;

    // Combine animation variants
    const animationVariants = enableAnimation 
      ? {
          ...featureCardAnimations,
          visible: {
            ...featureCardAnimations.visible,
            transition: {
              ...featureCardAnimations.visible.transition,
              delay,
            },
          },
        }
      : undefined;

    const CardWrapper = enableAnimation ? motion.div : 'div';

    return (
      <CardWrapper
        ref={ref}
        className={cn(
          featureCardVariants({ variant, size }),
          isClickable && 'cursor-pointer',
          className
        )}
        variants={animationVariants}
        initial={enableAnimation ? 'hidden' : undefined}
        whileInView={enableAnimation ? 'visible' : undefined}
        whileHover={enableAnimation && isClickable ? 'hover' : undefined}
        viewport={enableAnimation ? { once: true, margin: '-50px' } : undefined}
        onClick={onClick}
        {...props}
      >
        <Card
          variant={variant === 'glass' ? 'glass' : variant === 'highlighted' ? 'elevated' : 'default'}
          padding="none"
          hoverable={false} // We handle hover with motion
          className="h-full"
        >
          <div className={cn(
            'p-6',
            size === 'sm' && 'p-4',
            size === 'lg' && 'p-8'
          )}>
            {/* Icon */}
            <div className={cn(
              'inline-flex items-center justify-center rounded-xl mb-4 transition-colors duration-300',
              variant === 'highlighted' 
                ? 'bg-primary-100 text-primary-600 group-hover:bg-primary-200' 
                : 'bg-neutral-100 text-neutral-600 group-hover:bg-neutral-200',
              size === 'sm' ? 'w-10 h-10' : size === 'lg' ? 'w-14 h-14' : 'w-12 h-12'
            )}>
              {icon}
            </div>

            {/* Content */}
            <div className="space-y-2 mb-4">
              <h3 className={cn(
                'font-semibold text-neutral-900 group-hover:text-primary-700 transition-colors duration-300',
                size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl'
              )}>
                {title}
              </h3>
              <p className={cn(
                'text-neutral-600 leading-relaxed',
                size === 'sm' ? 'text-sm' : 'text-base'
              )}>
                {description}
              </p>
            </div>

            {/* Link */}
            {link && (
              <NavLink
                href={link.href}
                external={link.external}
                variant="primary"
                className={cn(
                  'inline-flex items-center gap-1 font-medium group-hover:gap-2 transition-all duration-300',
                  size === 'sm' ? 'text-sm' : 'text-base'
                )}
                onClick={(e) => e.stopPropagation()}
              >
                {link.text}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
              </NavLink>
            )}
          </div>
        </Card>
      </CardWrapper>
    );
  }
);

FeatureCard.displayName = 'FeatureCard';

export { FeatureCard, featureCardVariants };