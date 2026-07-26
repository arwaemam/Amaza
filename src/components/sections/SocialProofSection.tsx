'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AnimatedCounter, ScrollReveal } from '@/components/animations';
import { 
  Star, 
  Quote, 
  ArrowRight, 
  TrendingUp, 
  Users, 
  Globe,
  Award,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

interface Testimonial {
  id: string;
  content: string;
  author: {
    name: string;
    title: string;
    company: string;
    avatar?: string;
  };
  rating: number;
  featured?: boolean;
}

interface CompanyLogo {
  name: string;
  src: string;
  alt: string;
}

interface Stat {
  label: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
}

export interface SocialProofSectionProps {
  title?: string;
  testimonials?: Testimonial[];
  logos?: CompanyLogo[];
  stats?: Stat[];
  className?: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    content: "AmazePMS transformed our operations completely. The automation features alone saved us 4 hours daily, and our revenue increased by 35% in just 6 months. The team's support is exceptional.",
    author: {
      name: "Sarah Chen",
      title: "General Manager",
      company: "Oceanview Resort & Spa"
    },
    rating: 5,
    featured: true
  },
  {
    id: '2',
    content: "The best PMS investment we've made. The intuitive interface made training our staff effortless, and the real-time analytics help us make better pricing decisions every day.",
    author: {
      name: "Michael Rodriguez",
      title: "Operations Director",
      company: "Metropolitan Hotels Group"
    },
    rating: 5
  },
  {
    id: '3',
    content: "Integration was seamless and the ROI was immediate. Our guest satisfaction scores improved dramatically thanks to the automated communication features and personalized service tools.",
    author: {
      name: "Emma Thompson",
      title: "Property Owner",
      company: "Boutique Inns Collection"
    },
    rating: 5,
    featured: true
  },
  {
    id: '4',
    content: "AmazePMS's channel management capabilities are unmatched. We're now on 200+ booking sites with zero manual work. Our bookings increased 50% year-over-year.",
    author: {
      name: "David Park",
      title: "Revenue Manager",
      company: "Luxury Vacation Rentals"
    },
    rating: 5
  },
  {
    id: '5',
    content: "The mobile app is a game-changer. I can manage my properties from anywhere, and the real-time notifications keep me informed of every important update instantly.",
    author: {
      name: "Lisa Johnson",
      title: "Multi-Property Owner",
      company: "Johnson Hospitality"
    },
    rating: 5
  },
  {
    id: '6',
    content: "Outstanding customer service and a platform that actually delivers on its promises. The automated reporting saves hours of manual work, and the insights are incredibly valuable.",
    author: {
      name: "Robert Kim",
      title: "Hotel Manager",
      company: "Grand Plaza Hotel"
    },
    rating: 5,
    featured: true
  }
];

const defaultLogos: CompanyLogo[] = [
  { name: "Marriott", src: "/logos/marriott.svg", alt: "Marriott International" },
  { name: "Hilton", src: "/logos/hilton.svg", alt: "Hilton Hotels" },
  { name: "IHG", src: "/logos/ihg.svg", alt: "InterContinental Hotels Group" },
  { name: "Accor", src: "/logos/accor.svg", alt: "Accor Hotels" },
  { name: "Wyndham", src: "/logos/wyndham.svg", alt: "Wyndham Hotels" },
  { name: "Choice", src: "/logos/choice.svg", alt: "Choice Hotels" },
  { name: "Best Western", src: "/logos/best-western.svg", alt: "Best Western" },
  { name: "Radisson", src: "/logos/radisson.svg", alt: "Radisson Hotels" }
];

const defaultStats: Stat[] = [
  {
    label: "Properties Managed",
    value: "10,000+",
    icon: <Globe className="w-6 h-6" />,
    description: "Across 50+ countries"
  },
  {
    label: "Customer Satisfaction",
    value: "4.9/5",
    icon: <Star className="w-6 h-6" />,
    description: "Based on 2,500+ reviews"
  },
  {
    label: "Revenue Increase",
    value: "32%",
    icon: <TrendingUp className="w-6 h-6" />,
    description: "Average customer growth"
  },
  {
    label: "Active Users",
    value: "50,000+",
    icon: <Users className="w-6 h-6" />,
    description: "Daily platform usage"
  }
];

export const SocialProofSection: React.FC<SocialProofSectionProps> = ({
  title = "Trusted by Industry Leaders Worldwide",
  testimonials = defaultTestimonials,
  logos = defaultLogos,
  stats = defaultStats,
  className = ""
}) => {
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);
  const featuredTestimonials = testimonials.filter(t => t.featured);
  const displayTestimonials = featuredTestimonials.length > 0 ? featuredTestimonials : testimonials.slice(0, 3);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % displayTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length);
  };

  return (
    <section className={`animate-section section-padding-lg bg-white ${className}`}>
      <div className="container-section">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6"
          >
            {title}
          </motion.h2>
          
          {/* Awards Row */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-6 mb-8"
          >
            <Badge variant="primary" size="lg" className="px-4 py-2">
              <Award className="w-4 h-4 mr-2" />
              #1 PMS Platform 2024
            </Badge>
            <Badge variant="success" size="lg" className="px-4 py-2">
              <Star className="w-4 h-4 mr-2 fill-current" />
              99.9% Uptime SLA
            </Badge>
            <Badge variant="outline" size="lg" className="px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              SOC 2 Certified
            </Badge>
          </motion.div>
        </motion.div>

        {/* Key Statistics */}
        <ScrollReveal
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          stagger={0.1}
          delay={0.2}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
                {/* Extract number from stat.value for animation */}
                {stat.value.includes(',') || stat.value.includes('%') || stat.value.includes('/') ? (
                  <AnimatedCounter
                    from={0}
                    to={(() => {
                      // Parse different formats
                      if (stat.value.includes('K+')) return 10;
                      if (stat.value.includes('/5')) return 4.9;
                      if (stat.value.includes('%')) return parseInt(stat.value.replace('%', ''));
                      if (stat.value.includes(',')) return parseInt(stat.value.replace(',', ''));
                      return parseInt(stat.value);
                    })()}
                    duration={2}
                    format={(value) => {
                      if (stat.value.includes('K+')) return `${Math.round(value)}K+`;
                      if (stat.value.includes('/5')) return `${value.toFixed(1)}/5`;
                      if (stat.value.includes('%')) return `${Math.round(value)}%`;
                      if (stat.value.includes(',')) return Math.round(value).toLocaleString();
                      return Math.round(value).toString();
                    }}
                    className="counter"
                  />
                ) : (
                  stat.value
                )}
              </div>
              <div className="font-semibold text-neutral-900 mb-1">
                {stat.label}
              </div>
              {stat.description && (
                <div className="text-sm text-neutral-600">
                  {stat.description}
                </div>
              )}
            </motion.div>
          ))}
        </ScrollReveal>

        {/* Featured Testimonial Carousel */}
        <motion.div
          className="max-w-5xl mx-auto mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <Card variant="glass" className="relative overflow-hidden p-8 md:p-12">
            <div className="absolute top-6 left-6 text-primary-200">
              <Quote className="w-12 h-12" />
            </div>
            
            <div className="relative">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                {/* Rating */}
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-6 h-6 text-yellow-400 fill-current" 
                    />
                  ))}
                </div>

                {/* Testimonial Content */}
                <blockquote className="text-xl md:text-2xl text-neutral-700 leading-relaxed mb-8 font-medium">
                  "{displayTestimonials[currentTestimonial]?.content}"
                </blockquote>

                {/* Author */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Avatar 
                    size="lg" 
                    src={displayTestimonials[currentTestimonial]?.author.avatar}
                    alt={displayTestimonials[currentTestimonial]?.author.name}
                    fallback={displayTestimonials[currentTestimonial]?.author.name}
                  />
                  <div className="text-center sm:text-left">
                    <div className="font-semibold text-neutral-900">
                      {displayTestimonials[currentTestimonial]?.author.name}
                    </div>
                    <div className="text-neutral-600">
                      {displayTestimonials[currentTestimonial]?.author.title}
                    </div>
                    <div className="text-primary-600 font-medium">
                      {displayTestimonials[currentTestimonial]?.author.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Navigation */}
            {displayTestimonials.length > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full bg-white/80 hover:bg-white shadow-soft transition-all duration-200"
                >
                  <ChevronLeft className="w-5 h-5 text-neutral-700" />
                </button>
                
                <div className="flex gap-2">
                  {displayTestimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === currentTestimonial 
                          ? 'bg-primary-600 w-6' 
                          : 'bg-neutral-300 hover:bg-neutral-400'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full bg-white/80 hover:bg-white shadow-soft transition-all duration-200"
                >
                  <ChevronRight className="w-5 h-5 text-neutral-700" />
                </button>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Customer Logos */}
        <motion.div
          className="mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerChildren}
        >
          <motion.p 
            variants={fadeInUp}
            className="text-center text-lg text-neutral-600 mb-8"
          >
            Trusted by leading hospitality brands worldwide
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center"
          >
            {logos.map((logo, index) => (
              <div 
                key={logo.name}
                className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              >
                <div className="w-24 h-12 bg-neutral-200 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-medium text-neutral-600">{logo.name}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* All Testimonials Grid */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerChildren}
        >
          <motion.h3 
            variants={fadeInUp}
            className="text-2xl md:text-3xl font-bold text-center text-neutral-900 mb-12"
          >
            What Our Customers Say
          </motion.h3>
          
          <motion.div 
            variants={staggerChildren}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {testimonials.slice(0, 6).map((testimonial, index) => (
              <motion.div key={testimonial.id} variants={fadeInUp}>
                <Card className="animate-card h-full p-6 hover:shadow-medium transition-all duration-300">
                  {/* Rating */}
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-4 h-4 text-yellow-400 fill-current" 
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="text-neutral-700 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <Avatar 
                      size="md" 
                      src={testimonial.author.avatar}
                      alt={testimonial.author.name}
                      fallback={testimonial.author.name}
                    />
                    <div>
                      <div className="font-semibold text-neutral-900">
                        {testimonial.author.name}
                      </div>
                      <div className="text-sm text-neutral-600">
                        {testimonial.author.title}, {testimonial.author.company}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-lg text-neutral-600 mb-6">
            Join thousands of satisfied customers worldwide
          </p>
          <Button size="xl" className="group px-8 py-4">
            Start Your Success Story
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};