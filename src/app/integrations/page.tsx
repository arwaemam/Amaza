import type { Metadata } from 'next';
import { IntegrationsSection } from '@/components/sections/IntegrationsSection';
import { Header, Footer } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Integrations | AmazePMS',
  description: 'Connect AmazePMS with your favorite OTAs, payment gateways, accounting software, and more.',
};

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-neutral-50 selection:bg-primary-100 selection:text-primary-900">
      <Header variant="transparent" showCTA={true} />
      <main id="main-content" className="pt-24">
        <IntegrationsSection />
      </main>
      <Footer />
    </div>
  );
}
