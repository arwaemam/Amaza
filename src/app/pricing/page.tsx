import type { Metadata } from 'next';
import { PricingSection } from '@/components/sections/PricingSection';
import { Header, Footer } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Pricing | AmazePMS',
  description: 'Flexible, transparent pricing plans for properties of all sizes.',
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-neutral-50 selection:bg-primary-100 selection:text-primary-900">
      <Header variant="transparent" showCTA={true} />
      <main id="main-content" className="pt-24">
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
