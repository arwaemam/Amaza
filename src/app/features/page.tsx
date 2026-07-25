import type { Metadata } from 'next';
import Link from 'next/link';
import { FeaturesGrid } from '@/components/sections/FeaturesGrid';
import { DashboardSection } from '@/components/sections/DashboardSection';
import { IntegrationsSection } from '@/components/sections/IntegrationsSection';
import { SocialProofSection } from '@/components/sections/SocialProofSection';
import { Header, Footer } from '@/components/layout';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Features | AmazePMS',
  description: 'Explore the powerful features of AmazePMS designed to transform your property management.',
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-neutral-50 selection:bg-primary-100 selection:text-primary-900">
      <Header variant="transparent" showCTA={true} />
      <main id="main-content" className="pt-24">
        {/* Features Hero Section */}
        <section className="animate-section py-20 lg:py-32 bg-white relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
          <div className="container-section relative z-10 text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Everything you need to succeed</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6 tracking-tight">
              Powerful Features for <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">
                Modern Hospitality
              </span>
            </h1>
            <p className="text-xl text-neutral-600 mb-10 leading-relaxed">
              Discover how our comprehensive suite of tools can automate your operations, increase your revenue, and elevate the guest experience.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button size="xl" className="w-full group">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button size="xl" variant="outline" className="w-full">
                  Request Demo
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary-100/50 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-secondary-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </section>

        {/* Existing Features Grid */}
        <FeaturesGrid />

        {/* Added Sections */}
        <DashboardSection />
        <IntegrationsSection />
        <SocialProofSection />
      </main>
      <Footer />
    </div>
  );
}
