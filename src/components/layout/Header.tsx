'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { NavLink } from '@/components/ui/NavLink';
import { NAVIGATION_LINKS } from '@/lib/constants';

const headerVariants = cva(
  [
    'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
    'border-b',
  ],
  {
    variants: {
      variant: {
        transparent: [
          'bg-transparent border-transparent backdrop-blur-md',
          'data-[scrolled=true]:bg-white/95 data-[scrolled=true]:border-neutral-200',
        ],
        solid: [
          'bg-white border-neutral-200',
        ],
        glass: [
          'glass border-glass-border',
        ],
      },
      sticky: {
        true: 'sticky',
        false: 'fixed',
      },
    },
    defaultVariants: {
      variant: 'transparent',
      sticky: false,
    },
  }
);

export interface HeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof headerVariants> {
  showCTA?: boolean;
}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ className, variant, sticky, showCTA = true, ...props }, ref) => {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const router = useRouter();

    // Handle scroll effect for transparent header
    React.useEffect(() => {
      if (variant !== 'transparent') return;

      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [variant]);

    // Lock body scroll when mobile menu is open
    React.useEffect(() => {
      if (isMobileMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }

      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [isMobileMenuOpen]);

    // Close mobile menu on escape
    React.useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setIsMobileMenuOpen(false);
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    return (
      <>
        <header
          ref={ref}
          className={cn(headerVariants({ variant, sticky }), className)}
          data-scrolled={isScrolled}
          {...props}
        >
          <div className="container-section">
            <div className="flex items-center justify-between h-16 lg:h-20">
              {/* Logo */}
              <Link 
                href="/" 
                className="flex items-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-md"
              >
                <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="font-bold text-xl text-neutral-900">
                  AmazePMS
                </span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-8">
                {NAVIGATION_LINKS.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    variant="ghost"
                    className="font-medium"
                  >
                    {link.name}
                  </NavLink>
                ))}
              </nav>

              {/* Desktop CTA */}
              {showCTA && (
                <div className="hidden lg:flex items-center space-x-4">
                  <NavLink 
                    href="/login" 
                    variant="ghost"
                    className="font-medium"
                  >
                    Sign In
                  </NavLink>
                  <Button size="md" onClick={() => router.push('/contact')}>
                    Book Demo
                  </Button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="md"
                className="lg:hidden p-2"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open mobile menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <div className="fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white shadow-xl">
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                  <Link 
                    href="/" 
                    className="flex items-center space-x-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">A</span>
                    </div>
                    <span className="font-bold text-xl text-neutral-900">
                      AmazePMS
                    </span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close mobile menu"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 px-6 py-8">
                  <div className="space-y-6">
                    {NAVIGATION_LINKS.map((link) => (
                      <NavLink
                        key={link.href}
                        href={link.href}
                        variant="ghost"
                        size="lg"
                        className="w-full justify-start text-left font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.name}
                      </NavLink>
                    ))}
                  </div>
                </nav>

                {/* Mobile CTA */}
                {showCTA && (
                  <div className="p-6 border-t border-neutral-200 space-y-4">
                    <NavLink 
                      href="/login"
                      variant="ghost"
                      size="lg"
                      className="w-full justify-center font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </NavLink>
                    <Button 
                      size="lg" 
                      className="w-full"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        router.push('/contact');
                      }}
                    >
                      Book Demo
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Header Spacer */}
        <div className="h-16 lg:h-20" />
      </>
    );
  }
);

Header.displayName = 'Header';

export { Header, headerVariants };