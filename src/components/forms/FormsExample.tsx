import React from 'react';
import { ContactForm, DemoRequestForm, NewsletterForm } from './index';
import { ContactFormData, DemoRequestData, NewsletterData } from '@/lib/types';

/**
 * FormsExample - Comprehensive example showing all form components
 * 
 * This component demonstrates the usage of all three form components:
 * - ContactForm: General contact inquiries with validation
 * - DemoRequestForm: Detailed demo scheduling with business context
 * - NewsletterForm: Newsletter subscription with interests
 */
export const FormsExample: React.FC = () => {
  // Mock submission handlers (in real app, these would call API endpoints)
  const handleContactSubmit = async (data: ContactFormData) => {
    console.log('Contact form submitted:', data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In real app, send to contact API endpoint
    // const response = await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // });
    
    return Promise.resolve();
  };

  const handleDemoSubmit = async (data: DemoRequestData) => {
    console.log('Demo request submitted:', data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // In real app, send to demo scheduling API
    // const response = await fetch('/api/demo', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // });
    
    return Promise.resolve();
  };

  const handleNewsletterSubmit = async (data: NewsletterData) => {
    console.log('Newsletter subscription:', data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In real app, send to newsletter API
    // const response = await fetch('/api/newsletter', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // });
    
    return Promise.resolve();
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-neutral-900">
          AmazePMS Forms Collection
        </h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Comprehensive form components for contact, demo requests, and newsletter subscriptions.
          All forms include validation, error handling, and accessibility features.
        </p>
      </div>

      {/* Contact Form Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Contact Form</h2>
          <p className="text-neutral-600">
            Full-featured contact form with comprehensive validation and error handling
          </p>
        </div>
        
        <ContactForm
          title="Get in Touch"
          subtitle="Ready to transform your property management? Let's start the conversation."
          onSubmit={handleContactSubmit}
        />
      </section>

      {/* Demo Request Form Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Demo Request Form</h2>
          <p className="text-neutral-600">
            Detailed demo scheduling form with business context and preferences
          </p>
        </div>
        
        <DemoRequestForm
          title="Request a Demo"
          subtitle="See AmazePMS in action. Schedule a personalized demo tailored to your property management needs."
          onSubmit={handleDemoSubmit}
        />
      </section>

      {/* Newsletter Forms Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Newsletter Forms</h2>
          <p className="text-neutral-600">
            Multiple newsletter form variants for different use cases
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Section Variant */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">Section Variant</h3>
            <NewsletterForm
              title="Stay Updated"
              subtitle="Get the latest insights on property management trends and best practices."
              variant="section"
              showInterests={true}
              onSubmit={handleNewsletterSubmit}
            />
          </div>

          {/* Modal Variant */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">Modal Variant</h3>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <NewsletterForm
                title="Join Our Newsletter"
                subtitle="Stay informed about product updates and industry insights."
                variant="modal"
                onSubmit={handleNewsletterSubmit}
              />
            </div>
          </div>
        </div>

        {/* Inline Variant */}
        <div>
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">Inline Variant</h3>
          <div className="bg-primary-50 p-6 rounded-lg">
            <p className="text-neutral-700 mb-4">
              Subscribe to our newsletter for the latest property management insights:
            </p>
            <NewsletterForm
              variant="inline"
              onSubmit={handleNewsletterSubmit}
            />
          </div>
        </div>
      </section>

      {/* Integration Examples */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Integration Guide</h2>
          <p className="text-neutral-600">
            How to integrate these forms into your application
          </p>
        </div>

        <div className="bg-neutral-900 text-white p-6 rounded-lg overflow-x-auto">
          <h3 className="text-lg font-semibold mb-4">Usage Example</h3>
          <pre className="text-sm">
{`import { ContactForm, DemoRequestForm, NewsletterForm } from '@/components/forms';

// Basic usage
<ContactForm onSubmit={handleContactSubmit} />

// With custom props
<DemoRequestForm 
  title="Schedule Your Demo"
  subtitle="See our platform in action"
  onSubmit={handleDemoSubmit}
/>

// Newsletter variants
<NewsletterForm variant="inline" onSubmit={handleNewsletterSubmit} />
<NewsletterForm variant="modal" showInterests={true} onSubmit={handleNewsletterSubmit} />
<NewsletterForm variant="section" showInterests={true} onSubmit={handleNewsletterSubmit} />`}
          </pre>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border border-neutral-200">
            <h4 className="font-semibold text-neutral-900 mb-2">Features</h4>
            <ul className="text-sm text-neutral-600 space-y-1">
              <li>• Comprehensive form validation</li>
              <li>• TypeScript interfaces</li>
              <li>• Accessibility compliance</li>
              <li>• Error handling & success states</li>
              <li>• Loading states with animations</li>
              <li>• Responsive design</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border border-neutral-200">
            <h4 className="font-semibold text-neutral-900 mb-2">Validation</h4>
            <ul className="text-sm text-neutral-600 space-y-1">
              <li>• Required field validation</li>
              <li>• Email format validation</li>
              <li>• Phone number validation</li>
              <li>• Message length limits</li>
              <li>• Input sanitization</li>
              <li>• Real-time error clearing</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border border-neutral-200">
            <h4 className="font-semibold text-neutral-900 mb-2">Accessibility</h4>
            <ul className="text-sm text-neutral-600 space-y-1">
              <li>• Proper form labels</li>
              <li>• ARIA attributes</li>
              <li>• Keyboard navigation</li>
              <li>• Screen reader support</li>
              <li>• Error announcements</li>
              <li>• Focus management</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FormsExample;