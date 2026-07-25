import type { Metadata } from 'next';
import { AboutSection } from '@/components/sections/AboutSection';
import { Header, Footer } from '@/components/layout';

export const metadata: Metadata = {
  title: 'About Us | AmazePMS',
  description: 'Learn about our mission to revolutionize the hospitality industry with modern property management solutions.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-50 selection:bg-primary-100 selection:text-primary-900">
      <Header variant="transparent" showCTA={true} />
      <main id="main-content" className="pt-24">
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
