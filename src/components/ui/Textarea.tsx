import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Textarea variant configurations
const textareaVariants = cva(
  [
    'flex w-full rounded-lg border bg-white px-3 py-3 text-base ring-offset-white',
    'placeholder:text-neutral-500',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-50',
    'transition-all duration-200 resize-none',
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
        sm: 'min-h-[80px] text-sm',
        md: 'min-h-[120px] text-base',
        lg: 'min-h-[160px] text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  label?: string;
  error?: string;
  helper?: string;
  maxLength?: number;
  showCharCount?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      size,
      label,
      error,
      helper,
      maxLength,
      showCharCount = false,
      id,
      required,
      value,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${textareaId}-error`;
    const helperId = `${textareaId}-helper`;
    
    // Determine variant based on error state
    const textareaVariant = error ? 'error' : variant;
    
    // Calculate character count
    const charCount = typeof value === 'string' ? value.length : 0;
    const isNearLimit = maxLength && charCount >= maxLength * 0.9;

    return (
      <div className="w-full space-y-2">
        {/* Label */}
        {label && (
          <div className="flex items-center justify-between">
            <label
              htmlFor={textareaId}
              className={cn(
                'block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                error ? 'text-red-600' : 'text-neutral-700'
              )}
            >
              {label}
              {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
            </label>
            
            {/* Character count */}
            {showCharCount && maxLength && (
              <span
                className={cn(
                  'text-xs',
                  isNearLimit ? 'text-orange-600' : 'text-neutral-500',
                  charCount >= maxLength && 'text-red-600'
                )}
              >
                {charCount}/{maxLength}
              </span>
            )}
          </div>
        )}

        {/* Textarea Field */}
        <textarea
          className={cn(textareaVariants({ variant: textareaVariant, size }), className)}
          ref={ref}
          id={textareaId}
          maxLength={maxLength}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={cn(
            error && errorId,
            helper && helperId
          )}
          value={value}
          {...props}
        />

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

Textarea.displayName = 'Textarea';

export { Textarea, textareaVariants };