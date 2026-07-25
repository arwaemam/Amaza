'use client';

import React from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';

const navLinkVariants = cva(
  [
    'inline-flex items-center gap-1.5 rounded-md transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
  ],
  {
    variants: {
      variant: {
        default: [
          'text-neutral-600 hover:text-neutral-900',
          'hover:bg-neutral-100',
        ],
        primary: [
          'text-primary-600 hover:text-primary-700',
          'hover:bg-primary-50',
        ],
        ghost: [
          'text-neutral-700 hover:text-neutral-900',
          'hover:bg-transparent',
        ],
        underline: [
          'text-neutral-600 hover:text-neutral-900',
          'border-b-2 border-transparent hover:border-neutral-300',
          'rounded-none pb-1',
        ],
      },
      size: {
        sm: 'px-2 py-1 text-sm',
        md: 'px-3 py-2 text-base',
        lg: 'px-4 py-2.5 text-lg',
      },
      active: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      // Active states for each variant
      {
        variant: 'default',
        active: true,
        class: 'text-neutral-900 bg-neutral-100 font-medium',
      },
      {
        variant: 'primary',
        active: true,
        class: 'text-primary-700 bg-primary-100 font-medium',
      },
      {
        variant: 'ghost',
        active: true,
        class: 'text-neutral-900 font-medium',
      },
      {
        variant: 'underline',
        active: true,
        class: 'text-neutral-900 border-neutral-900 font-medium',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md',
      active: false,
    },
  }
);

export interface NavLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    VariantProps<typeof navLinkVariants> {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  disabled?: boolean;
  showExternalIcon?: boolean;
}

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({
    className,
    variant,
    size,
    active,
    href,
    children,
    external = false,
    disabled = false,
    showExternalIcon = true,
    onClick,
    ...props
  }, ref) => {
    // Auto-detect external links
    const isExternal = external || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    const linkContent = (
      <>
        {children}
        {isExternal && showExternalIcon && (
          <ExternalLink className="h-3 w-3 opacity-70" />
        )}
      </>
    );

    const linkProps = {
      ref,
      className: cn(navLinkVariants({ variant, size, active }), className),
      onClick: handleClick,
      'aria-disabled': disabled,
      ...props,
    };

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...linkProps}
        >
          {linkContent}
        </a>
      );
    }

    return (
      <Link href={href} {...linkProps}>
        {linkContent}
      </Link>
    );
  }
);

NavLink.displayName = 'NavLink';

export { NavLink, navLinkVariants };