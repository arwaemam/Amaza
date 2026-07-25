'use client';

import { Header, Footer } from '@/components/layout';
import ContactForm from '@/components/forms/ContactForm';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';
import { ContactFormData } from '@/lib/types';

export default function ContactPage() {
  const handleContactSubmit = async (data: ContactFormData) => {
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log('Contact form submitted:', data);
        resolve();
      }, 1500);
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50 selection:bg-primary-100 selection:text-primary-900">
      <Header variant="transparent" showCTA={true} />
      <main id="main-content" className="pt-24 pb-20">
        <div className="container-section">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6"
            >
              Let's Start a Conversation
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-neutral-600"
            >
              Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            
            {/* Contact Info Sidebar */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1 space-y-8"
            >
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-200">
                <h3 className="text-xl font-bold text-neutral-900 mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 mb-1">Our Office</h4>
                      <p className="text-neutral-600">123 Innovation Drive<br />Tech District, CA 94103</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 mb-1">Phone</h4>
                      <p className="text-neutral-600">+1 (555) 123-4567<br />Mon-Fri from 8am to 6pm</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 mb-1">Email</h4>
                      <p className="text-neutral-600">hello@amazepms.com<br />support@amazepms.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <ContactForm 
                title="Send us a Message" 
                subtitle="" 
                onSubmit={handleContactSubmit} 
              />
            </motion.div>
          </div>
          
        </div>
      </main>
      <Footer />
    </div>
  );
}
