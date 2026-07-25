'use client';

import React, { useEffect, useRef } from 'react';
import { useParallax, useScrollAnimations } from './ScrollAnimationProvider';
import { cn } from '@/lib/utils';

export interface ParallaxBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  speed?: number;
  image?: string;
  video?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  enableParallax?: boolean;
}

export const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  children,
  className = '',
  speed = 0.5,
  image,
  video,
  overlay = true,
  overlayOpacity = 0.3,
  enableParallax = true,
}) => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  // Apply parallax effect
  useParallax(backgroundRef, {
    yPercent: -30 * speed,
  });

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Background Media */}
      <div
        ref={enableParallax ? backgroundRef : null}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        {video ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={video} type="video/mp4" />
          </video>
        ) : image ? (
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${image})` }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-50 via-white to-primary-100" />
        )}
        
        {/* Overlay */}
        {overlay && (
          <div
            className="absolute inset-0 bg-neutral-900"
            style={{ opacity: overlayOpacity }}
          />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};