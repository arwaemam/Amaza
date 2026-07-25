import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesGrid } from '@/components/sections/FeaturesGrid';
import { DashboardSection } from '@/components/sections/DashboardSection';
import { SocialProofSection } from '@/components/sections/SocialProofSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { IntegrationsSection } from '@/components/sections/IntegrationsSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ResourcesSection } from '@/components/sections/ResourcesSection';
import { Header, Footer } from '@/components/layout';

export const metadata: Metadata = {
  title: 'AmazePMS - Premium Property Management System',
  description:
    'Transform your hospitality business with our award-winning property management system. Advanced features, seamless integrations, and exceptional support.',
  openGraph: {
    title: 'AmazePMS - Premium Property Management System',
    description:
      'Transform your hospitality business with our award-winning property management system.',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-50 selection:bg-primary-100 selection:text-primary-900">
      <Header variant="transparent" showCTA={true} />
      <main id="main-content">
        <HeroSection />
        <FeaturesGrid />
        <DashboardSection />
        <AboutSection />
        <SocialProofSection />
        <IntegrationsSection />
        <ResourcesSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}