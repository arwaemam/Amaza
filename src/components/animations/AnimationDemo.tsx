'use client';

import * as React from 'react';
import { 
  FadeInUp, 
  StaggerChildren, 
  InteractiveElement, 
  PageTransition, 
  ContentSection 
} from '@/components/animations';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { Star, Zap, Users, Settings } from 'lucide-react';

/**
 * AnimationDemo Component
 * 
 * Demonstrates the new animation system components.
 * This is a temporary component for testing animations.
 */
export const AnimationDemo: React.FC = () => {
  const [showPageTransition, setShowPageTransition] = React.useState(true);

  const demoFeatures = [
    {
      icon: <Star className="h-6 w-6" />,
      title: "Smooth Animations",
      description: "Experience buttery smooth animations powered by Framer Motion."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Performance Optimized", 
      description: "All animations maintain 60fps and respect reduced motion preferences."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "User Friendly",
      description: "Animations enhance the user experience without being distracting."
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Highly Configurable",
      description: "Easily customize delays, stagger timing, and animation types."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      <PageTransition type="fade" show={showPageTransition}>
        <div className="container mx-auto px-4 py-16">
          
          {/* Header */}
          <ContentSection className="text-center mb-16">
            <FadeInUp delay={0}>
              <h1 className="text-5xl font-bold text-neutral-900 mb-4">
                Animation System Demo
              </h1>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                Showcasing the new component-level animation system with fade-in-up, 
                stagger, hover, and tap animations.
              </p>
            </FadeInUp>
          </ContentSection>

          {/* Interactive Buttons */}
          <ContentSection stagger className="mb-16">
            <FadeInUp delay={0.2}>
              <h2 className="text-3xl font-bold text-center mb-8">Interactive Elements</h2>
            </FadeInUp>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <InteractiveElement hover tap scale>
                <Button variant="primary" size="lg">
                  Hover & Tap Me
                </Button>
              </InteractiveElement>
              
              <InteractiveElement hover tap lift>
                <Button variant="outline" size="lg">
                  Lift on Hover
                </Button>
              </InteractiveElement>
              
              <InteractiveElement hover tap>
                <Button variant="ghost" size="lg">
                  Basic Animation
                </Button>
              </InteractiveElement>
            </div>

            <FadeInUp delay={0.3} className="text-center">
              <Button 
                variant="secondary"
                onClick={() => setShowPageTransition(!showPageTransition)}
              >
                Toggle Page Transition
              </Button>
            </FadeInUp>
          </ContentSection>

          {/* Staggered Cards */}
          <ContentSection className="mb-16">
            <FadeInUp delay={0.4}>
              <h2 className="text-3xl font-bold text-center mb-8">Staggered Grid Animation</h2>
            </FadeInUp>
            
            <StaggerChildren 
              type="grid" 
              delay={0.5}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {demoFeatures.map((feature, index) => (
                <FeatureCard
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  enableAnimation={true}
                  delay={index * 0.1}
                />
              ))}
            </StaggerChildren>
          </ContentSection>

          {/* List Stagger */}
          <ContentSection>
            <FadeInUp delay={0.6}>
              <h2 className="text-3xl font-bold text-center mb-8">List Stagger Animation</h2>
            </FadeInUp>
            
            <StaggerChildren type="list" delay={0.7}>
              {['First Item', 'Second Item', 'Third Item', 'Fourth Item'].map((item, index) => (
                <InteractiveElement key={item} hover tap lift className="mb-4">
                  <Card 
                    className="p-6 text-center"
                    enableHover={false} // InteractiveElement handles this
                    enableFadeIn={false} // StaggerChildren handles this
                  >
                    <h3 className="text-xl font-semibold text-neutral-900">{item}</h3>
                    <p className="text-neutral-600 mt-2">
                      This item demonstrates list stagger animations with hover effects.
                    </p>
                  </Card>
                </InteractiveElement>
              ))}
            </StaggerChildren>
          </ContentSection>

        </div>
      </PageTransition>
    </div>
  );
};

export default AnimationDemo;