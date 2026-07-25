'use client';

import React, { useEffect } from 'react';
import { ScrollAnimationProvider } from '@/components/animations';
import { setupScrollAnimations, setupHoverAnimations } from '@/lib/gsap-animations';

interface ScrollAnimationLayoutProps {
  children: React.ReactNode;
  enableSmoothScroll?: boolean;
}

export const ScrollAnimationLayout: React.FC<ScrollAnimationLayoutProps> = ({
  children,
  enableSmoothScroll = true,
}) => {
  useEffect(() => {
    // Initialize scroll animations after component mount
    const timer = setTimeout(() => {
      setupScrollAnimations();
      setupHoverAnimations();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ScrollAnimationProvider enableSmoothScroll={enableSmoothScroll}>
      <div className="scroll-animation-layout">
        {children}
      </div>
    </ScrollAnimationProvider>
  );
};