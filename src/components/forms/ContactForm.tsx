import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  validateContactForm, 
  getFieldError, 
  sanitizeInput,
  ValidationError 
} from '@/lib/validations';
import { ContactFormData } from '@/lib/types';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { Mail, Phone, Building, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

export interface ContactFormProps {
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'demo' | 'newsletter';
  onSubmit: (data: ContactFormData) => Promise<void>;
  className?: string;
}

// Property count options for the select dropdown
const propertyCountOptions = [
  { label: '1-5 properties', value: '1-5' },
  { label: '6-15 properties', value: '6-15' },
  { label: '16-50 properties', value: '16-50' },
  { label: '51-100 properties', value: '51-100' },
  { label: '100+ properties', value: '100+' },
];

// Animation variants
const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const ContactForm: React.FC<ContactFormProps> = ({
  title = 'Get in Touch',
  subtitle = 'Ready to transform your property management? Let\'s start the conversation.',
  variant = 'default',
  onSubmit,
  className,
}) => {
  // Form state
  const [formData, setFormData] = useState<Partial<ContactFormData>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    propertyCount: undefined,
    message: '',
    consent: false,
  });

  // UI state
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  // Handle input changes
  const handleInputChange = (field: keyof ContactFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? sanitizeInput(value) : value,
    }));

    // Clear field-specific errors when user starts typing
    if (errors.length > 0) {
      setErrors(prev => prev.filter(error => error.field !== field));
    }
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Validate form
    const validation = validateContactForm(formData);
    setErrors(validation.errors);

    if (!validation.isValid) {
      // Scroll to first error field
      const fieldName = validation.errors[0]?.field || '';
      const firstErrorField = document.getElementById(fieldName.toLowerCase().replace(/\s+/g, '-'));
      firstErrorField?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitStatus('idle');
      
      // Convert property count to number for submission
      const submitData: ContactFormData = {
        ...formData as ContactFormData,
        propertyCount: formData.propertyCount ? parseInt(String(formData.propertyCount)) : undefined,
      };

      await onSubmit(submitData);
      
      setSubmitStatus('success');
      setSubmitMessage('Thank you for your message! We\'ll get back to you within 24 hours.');
      
      // Reset form on successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        propertyCount: undefined,
        message: '',
        consent: false,
      });
      
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (submitStatus === 'success') {
    return (
      <motion.div
        className={cn(
          'max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-neutral-200',
          className
        )}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-neutral-900">Message Sent!</h3>
          <p className="text-neutral-600">{submitMessage}</p>
          <Button
            variant="outline"
            onClick={() => setSubmitStatus('idle')}
            className="mt-6"
          >
            Send Another Message
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn(
        'max-w-2xl mx-auto',
        className
      )}
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div className="text-center mb-8" variants={fieldVariants}>
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
          {title}
        </h2>
        {subtitle && (
          <p className="text-lg text-neutral-600 max-w-xl mx-auto">
            {subtitle}
          </p>
        )}
      </motion.div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg border border-neutral-200 space-y-6"
        variants={fieldVariants}
        noValidate
      >
        {/* Error Status */}
        {submitStatus === 'error' && (
          <motion.div
            className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-red-800">Submission Failed</h4>
              <p className="text-sm text-red-700">{submitMessage}</p>
            </div>
          </motion.div>
        )}

        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="first-name"
            label="First Name"
            placeholder="John"
            value={formData.firstName || ''}
            onChange={(value) => handleInputChange('firstName', value)}
            error={getFieldError(errors, 'First Name')}
            required
            leftIcon={<Mail className="w-4 h-4" />}
          />
          <Input
            id="last-name"
            label="Last Name"
            placeholder="Doe"
            value={formData.lastName || ''}
            onChange={(value) => handleInputChange('lastName', value)}
            error={getFieldError(errors, 'Last Name')}
            required
          />
        </div>

        {/* Contact Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="email"
            type="email"
            label="Email Address"
            placeholder="john.doe@example.com"
            value={formData.email || ''}
            onChange={(value) => handleInputChange('email', value)}
            error={getFieldError(errors, 'Email')}
            required
            leftIcon={<Mail className="w-4 h-4" />}
          />
          <Input
            id="phone"
            type="tel"
            label="Phone Number"
            placeholder="(555) 123-4567"
            value={formData.phone || ''}
            onChange={(value) => handleInputChange('phone', value)}
            error={getFieldError(errors, 'Phone')}
            leftIcon={<Phone className="w-4 h-4" />}
            helper="Optional, but helps us serve you better"
          />
        </div>

        {/* Company and Property Count */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="company"
            label="Company Name"
            placeholder="Your Property Management Company"
            value={formData.company || ''}
            onChange={(value) => handleInputChange('company', value)}
            error={getFieldError(errors, 'Company')}
            required
            leftIcon={<Building className="w-4 h-4" />}
          />
          <Select
            id="property-count"
            label="Number of Properties"
            placeholder="Select property count"
            options={propertyCountOptions}
            value={(formData.propertyCount as unknown as string) || ''}
            onChange={(e) => handleInputChange('propertyCount', e.target.value)}
            error={getFieldError(errors, 'Property Count')}
            helper="Helps us understand your needs"
          />
        </div>

        {/* Message */}
        <Textarea
          id="message"
          label="Message"
          placeholder="Tell us about your property management needs, current challenges, or any questions you have..."
          value={formData.message || ''}
          onChange={(e) => handleInputChange('message', e.target.value)}
          error={getFieldError(errors, 'Message')}
          required
          maxLength={1000}
          showCharCount
          size="lg"
          helper="Minimum 10 characters required"
        />

        {/* Consent Checkbox */}
        <Checkbox
          id="consent"
          label="I agree to receive communications from AmazePMS about their property management solutions. You can unsubscribe at any time."
          checked={formData.consent || false}
          onCheckedChange={(checked) => handleInputChange('consent', checked)}
          error={getFieldError(errors, 'Consent')}
          required
        />

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          loading={isSubmitting}
          disabled={isSubmitting}
          className="w-full"
          rightIcon={<MessageSquare className="w-5 h-5" />}
        >
          {isSubmitting ? 'Sending Message...' : 'Send Message'}
        </Button>

        {/* Privacy Note */}
        <p className="text-xs text-neutral-500 text-center">
          By submitting this form, you acknowledge that your information will be processed in accordance with our{' '}
          <a href="/privacy" className="text-primary-600 hover:underline">
            Privacy Policy
          </a>
          . We take your privacy seriously and will never share your information with third parties.
        </p>
      </motion.form>
    </motion.div>
  );
};

export default ContactForm;