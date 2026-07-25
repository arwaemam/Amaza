import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

// Select variant configurations
const selectVariants = cva(
  [
    'flex w-full rounded-lg border bg-white px-3 py-2 text-base ring-offset-white',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-50',
    'transition-all duration-200 appearance-none cursor-pointer',
  ],
  {
    variants: {
      variant: {
        default: [
          'border-neutral-300 text-neutral-900',
          'hover:border-neutral-400',
          'focus:border-primary-500',
        ],
        error: [
          'border-red-300 text-neutral-900',
          'hover:border-red-400',
          'focus:border-red-500 focus-visible:ring-red-500',
        ],
        success: [
          'border-green-300 text-neutral-900',
          'hover:border-green-400',
          'focus:border-green-500 focus-visible:ring-green-500',
        ],
      },
      size: {
        sm: 'h-8 px-2.5 text-sm',
        md: 'h-10 px-3 text-base',
        lg: 'h-12 px-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof selectVariants> {
  label?: string;
  error?: string;
  helper?: string;
  options: SelectOption[];
  placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      variant,
      size,
      label,
      error,
      helper,
      options,
      placeholder,
      id,
      required,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;
    
    // Determine variant based on error state
    const selectVariant = error ? 'error' : variant;

    return (
      <div className="w-full space-y-2">
        {/* Label */}
        {label && (
          <label
            htmlFor={selectId}
            className={cn(
              'block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              error ? 'text-red-600' : 'text-neutral-700'
            )}
          >
            {label}
            {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
          </label>
        )}

        {/* Select Container */}
        <div className="relative">
          {/* Select Field */}
          <select
            className={cn(
              selectVariants({ variant: selectVariant, size }),
              'pr-10', // Space for chevron icon
              className
            )}
            ref={ref}
            id={selectId}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={cn(
              error && errorId,
              helper && helperId
            )}
            {...props}
          >
            {/* Placeholder option */}
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            
            {/* Options */}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          {/* Chevron Icon */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p
            id={errorId}
            role="alert"
            className="text-sm text-red-600 font-medium"
          >
            {error}
          </p>
        )}

        {/* Helper Text */}
        {helper && !error && (
          <p
            id={helperId}
            className="text-sm text-neutral-600"
          >
            {helper}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select, selectVariants };