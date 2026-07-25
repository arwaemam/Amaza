'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/Modal';
import { 
  BarChart3, 
  Calendar, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Star,
  ArrowUpRight,
  Play,
  X,
  Maximize2,
  Eye,
  Clock
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

interface Screenshot {
  id: string;
  src: string;
  alt: string;
  caption: string;
  features: string[];
}

interface Hotspot {
  id: string;
  x: number; // percentage
  y: number; // percentage
  title: string;
  description: string;
  feature: string;
}

export interface DashboardSectionProps {
  title?: string;
  description?: string;
  screenshots?: Screenshot[];
  enableInteractivity?: boolean;
  className?: string;
}

const defaultScreenshots: Screenshot[] = [
  {
    id: 'main-dashboard',
    src: '/dashboard-main.jpg', // This would be actual screenshot
    alt: 'Main Dashboard Overview',
    caption: 'Comprehensive Dashboard View',
    features: ['Real-time Analytics', 'Quick Actions', 'Revenue Tracking', 'Occupancy Status']
  },
  {
    id: 'reservations',
    src: '/dashboard-reservations.jpg',
    alt: 'Reservations Management',
    caption: 'Smart Reservation System',
    features: ['Booking Calendar', 'Guest Profiles', 'Payment Processing', 'Channel Management']
  },
  {
    id: 'analytics',
    src: '/dashboard-analytics.jpg',
    alt: 'Analytics & Reports',
    caption: 'Advanced Analytics Suite',
    features: ['Revenue Reports', 'Occupancy Trends', 'Performance Metrics', 'Forecasting']
  }
];

const hotspots: Hotspot[] = [
  {
    id: 'revenue-card',
    x: 25,
    y: 30,
    title: 'Revenue Analytics',
    description: 'Real-time revenue tracking with comparative analysis and forecasting capabilities.',
    feature: 'Analytics Engine'
  },
  {
    id: 'calendar-view',
    x: 65,
    y: 45,
    title: 'Interactive Calendar',
    description: 'Drag-and-drop booking management with real-time availability and pricing updates.',
    feature: 'Booking Management'
  },
  {
    id: 'guest-list',
    x: 80,
    y: 25,
    title: 'Guest Management',
    description: 'Comprehensive guest profiles with preferences, history, and communication tools.',
    feature: 'CRM System'
  }
];

export const DashboardSection: React.FC<DashboardSectionProps> = ({
  title = "Experience the Power of AmazePMS Dashboard",
  description = "See how our intuitive interface transforms complex property management into simple, efficient workflows. Every feature is designed with your success in mind.",
  screenshots = defaultScreenshots,
  enableInteractivity = true,
  className = ""
}) => {
  const [activeScreenshot, setActiveScreenshot] = React.useState(0);
  const [selectedHotspot, setSelectedHotspot] = React.useState<Hotspot | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const stats = [
    { label: 'Average Setup Time', value: '< 24hrs', icon: Clock },
    { label: 'User Satisfaction', value: '4.9/5', icon: Star },
    { label: 'Revenue Increase', value: '+32%', icon: TrendingUp },
    { label: 'Time Saved Daily', value: '3.5hrs', icon: BarChart3 }
  ];

  return (
    <section className={`animate-section section-padding-lg bg-gradient-to-br from-neutral-50 to-primary-50/30 ${className}`}>
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
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-neutral-600 leading-relaxed mb-8"
          >
            {description}
          </motion.p>
          
          {/* Quick Stats */}
          <motion.div 
            variants={fadeInUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 mb-2">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold text-neutral-900">{stat.value}</div>
                <div className="text-sm text-neutral-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Main Dashboard Preview */}
        <motion.div
          className="relative max-w-6xl mx-auto mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
        >
          <Card variant="elevated" className="overflow-hidden bg-white shadow-2xl">
            {/* Browser Chrome */}
            <div className="flex items-center space-x-2 px-4 py-3 bg-neutral-100 border-b border-neutral-200">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 text-center">
                <div className="inline-block px-3 py-1 bg-white rounded-md text-sm text-neutral-600 font-mono">
                  app.amazepms.com/dashboard
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(true)}>
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>

            {/* Dashboard Content */}
            <div className="relative bg-gradient-to-br from-primary-50 to-neutral-50 aspect-video overflow-hidden">
              {/* Mock Dashboard Interface */}
              <div className="p-6 h-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">Good morning, Sarah!</h3>
                    <p className="text-neutral-600">Here's what's happening at Ocean View Resort today</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="success">Live Data</Badge>
                    <Badge variant="primary">Premium</Badge>
                  </div>
                </div>

                {/* Key Metrics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white rounded-lg p-4 shadow-soft">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-neutral-600">Revenue Today</p>
                        <p className="text-2xl font-bold text-neutral-900">$12,450</p>
                      </div>
                      <DollarSign className="w-8 h-8 text-success-500" />
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-soft">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-neutral-600">Occupancy</p>
                        <p className="text-2xl font-bold text-neutral-900">87%</p>
                      </div>
                      <Users className="w-8 h-8 text-primary-500" />
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-soft">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-neutral-600">Check-ins</p>
                        <p className="text-2xl font-bold text-neutral-900">24</p>
                      </div>
                      <Calendar className="w-8 h-8 text-info-500" />
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-soft">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-neutral-600">Avg. Rate</p>
                        <p className="text-2xl font-bold text-neutral-900">$186</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-warning-500" />
                    </div>
                  </div>
                </div>

                {/* Interactive Chart Area */}
                <div className="bg-white rounded-lg p-4 shadow-soft h-32">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-neutral-900">Revenue Trend</h4>
                    <Badge variant="outline">Last 30 Days</Badge>
                  </div>
                  <div className="h-20 bg-gradient-to-r from-primary-200/50 to-success-200/50 rounded flex items-end justify-center">
                    <BarChart3 className="w-16 h-16 text-primary-600/30" />
                  </div>
                </div>
              </div>

              {/* Interactive Hotspots */}
              {enableInteractivity && hotspots.map((hotspot) => (
                <motion.button
                  key={hotspot.id}
                  className="absolute w-6 h-6 bg-primary-600 rounded-full border-4 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform"
                  style={{
                    left: `${hotspot.x}%`,
                    top: `${hotspot.y}%`,
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    boxShadow: [
                      '0 0 0 0 rgba(37, 99, 235, 0.7)',
                      '0 0 0 20px rgba(37, 99, 235, 0)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  onClick={() => setSelectedHotspot(hotspot)}
                >
                  <span className="sr-only">{hotspot.title}</span>
                </motion.button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Screenshot Carousel */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerChildren}
        >
          <motion.h3 
            variants={fadeInUp}
            className="text-2xl font-bold text-center text-neutral-900 mb-8"
          >
            Explore Every Feature
          </motion.h3>
          
          <motion.div 
            variants={fadeInUp}
            className="grid md:grid-cols-3 gap-6"
          >
            {screenshots.map((screenshot, index) => (
              <Card 
                key={screenshot.id}
                variant={index === activeScreenshot ? "elevated" : "default"}
                className={`cursor-pointer transition-all duration-300 ${
                  index === activeScreenshot ? 'ring-2 ring-primary-500 shadow-colored-primary' : 'hover:shadow-medium'
                }`}
                onClick={() => setActiveScreenshot(index)}
              >
                <div className="aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-t-lg flex items-center justify-center">
                  <Eye className="w-12 h-12 text-neutral-400" />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-neutral-900 mb-2">{screenshot.caption}</h4>
                  <ul className="text-sm text-neutral-600 space-y-1">
                    {screenshot.features.slice(0, 2).map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {screenshot.features.length > 2 && (
                    <p className="text-xs text-neutral-500 mt-1">
                      +{screenshot.features.length - 2} more features
                    </p>
                  )}
                </div>
              </Card>
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
          <Button size="xl" className="group px-8 py-4">
            <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Watch Full Demo
            <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </motion.div>
      </div>

      {/* Hotspot Detail Modal */}
      <Modal isOpen={!!selectedHotspot} onClose={() => setSelectedHotspot(null)} size="md">
        {selectedHotspot && (
          <>
            <ModalHeader>
              <ModalTitle>{selectedHotspot.title}</ModalTitle>
            </ModalHeader>
            <ModalContent>
              <div className="space-y-4">
                <Badge variant="primary">{selectedHotspot.feature}</Badge>
                <p className="text-neutral-700">{selectedHotspot.description}</p>
                <Button className="w-full">
                  Explore This Feature
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </ModalContent>
          </>
        )}
      </Modal>

      {/* Full Screen Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="full">
        <ModalHeader>
          <ModalTitle>AmazePMS Dashboard - Full View</ModalTitle>
        </ModalHeader>
        <ModalContent>
          <div className="aspect-video bg-gradient-to-br from-primary-50 to-neutral-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Play className="w-16 h-16 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Interactive Demo</h3>
              <p className="text-neutral-600">Experience the full dashboard in our interactive demo</p>
              <Button size="lg" className="mt-4">
                Launch Interactive Demo
              </Button>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </section>
  );
};