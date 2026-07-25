'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowRight, BookOpen, PlayCircle, FileText, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Resource {
  id: string;
  title: string;
  type: 'Article' | 'Webinar' | 'Guide' | 'E-book';
  category: string;
  readTime: string;
  imageColor: string;
  icon: React.ReactNode;
}

const resourcesData: Resource[] = [
  {
    id: '1',
    title: 'The Ultimate Guide to Increasing Direct Bookings in 2024',
    type: 'Guide',
    category: 'Marketing',
    readTime: '15 min read',
    imageColor: 'from-blue-500 to-indigo-500',
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    id: '2',
    title: 'Automating Your Front Desk Operations',
    type: 'Webinar',
    category: 'Operations',
    readTime: '45 min watch',
    imageColor: 'from-purple-500 to-pink-500',
    icon: <PlayCircle className="w-5 h-5" />,
  },
  {
    id: '3',
    title: 'How to Manage Dynamic Pricing Effectively',
    type: 'Article',
    category: 'Revenue',
    readTime: '8 min read',
    imageColor: 'from-emerald-400 to-teal-500',
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: '4',
    title: 'State of Hospitality Report',
    type: 'E-book',
    category: 'Industry',
    readTime: '30 min read',
    imageColor: 'from-orange-400 to-red-500',
    icon: <Download className="w-5 h-5" />,
  },
  {
    id: '5',
    title: 'Enhancing Guest Experience with Mobile Keys',
    type: 'Article',
    category: 'Technology',
    readTime: '5 min read',
    imageColor: 'from-cyan-400 to-blue-500',
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: '6',
    title: 'Staff Retention Strategies for Hotels',
    type: 'Guide',
    category: 'Management',
    readTime: '12 min read',
    imageColor: 'from-amber-400 to-orange-500',
    icon: <BookOpen className="w-5 h-5" />,
  },
];

const categories = ['All', 'Article', 'Webinar', 'Guide', 'E-book'];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const ResourcesSection: React.FC<{ className?: string }> = ({ className }) => {
  const [activeCategory, setActiveCategory] = React.useState('All');

  const filteredResources = React.useMemo(() => {
    if (activeCategory === 'All') return resourcesData;
    return resourcesData.filter(r => r.type === activeCategory);
  }, [activeCategory]);

  return (
    <section className={cn("py-20 lg:py-32 bg-white relative overflow-hidden", className)}>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
      
      <div className="container-section relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
          >
            <motion.div variants={fadeInUp} className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-sm font-semibold">
              <BookOpen className="w-4 h-4" />
              <span>Knowledge Base</span>
            </motion.div>
            
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 tracking-tight">
              Resources to Help You <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">
                Grow Faster
              </span>
            </motion.h2>
            
            <motion.p variants={fadeInUp} className="text-lg text-neutral-600 leading-relaxed">
              Discover industry insights, expert guides, and practical tips to elevate your property management game.
            </motion.p>
          </motion.div>
        </div>

        {/* Categories Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-16 relative z-20"
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

        {/* Resources Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {filteredResources.map((resource) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={resource.id}
              className="h-full"
            >
              <Card className="group h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 border-neutral-200">
                <div className={cn("h-48 w-full bg-gradient-to-br relative flex items-center justify-center text-white", resource.imageColor)}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                  <div className="relative z-10 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {resource.icon}
                  </div>
                  <Badge variant="outline" className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white border-white/30">
                    {resource.category}
                  </Badge>
                </div>
                
                <div className="p-6 flex flex-col flex-grow bg-white">
                  <div className="flex items-center gap-2 text-sm text-primary-600 font-semibold mb-3">
                    <span>{resource.type}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-300" />
                    <span className="text-neutral-500">{resource.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {resource.title}
                  </h3>
                  
                  <div className="mt-auto pt-4 flex items-center text-primary-600 font-medium text-sm group-hover:underline decoration-2 underline-offset-4">
                    Read more
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary-500 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary-500 rounded-full blur-3xl opacity-50" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Never miss an update</h3>
            <p className="text-primary-100 mb-8 text-lg">
              Get the latest hospitality insights and AmazePMS news delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-3 rounded-lg text-neutral-900 w-full focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <Button size="lg" className="whitespace-nowrap bg-white text-primary-900 hover:bg-neutral-100 hover:text-primary-950">
                Subscribe
              </Button>
            </form>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
};
