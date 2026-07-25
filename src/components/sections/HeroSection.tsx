'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { StaggerChildren, FadeInUp, InteractiveElement, ParallaxBackground, ScrollReveal, AnimatedCounter } from '@/components/animations';
import { ArrowRight, Play, Star, Users, Calendar, TrendingUp } from 'lucide-react';

export interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryCTA?: {
    text: string;
    onClick: () => void;
  };
  secondaryCTA?: {
    text: string;
    onClick: () => void;
  };
  backgroundImage?: string;
  backgroundVideo?: string;
  enableParallax?: boolean;
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Transform Your Property Management with AmazePMS",
  subtitle = "The Future of Hospitality Management",
  description = "Experience award-winning property management software designed for the modern hospitality industry. Streamline operations, boost revenue, and deliver exceptional guest experiences with our comprehensive PMS solution.",
  primaryCTA = {
    text: "Start Free Trial",
    onClick: () => console.log('Start trial clicked')
  },
  secondaryCTA = {
    text: "Watch Demo",
    onClick: () => console.log('Watch demo clicked')
  },
  enableParallax = true,
  className = ""
}) => {
  const router = useRouter();
  const [isVideoLoaded, setIsVideoLoaded] = React.useState(false);

  // Default handlers if not provided
  const handlePrimaryClick = primaryCTA?.onClick || (() => router.push('/contact'));
  const handleSecondaryClick = secondaryCTA?.onClick || (() => router.push('/contact'));

  const trustBadges = [
    { icon: Users, label: "Properties", value: 10000, suffix: "+" },
    { icon: Star, label: "Rating", value: 4.9, suffix: "★", format: (v: number) => v.toFixed(1) },
    { icon: Calendar, label: "Uptime", value: 99.9, suffix: "%", format: (v: number) => v.toFixed(1) },
    { icon: TrendingUp, label: "Revenue Boost", value: 30, prefix: "+", suffix: "%" }
  ];

  return (
    <section className={`hero-section relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
      {/* Parallax Background */}
      <ParallaxBackground 
        className="absolute inset-0 hero-bg"
        enableParallax={enableParallax}
        overlay={false}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-100" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        
        {/* Floating Elements with Enhanced Animation */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary-200/30 blur-xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-32 right-16 w-32 h-32 rounded-full bg-success-200/20 blur-2xl"
          animate={{
            y: [0, 20, 0],
            x: [0, -15, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-warning-200/25 blur-lg"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </ParallaxBackground>

      <div className="container-section relative z-10">
        <StaggerChildren className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <FadeInUp delay={0}>
            <Badge variant="primary" size="lg" className="px-4 py-2 text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2 fill-current" />
              #1 Rated PMS Solution
            </Badge>
          </FadeInUp>

          {/* Subtitle */}
          <FadeInUp delay={0.1}>
            <p className="text-lg md:text-xl text-primary-600 font-medium mb-4 tracking-wide">
              {subtitle}
            </p>
          </FadeInUp>

          {/* Main Title */}
          <FadeInUp delay={0.2}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-900 mb-6 leading-tight">
              <span className="block">Transform Your</span>
              <span className="block text-gradient-primary">Property Management</span>
              <span className="block">with AmazePMS</span>
            </h1>
          </FadeInUp>

          {/* Description */}
          <FadeInUp delay={0.3}>
            <p className="text-lg md:text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          </FadeInUp>

          {/* CTA Buttons */}
          <FadeInUp delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <InteractiveElement hover={true} tap={true}>
              <Button 
                size="xl" 
                className="group px-8 py-4 animate-button"
                onClick={handlePrimaryClick}
                enableMotion={false}
              >
                {primaryCTA.text}
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </InteractiveElement>
            
            <InteractiveElement hover={true} tap={true}>
              <Button 
                size="xl" 
                variant="outline"
                className="px-8 py-4 bg-white/50 backdrop-blur-sm border-neutral-200 hover:bg-white"
                onClick={handleSecondaryClick}
                enableMotion={false}
              >
                <Play className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                {secondaryCTA.text}
              </Button>
            </InteractiveElement>
          </FadeInUp>

          {/* Trust Indicators with Animated Counters */}
          <ScrollReveal 
            delay={0.5}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
            stagger={0.1}
          >
            {trustBadges.map((badge, index) => (
              <InteractiveElement
                key={badge.label}
                hover={true}
                lift={true}
                className="group animate-card"
              >
                <div className="glass-card-subtle rounded-xl p-4 text-center border border-white/20 hover:border-white/40 transition-all duration-300">
                  <badge.icon className="w-8 h-8 mx-auto mb-2 text-primary-600 group-hover:text-primary-700 transition-colors" />
                  <div className="text-2xl font-bold text-neutral-900 mb-1">
                    <AnimatedCounter
                      from={0}
                      to={badge.value}
                      duration={2}
                      prefix={badge.prefix}
                      suffix={badge.suffix}
                      format={badge.format}
                      className="counter"
                    />
                  </div>
                  <div className="text-sm text-neutral-600">
                    {badge.label}
                  </div>
                </div>
              </InteractiveElement>
            ))}
          </ScrollReveal>
        </StaggerChildren>
      </div>

      {/* Dashboard Preview Image */}
      <FadeInUp delay={0.6} className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full max-w-6xl px-4">
        <div className="relative">
          {/* Dashboard mockup - you would replace this with actual dashboard screenshot */}
          <div className="bg-white rounded-t-2xl shadow-2xl p-4 border border-neutral-200 animate-card">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-error-500"></div>
              <div className="w-3 h-3 rounded-full bg-warning-500"></div>
              <div className="w-3 h-3 rounded-full bg-success-500"></div>
            </div>
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg h-64 md:h-80 flex items-center justify-center relative overflow-hidden">
              {/* Floating dashboard elements */}
              <motion.div
                className="absolute top-4 left-4 w-16 h-4 bg-primary-300/50 rounded"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute top-4 right-4 w-12 h-12 bg-success-300/50 rounded-lg"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-4 left-4 w-20 h-8 bg-warning-300/50 rounded"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              <div className="text-center z-10">
                <div className="text-6xl md:text-8xl font-bold text-primary-600/20 mb-4">
                  AmazePMS
                </div>
                <div className="text-lg text-primary-700 font-medium">
                  Dashboard Preview
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeInUp>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-neutral-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-neutral-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  );
};