'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/animations';
import { ArrowRight, Target, Users, Globe, Award } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 }
};

const staggerChildren = {
  animate: { transition: { staggerChildren: 0.15 } }
};

export const AboutSection: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("animate-section", className)}>
      {/* Hero Story Section */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="container-section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="max-w-2xl"
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeInUp} className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-sm font-semibold">
                <span>Our Story</span>
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
                Empowering Hoteliers to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">
                  Deliver Excellence
                </span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-neutral-600 mb-6 leading-relaxed">
                Founded in 2020 by a team of hospitality veterans and tech innovators, AmazePMS was built with a singular vision: to simplify the complex world of property management.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-lg text-neutral-600 mb-8 leading-relaxed">
                We believe that great technology shouldn't get in the way of great hospitality. Instead, it should empower you to focus on what matters most—your guests.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <Button size="lg" className="group">
                  Meet Our Team
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/20 to-secondary-500/20 mix-blend-overlay z-10" />
              {/* Using a solid color placeholder that looks premium instead of Next/Image if no image is available, but Image is preferred */}
              <div className="absolute inset-0 bg-neutral-900/10 z-0">
                <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center">
                  <span className="text-neutral-500 font-medium">Premium Team Photo Placeholder</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-neutral-900 text-white relative">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay" />
        <div className="container-section relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Core Values</h2>
            <p className="text-xl text-neutral-400">The principles that guide everything we build and every decision we make.</p>
          </div>

          <ScrollReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Target className="w-8 h-8" />,
                title: 'Innovation First',
                desc: 'We constantly push boundaries to deliver cutting-edge solutions.'
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Customer Success',
                desc: 'Your growth is our growth. We are obsessed with your success.'
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: 'Global Impact',
                desc: 'Building tools that empower properties anywhere in the world.'
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: 'Uncompromised Quality',
                desc: 'We never cut corners when it comes to performance and security.'
              }
            ].map((value, idx) => (
              <div key={idx} className="animate-card p-8 rounded-2xl bg-neutral-800 border border-neutral-700 hover:border-primary-500/50 hover:bg-neutral-800/80 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-neutral-700 text-primary-400 flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};
