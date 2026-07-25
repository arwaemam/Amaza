'use client';

import React from 'react';
import { 
  ScrollAnimationLayout,
  Header, 
  Footer 
} from '@/components/layout';
import { 
  HeroSection, 
  FeaturesGrid, 
  SocialProofSection 
} from '@/components/sections';
import { 
  ParallaxBackground,
  AnimatedCounter,
  ScrollReveal,
  TimelineAnimation
} from '@/components/animations';
import { Button, Card, Badge } from '@/components/ui';
import { 
  Rocket, 
  Zap, 
  Star, 
  TrendingUp, 
  Users, 
  Calendar,
  BarChart3,
  Shield,
  Globe,
  Clock
} from 'lucide-react';

export function ScrollAnimationDemo() {
  const demoStats = [
    { label: 'Active Users', value: 25000, icon: Users },
    { label: 'Properties', value: 5000, icon: Globe },
    { label: 'Revenue Growth', value: 150, suffix: '%', icon: TrendingUp },
    { label: 'Uptime', value: 99.99, suffix: '%', format: (v: number) => v.toFixed(2), icon: Clock }
  ];

  const timelineSequence = [
    {
      selector: '.timeline-item-1',
      delay: 0,
      duration: 0.8,
      from: { opacity: 0, x: -100 },
      to: { opacity: 1, x: 0 }
    },
    {
      selector: '.timeline-item-2',
      delay: 0.2,
      duration: 0.8,
      from: { opacity: 0, y: 100 },
      to: { opacity: 1, y: 0 }
    },
    {
      selector: '.timeline-item-3',
      delay: 0.4,
      duration: 0.8,
      from: { opacity: 0, x: 100 },
      to: { opacity: 1, x: 0 }
    },
    {
      selector: '.timeline-item-4',
      delay: 0.6,
      duration: 0.8,
      from: { opacity: 0, scale: 0.5 },
      to: { opacity: 1, scale: 1 }
    }
  ];

  return (
    <ScrollAnimationLayout enableSmoothScroll={true}>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <Header variant="transparent" className="site-header" showCTA={true} />

        {/* Demo Title Section */}
        <section className="section-padding-lg bg-gradient-to-br from-primary-50 to-primary-100 animate-section">
          <div className="container-section text-center">
            <ScrollReveal>
              <Badge variant="primary" size="lg" className="mb-6">
                <Zap className="w-4 h-4 mr-2" />
                Complex Scroll Animations
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6">
                Advanced Animation System
              </h1>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
                Experience the power of GSAP ScrollTrigger combined with Framer Motion 
                for smooth, performant scroll animations including parallax effects, 
                animated counters, and complex timeline sequences.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Enhanced Hero Section with Parallax */}
        <HeroSection 
          title="Experience Parallax Magic"
          subtitle="Hero Section with Advanced Animations"
          description="This hero section demonstrates parallax background effects, animated counters, and smooth scroll reveals that maintain 60fps performance."
          enableParallax={true}
          className="hero-section"
        />

        {/* Animated Counters Section */}
        <section className="section-padding-lg bg-white animate-section">
          <div className="container-section">
            <ScrollReveal className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Animated Statistics
              </h2>
              <p className="text-lg text-neutral-600">
                Watch these numbers count up as they enter the viewport
              </p>
            </ScrollReveal>

            <ScrollReveal 
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              stagger={0.2}
            >
              {demoStats.map((stat, index) => (
                <Card key={stat.label} className="p-6 text-center animate-card">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 mb-4">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
                    <AnimatedCounter
                      from={0}
                      to={stat.value}
                      duration={2.5}
                      suffix={stat.suffix}
                      format={stat.format}
                      className="counter"
                    />
                  </div>
                  <div className="text-sm text-neutral-600 font-medium">
                    {stat.label}
                  </div>
                </Card>
              ))}
            </ScrollReveal>
          </div>
        </section>

        {/* Parallax Background Section */}
        <ParallaxBackground 
          className="section-padding-lg"
          speed={0.7}
          overlay={true}
          overlayOpacity={0.4}
        >
          <div 
            className="w-full h-full bg-gradient-to-r from-primary-600 to-primary-800"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
          
          <div className="container-section text-center text-white relative z-10">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Parallax Background Effect
              </h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
                This background moves at a different speed than the content, 
                creating a depth effect that enhances the visual experience.
              </p>
              <Button variant="glass" size="lg">
                <Rocket className="w-5 h-5 mr-2" />
                Experience the Magic
              </Button>
            </ScrollReveal>
          </div>
        </ParallaxBackground>

        {/* Features Grid with Enhanced Animations */}
        <FeaturesGrid 
          title="Feature Cards with Stagger Animation"
          subtitle="Watch each card animate in sequence as you scroll"
          features={[
            {
              icon: <BarChart3 className="h-6 w-6" />,
              title: "Advanced Analytics",
              description: "Deep insights with animated charts and real-time data visualization.",
              highlighted: true
            },
            {
              icon: <Shield className="h-6 w-6" />,
              title: "Security First",
              description: "Enterprise-grade security with continuous monitoring and protection."
            },
            {
              icon: <Zap className="h-6 w-6" />,
              title: "Lightning Fast",
              description: "Optimized performance with 60fps animations and smooth interactions."
            },
            {
              icon: <Globe className="h-6 w-6" />,
              title: "Global Scale",
              description: "Worldwide infrastructure ensuring low latency and high availability."
            },
            {
              icon: <Users className="h-6 w-6" />,
              title: "Team Collaboration",
              description: "Powerful tools for team coordination and real-time collaboration."
            },
            {
              icon: <Clock className="h-6 w-6" />,
              title: "Time Tracking",
              description: "Comprehensive time tracking with automated reporting and insights."
            }
          ]}
          columns={3}
        />

        {/* Timeline Animation Section */}
        <section className="section-padding-lg bg-neutral-50 animate-section">
          <div className="container-section">
            <ScrollReveal className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Complex Timeline Sequences
              </h2>
              <p className="text-lg text-neutral-600">
                Multiple elements animating in a coordinated timeline sequence
              </p>
            </ScrollReveal>

            <TimelineAnimation 
              className="grid md:grid-cols-2 gap-8"
              sequence={timelineSequence}
            >
              <Card className="timeline-item-1 p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                    <Star className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Step 1: Initialize</h3>
                </div>
                <p className="text-neutral-600">
                  This card slides in from the left with a smooth easing animation.
                </p>
              </Card>

              <Card className="timeline-item-2 p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-success-100 flex items-center justify-center mr-4">
                    <Zap className="w-6 h-6 text-success-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Step 2: Process</h3>
                </div>
                <p className="text-neutral-600">
                  This card animates in from below with a slight delay after the first.
                </p>
              </Card>

              <Card className="timeline-item-3 p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-warning-100 flex items-center justify-center mr-4">
                    <TrendingUp className="w-6 h-6 text-warning-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Step 3: Analyze</h3>
                </div>
                <p className="text-neutral-600">
                  This card slides in from the right, creating a balanced flow effect.
                </p>
              </Card>

              <Card className="timeline-item-4 p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-error-100 flex items-center justify-center mr-4">
                    <Rocket className="w-6 h-6 text-error-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Step 4: Deploy</h3>
                </div>
                <p className="text-neutral-600">
                  The final card scales in with a bouncy effect, completing the sequence.
                </p>
              </Card>
            </TimelineAnimation>
          </div>
        </section>

        {/* Social Proof with Animated Counters */}
        <SocialProofSection 
          title="Real Results with Animated Proof"
          stats={[
            {
              label: "Satisfied Customers",
              value: "50,000+",
              icon: <Users className="w-6 h-6" />,
              description: "And growing daily"
            },
            {
              label: "Success Rate",
              value: "98%",
              icon: <TrendingUp className="w-6 h-6" />,
              description: "Project completion"
            },
            {
              label: "Countries Served",
              value: "150+",
              icon: <Globe className="w-6 h-6" />,
              description: "Worldwide presence"
            },
            {
              label: "Awards Won",
              value: "25",
              icon: <Star className="w-6 h-6" />,
              description: "Industry recognition"
            }
          ]}
        />

        {/* Performance Callout */}
        <section className="section-padding-lg bg-gradient-to-r from-primary-600 to-primary-800 text-white animate-section">
          <div className="container-section text-center">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Performance Optimized
              </h2>
              <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
                All animations are built with performance in mind, using hardware acceleration, 
                reduced motion support, and efficient rendering techniques to ensure smooth 
                60fps animations on all devices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="glass" size="lg">
                  View Source Code
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </ScrollAnimationLayout>
  );
}