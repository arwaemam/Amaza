import type { Metadata } from 'next';
import { ResourcesSection } from '@/components/sections/ResourcesSection';
import { Header, Footer } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Resources | AmazePMS',
  description: 'Explore our latest articles, guides, webinars, and more to elevate your property management.',
};

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-neutral-50 selection:bg-primary-100 selection:text-primary-900">
      <Header variant="transparent" showCTA={true} />
      <main id="main-content" className="pt-24">
        <ResourcesSection />
      </main>
      <Footer />
    </div>
  );
}
