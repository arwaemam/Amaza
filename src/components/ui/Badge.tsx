import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  [
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  ],
  {
    variants: {
      variant: {
        default: [
          'border-transparent bg-neutral-900 text-neutral-50',
          'hover:bg-neutral-900/80',
        ],
        primary: [
          'border-transparent bg-primary-600 text-primary-50',
          'hover:bg-primary-600/80',
        ],
        secondary: [
          'border-transparent bg-neutral-100 text-neutral-900',
          'hover:bg-neutral-100/80',
        ],
        success: [
          'border-transparent bg-green-100 text-green-800',
          'hover:bg-green-100/80',
        ],
        warning: [
          'border-transparent bg-amber-100 text-amber-800',
          'hover:bg-amber-100/80',
        ],
        error: [
          'border-transparent bg-red-100 text-red-800',
          'hover:bg-red-100/80',
        ],
        outline: [
          'border-neutral-200 text-neutral-600 bg-transparent',
          'hover:bg-neutral-50',
        ],
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { Badge, badgeVariants };