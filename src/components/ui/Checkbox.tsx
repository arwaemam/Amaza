import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

// Checkbox variant configurations
const checkboxVariants = cva(
  [
    'peer h-4 w-4 shrink-0 rounded border border-primary-300 ring-offset-white',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'transition-all duration-200 cursor-pointer',
    'data-[state=checked]:bg-primary-600 data-[state=checked]:border-primary-600 data-[state=checked]:text-white',
  ],
  {
    variants: {
      variant: {
        default: 'data-[state=checked]:bg-primary-600 data-[state=checked]:border-primary-600',
        error: 'border-red-300 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600',
      },
      size: {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-5 w-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    VariantProps<typeof checkboxVariants> {
  label?: string;
  error?: string;
  helper?: string;
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      variant,
      size,
      label,
      error,
      helper,
      id,
      checked,
      onCheckedChange,
      onChange,
      required,
      ...props
    },
    ref
  ) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${checkboxId}-error`;
    const helperId = `${checkboxId}-helper`;
    
    // Determine variant based on error state
    const checkboxVariant = error ? 'error' : variant;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked;
      onCheckedChange?.(isChecked);
      onChange?.(event);
    };

    return (
      <div className="w-full space-y-2">
        {/* Checkbox with Label */}
        <div className="flex items-start space-x-2">
          {/* Checkbox Container */}
          <div className="relative flex items-center">
            {/* Hidden Input */}
            <input
              type="checkbox"
              className="sr-only"
              ref={ref}
              id={checkboxId}
              checked={checked}
              onChange={handleChange}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={cn(
                error && errorId,
                helper && helperId
              )}
              {...props}
            />
            
            {/* Visual Checkbox */}
            <div
              className={cn(
                checkboxVariants({ variant: checkboxVariant, size }),
                className
              )}
              data-state={checked ? 'checked' : 'unchecked'}
            >
              {/* Check Icon */}
              {checked && (
                <Check
                  className={cn(
                    'text-white',
                    size === 'sm' && 'h-2.5 w-2.5',
                    size === 'md' && 'h-3 w-3',
                    size === 'lg' && 'h-3.5 w-3.5'
                  )}
                />
              )}
            </div>
          </div>

          {/* Label */}
          {label && (
            <label
              htmlFor={checkboxId}
              className={cn(
                'text-sm font-medium leading-none cursor-pointer',
                'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                error ? 'text-red-600' : 'text-neutral-700'
              )}
            >
              {label}
              {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
            </label>
          )}
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

Checkbox.displayName = 'Checkbox';

export { Checkbox, checkboxVariants };