'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { StaggerChildren, ContentSection, FadeInUp, ScrollReveal } from '@/components/animations';
import { 
  Calendar, 
  Users, 
  BarChart3, 
  CreditCard, 
  MessageSquare, 
  Smartphone,
  Globe,
  Shield,
  Zap,
  Settings,
  TrendingUp,
  Clock
} from 'lucide-react';

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: {
    text: string;
    href: string;
    external?: boolean;
  };
  highlighted?: boolean;
}

export interface FeaturesGridProps {
  title?: string;
  subtitle?: string;
  features?: Feature[];
  columns?: 2 | 3 | 4;
  className?: string;
}

const defaultFeatures: Feature[] = [
  {
    icon: <Calendar className="h-6 w-6" />,
    title: "Smart Reservations",
    description: "Advanced booking engine with real-time availability, dynamic pricing, and automated confirmations across all channels.",
    link: {
      text: "Learn More",
      href: "/features/reservations"
    },
    highlighted: true
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Guest Management", 
    description: "Complete guest profiles with preferences, history, and personalized communication tools for exceptional service.",
    link: {
      text: "Explore",
      href: "/features/guest-management"
    }
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Revenue Analytics",
    description: "Comprehensive reporting and analytics to optimize pricing, track performance, and maximize revenue potential.",
    link: {
      text: "View Demo",
      href: "/demo/analytics"
    },
    highlighted: true
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: "Payment Processing",
    description: "Secure, PCI-compliant payment processing with support for multiple currencies and payment methods.",
    link: {
      text: "Security Info",
      href: "/security"
    }
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Automated Messaging",
    description: "Smart communication workflows with automated emails, SMS, and in-app notifications for guests and staff.",
    link: {
      text: "See Templates",
      href: "/features/messaging"
    }
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Mobile Access",
    description: "Native mobile apps for iOS and Android, enabling full PMS functionality on-the-go for your team.",
    link: {
      text: "Download Apps",
      href: "/mobile",
      external: true
    }
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Channel Manager",
    description: "Seamlessly sync inventory and rates across 200+ booking channels including OTAs and direct booking sites.",
    link: {
      text: "View Channels",
      href: "/integrations/channels"
    },
    highlighted: true
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Enterprise Security",
    description: "Bank-level security with encrypted data, role-based access control, and comprehensive audit trails.",
    link: {
      text: "Security Details",
      href: "/security"
    }
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "API Integration",
    description: "Powerful REST API and webhook support for seamless integration with your existing tools and workflows.",
    link: {
      text: "API Docs",
      href: "/developers",
      external: true
    }
  },
  {
    icon: <Settings className="h-6 w-6" />,
    title: "Custom Workflows",
    description: "Flexible automation engine to create custom workflows that match your unique operational processes.",
    link: {
      text: "Workflow Builder",
      href: "/features/workflows"
    }
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Dynamic Pricing",
    description: "AI-powered revenue management with automatic rate adjustments based on demand, seasonality, and market conditions.",
    link: {
      text: "Pricing Engine",
      href: "/features/pricing"
    },
    highlighted: true
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "24/7 Support",
    description: "Round-the-clock customer support with dedicated account managers and comprehensive training resources.",
    link: {
      text: "Support Center",
      href: "/support"
    }
  }
];

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({
  title = "Everything You Need to Excel",
  subtitle = "Comprehensive features designed for modern hospitality management",
  features = defaultFeatures,
  columns = 3,
  className = ""
}) => {
  const router = useRouter();
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <ContentSection className={`section-padding-lg bg-white ${className}`}>
      <div className="container-section">
        {/* Section Header */}
        <StaggerChildren 
          type="default"
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <FadeInUp delay={0}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
              {title}
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <p className="text-xl text-neutral-600 leading-relaxed">
              {subtitle}
            </p>
          </FadeInUp>
        </StaggerChildren>

        {/* Features Grid */}
        <ScrollReveal 
          className={`features-grid grid ${gridCols[columns]} gap-8`}
          delay={0.2}
          stagger={0.1}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={`${feature.title}-${index}`}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              link={feature.link}
              variant={feature.highlighted ? "highlighted" : "default"}
              className="h-full feature-card animate-card"
              enableAnimation={true}
              delay={index * 0.1}
            />
          ))}
        </ScrollReveal>

        {/* Bottom CTA */}
        <FadeInUp delay={0.6} className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <button 
              className="btn-base bg-primary-600 text-white hover:bg-primary-700 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200 hover:shadow-colored-primary"
              onClick={() => router.push('/features')}
            >
              Explore All Features
              <BarChart3 className="w-5 h-5 ml-2" />
            </button>
            <button 
              className="btn-base border-2 border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200"
              onClick={() => router.push('/contact')}
            >
              Schedule Demo
              <Calendar className="w-5 h-5 ml-2" />
            </button>
          </div>
        </FadeInUp>
      </div>
    </ContentSection>
  );
};