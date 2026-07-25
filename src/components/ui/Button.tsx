'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { buttonVariants as buttonAnimationVariants, tapScale } from '@/lib/animations';

// Button variant configurations using class-variance-authority
const buttonVariants = cva(
  // Base styles applied to all buttons
  [
    'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    'relative overflow-hidden',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-primary-600 text-white shadow-sm',
          'hover:bg-primary-700 hover:shadow-md hover:scale-[1.02]',
          'active:bg-primary-800 active:scale-[0.98]',
          'focus-visible:ring-primary-500',
        ],
        secondary: [
          'bg-neutral-100 text-neutral-900 shadow-sm border border-neutral-200',
          'hover:bg-neutral-200 hover:shadow-md hover:scale-[1.02]',
          'active:bg-neutral-300 active:scale-[0.98]',
          'focus-visible:ring-neutral-500',
        ],
        outline: [
          'border border-primary-600 text-primary-600 bg-transparent',
          'hover:bg-primary-50 hover:shadow-sm hover:scale-[1.02]',
          'active:bg-primary-100 active:scale-[0.98]',
          'focus-visible:ring-primary-500',
        ],
        ghost: [
          'text-neutral-700 bg-transparent',
          'hover:bg-neutral-100 hover:text-neutral-900 hover:scale-[1.02]',
          'active:bg-neutral-200 active:scale-[0.98]',
          'focus-visible:ring-neutral-500',
        ],
        glass: [
          'glass text-neutral-900 shadow-glass',
          'hover:bg-glass-bg/20 hover:shadow-lg hover:scale-[1.02]',
          'active:bg-glass-bg/30 active:scale-[0.98]',
          'focus-visible:ring-primary-500',
        ],
      },
      size: {
        sm: 'h-8 px-3 text-sm gap-1.5',
        md: 'h-10 px-4 text-base gap-2',
        lg: 'h-12 px-6 text-lg gap-2.5',
        xl: 'h-14 px-8 text-xl gap-3',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
  enableMotion?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      children,
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      asChild = false,
      enableMotion = true,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    if (asChild) {
      // This would typically use Slot from @radix-ui/react-slot for composition
      // For now, we'll render as a regular button
    }

    const ButtonComponent = enableMotion ? motion.button : 'button';
    const motionProps = enableMotion && !isDisabled 
      ? {
          variants: buttonAnimationVariants,
          initial: 'rest',
          whileHover: 'hover',
          whileTap: 'tap',
        }
      : {};

    return (
      <ButtonComponent
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={isDisabled}
        ref={ref}
        {...motionProps}
        {...props}
      >
        {/* Loading spinner */}
        {loading && (
          <Loader2 className="animate-spin absolute inset-0 m-auto h-4 w-4" />
        )}
        
        {/* Content wrapper with opacity control for loading state */}
        <span
          className={cn(
            'flex items-center gap-2',
            loading && 'opacity-0'
          )}
        >
          {leftIcon && (
            <span className="flex-shrink-0">{leftIcon}</span>
          )}
          {children}
          {rightIcon && (
            <span className="flex-shrink-0">{rightIcon}</span>
          )}
        </span>
      </ButtonComponent>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };