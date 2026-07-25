'use client';

import React from 'react';
import { 
  Button, 
  Input, 
  Badge, 
  Avatar, 
  Card, 
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Modal,
  ModalHeader,
  ModalTitle,
  ModalContent,
  ModalFooter,
  NavLink,
  FeatureCard
} from '@/components/ui';
import { Header, Footer } from '@/components/layout';
import { 
  Star, 
  Users, 
  Calendar, 
  BarChart3, 
  Shield, 
  Zap,
  TrendingUp 
} from 'lucide-react';

export function Phase2Demo() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <Header variant="transparent" showCTA={true} />

      {/* Main Content */}
      <main className="container-section py-20">
        <div className="space-y-16">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">
              Phase 2: UI Components Demo
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Showcasing all the atomic and molecular components built for the AmazePMS website redesign.
            </p>
          </div>

          {/* Buttons */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-neutral-900">Buttons</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="glass">Glass Button</Button>
              <Button variant="primary" loading>Loading...</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </div>
          </section>

          {/* Inputs */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-neutral-900">Inputs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
              <Input 
                label="Email Address" 
                type="email" 
                placeholder="Enter your email"
              />
              <Input 
                label="Password" 
                type="password" 
                placeholder="Enter your password"
              />
              <Input 
                label="Phone Number" 
                type="tel" 
                placeholder="+1 (555) 123-4567"
                helper="We'll never share your phone number"
              />
              <Input 
                label="Company Website" 
                type="url" 
                placeholder="https://example.com"
                error="Please enter a valid URL"
              />
            </div>
          </section>

          {/* Badges and Avatars */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-neutral-900">Badges & Avatars</h2>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
              </div>
              <div className="flex items-center gap-4">
                <Avatar size="sm" src="/api/placeholder/32/32" alt="User" />
                <Avatar size="md" src="/api/placeholder/40/40" alt="User" />
                <Avatar size="lg" src="/api/placeholder/48/48" alt="User" />
                <Avatar size="xl" fallback="JD" />
              </div>
            </div>
          </section>

          {/* Cards */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-neutral-900">Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card variant="default">
                <CardHeader>
                  <CardTitle>Default Card</CardTitle>
                  <CardDescription>A simple card with default styling</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600">
                    This is the content of a default card component with standard shadow and padding.
                  </p>
                </CardContent>
              </Card>

              <Card variant="elevated" hoverable>
                <CardHeader>
                  <CardTitle>Elevated Card</CardTitle>
                  <CardDescription>Card with enhanced shadow</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600">
                    This elevated card has a more prominent shadow and hover effects.
                  </p>
                </CardContent>
              </Card>

              <Card variant="glass">
                <CardHeader>
                  <CardTitle>Glass Card</CardTitle>
                  <CardDescription>Glassmorphism effect</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600">
                    This card uses glassmorphism with backdrop blur effects.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Feature Cards */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-neutral-900">Feature Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                icon={<Calendar className="h-6 w-6" />}
                title="Reservation Management"
                description="Streamline your booking process with our intuitive reservation system"
                link={{
                  text: "Learn More",
                  href: "/features/reservations"
                }}
              />
              <FeatureCard
                variant="highlighted"
                icon={<BarChart3 className="h-6 w-6" />}
                title="Analytics Dashboard"
                description="Get insights into your property performance with detailed analytics"
                link={{
                  text: "View Demo",
                  href: "/demo/analytics"
                }}
              />
              <FeatureCard
                icon={<Shield className="h-6 w-6" />}
                title="Secure Payments"
                description="Process payments safely with our PCI-compliant payment system"
                link={{
                  text: "Security Info",
                  href: "/security"
                }}
              />
            </div>
          </section>

          {/* Navigation Links */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-neutral-900">Navigation Links</h2>
            <div className="flex flex-wrap gap-4">
              <NavLink href="/features" variant="default">Features</NavLink>
              <NavLink href="/pricing" variant="primary" active>Pricing</NavLink>
              <NavLink href="/contact" variant="ghost">Contact</NavLink>
              <NavLink href="/docs" variant="underline">Documentation</NavLink>
              <NavLink href="https://github.com" external>GitHub</NavLink>
            </div>
          </section>

          {/* Modal Demo */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-neutral-900">Modal</h2>
            <div>
              <Button onClick={() => setIsModalOpen(true)}>
                Open Modal
              </Button>
              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Demo Modal"
                size="md"
              >
                <ModalHeader>
                  <ModalTitle>Welcome to AmazePMS</ModalTitle>
                </ModalHeader>
                <ModalContent>
                  <p className="text-neutral-600 mb-4">
                    This is a demo modal showcasing the modal component with proper focus management, 
                    keyboard navigation, and accessibility features.
                  </p>
                  <div className="space-y-3">
                    <Input label="Your Name" placeholder="Enter your name" />
                    <Input label="Your Email" type="email" placeholder="Enter your email" />
                  </div>
                </ModalContent>
                <ModalFooter>
                  <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsModalOpen(false)}>
                    Submit
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          </section>

          {/* Component Status */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-neutral-900">Phase 2 Completion Status</h2>
            
            {/* Animation Demo Button */}
            <div className="mb-6 space-y-4">
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => window.open('/animation-demo', '_blank')}
              >
                <Zap className="h-5 w-5 mr-2" />
                View Basic Animation System Demo
              </Button>
              
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => window.open('/scroll-animation-demo', '_blank')}
              >
                <TrendingUp className="h-5 w-5 mr-2" />
                View Complex Scroll Animation Demo (Task 13.1)
              </Button>
            </div>
            
            <Card variant="elevated" className="max-w-4xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary-600" />
                  All Phase 2 Components Completed
                </CardTitle>
                <CardDescription>
                  Atomic and molecular components are ready for Phase 3 sections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-neutral-900">Atomic Components (Atoms)</h4>
                    <div className="space-y-1 text-sm text-neutral-600">
                      <div className="flex items-center justify-between">
                        <span>• Button with variants</span>
                        <Badge variant="success" size="sm">✓</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>• Input with validation</span>
                        <Badge variant="success" size="sm">✓</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>• Badge component</span>
                        <Badge variant="success" size="sm">✓</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>• Avatar component</span>
                        <Badge variant="success" size="sm">✓</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>• Icon component</span>
                        <Badge variant="success" size="sm">✓</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-neutral-900">Molecular Components (Molecules)</h4>
                    <div className="space-y-1 text-sm text-neutral-600">
                      <div className="flex items-center justify-between">
                        <span>• Card with glassmorphism</span>
                        <Badge variant="success" size="sm">✓</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>• Modal with accessibility</span>
                        <Badge variant="success" size="sm">✓</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>• Navigation Link</span>
                        <Badge variant="success" size="sm">✓</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>• Feature Card</span>
                        <Badge variant="success" size="sm">✓</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>• Header & Footer</span>
                        <Badge variant="success" size="sm">✓</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}