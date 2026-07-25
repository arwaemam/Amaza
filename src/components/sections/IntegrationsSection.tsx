'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/animations';
import { ArrowRight, Link as LinkIcon, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Integration {
  id: string;
  name: string;
  category: string;
  description: string;
  logo: string;
  popular?: boolean;
}

const defaultIntegrations: Integration[] = [
  {
    id: 'booking-com',
    name: 'Booking.com',
    category: 'OTA',
    description: 'Sync rates, availability, and reservations in real-time with the world\'s largest travel platform.',
    logo: 'B', // Using letter as placeholder for logo
    popular: true,
  },
  {
    id: 'airbnb',
    name: 'Airbnb',
    category: 'OTA',
    description: 'Automate messaging, pricing, and availability across all your Airbnb listings seamlessly.',
    logo: 'A',
    popular: true,
  },
  {
    id: 'expedia',
    name: 'Expedia',
    category: 'OTA',
    description: 'Connect with Expedia Group\'s extensive network of travel brands and reach global travelers.',
    logo: 'E',
  },
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'Payment',
    description: 'Securely process payments, handle deposits, and automate refunds with Stripe integration.',
    logo: 'S',
    popular: true,
  },
  {
    id: 'xero',
    name: 'Xero',
    category: 'Accounting',
    description: 'Automatically sync invoices, payments, and financial data with your Xero account.',
    logo: 'X',
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    category: 'Marketing',
    description: 'Sync guest data to create targeted email campaigns and automate post-stay communication.',
    logo: 'M',
  },
];

const categories = ['All', 'OTA', 'Payment', 'Accounting', 'Marketing', 'Smart Home'];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 }
};

export const IntegrationsSection: React.FC<{ className?: string }> = ({ className }) => {
  const [activeCategory, setActiveCategory] = React.useState('All');

  const filteredIntegrations = React.useMemo(() => {
    if (activeCategory === 'All') return defaultIntegrations;
    return defaultIntegrations.filter(i => i.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className={cn("animate-section section-padding bg-neutral-50 overflow-hidden relative", className)}>
      {/* Decorative background elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary-200/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-200/20 rounded-full blur-3xl translate-y-1/3 translate-x-1/3" />
      
      <div className="container-section relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
            }}
          >
            <motion.div variants={fadeInUp} className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold">
              <LinkIcon className="w-4 h-4" />
              <span>Seamless Connections</span>
            </motion.div>
            
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-neutral-900 mb-6 tracking-tight">
              Connect with your <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">
                favorite tools
              </span>
            </motion.h2>
            
            <motion.p variants={fadeInUp} className="text-lg text-neutral-600 leading-relaxed">
              AmazePMS integrates effortlessly with the platforms you already use, 
              creating a centralized hub for all your hospitality operations.
            </motion.p>
          </motion.div>
        </div>

        {/* Categories Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-12 relative z-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          {categories.map((category) => (
            <motion.button
              variants={fadeInUp}
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                activeCategory === category
                  ? "bg-neutral-900 text-white shadow-md scale-105"
                  : "bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200 hover:border-neutral-300"
              )}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Integrations Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {filteredIntegrations.map((integration) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={integration.id}
              className="h-full"
            >
              <Card className="animate-card group h-full p-6 hover:shadow-lg hover:border-primary-200 transition-all duration-300 flex flex-col bg-white/80 backdrop-blur-sm">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-neutral-100 flex items-center justify-center text-2xl font-bold text-neutral-700 group-hover:scale-110 group-hover:bg-primary-50 group-hover:text-primary-600 transition-all duration-300">
                    {integration.logo}
                  </div>
                  {integration.popular && (
                    <Badge variant="success" size="sm">Popular</Badge>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {integration.name}
                </h3>
                <p className="text-sm font-medium text-neutral-500 mb-4">{integration.category}</p>
                
                <p className="text-neutral-600 mb-6 flex-grow leading-relaxed">
                  {integration.description}
                </p>
                
                <div className="mt-auto pt-4 border-t border-neutral-100 flex items-center text-primary-600 font-medium text-sm">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  One-click install
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <ScrollReveal delay={0.4} className="text-center">
          <p className="text-neutral-600 mb-6">Don't see your favorite tool? We have a robust API.</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button size="lg" className="group">
              View All 100+ Integrations
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              Explore API Docs
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default IntegrationsSection;
