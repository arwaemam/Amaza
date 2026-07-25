import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  validateDemoRequestForm, 
  getFieldError, 
  sanitizeInput,
  ValidationError 
} from '@/lib/validations';
import { DemoRequestData } from '@/lib/types';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { 
  Mail, 
  Phone, 
  Building, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Play
} from 'lucide-react';

export interface DemoRequestFormProps {
  title?: string;
  subtitle?: string;
  onSubmit: (data: DemoRequestData) => Promise<void>;
  className?: string;
}

// Property type options
const propertyTypeOptions = [
  { label: 'Hotel', value: 'hotel' },
  { label: 'Vacation Rental', value: 'vacation_rental' },
  { label: 'Bed & Breakfast', value: 'bnb' },
  { label: 'Resort', value: 'resort' },
  { label: 'Other', value: 'other' },
];

// Property count options
const propertyCountOptions = [
  { label: '1-5', value: '1' },
  { label: '6-15', value: '10' },
  { label: '16-50', value: '25' },
  { label: '51-100', value: '75' },
  { label: '100+', value: '100' },
];

// Timeframe options
const timeframeOptions = [
  { label: 'Immediate (within 2 weeks)', value: 'immediate' },
  { label: 'Within 1 month', value: 'within_month' },
  { label: 'Within 3 months', value: 'within_quarter' },
  { label: 'Just researching', value: 'research' },
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

const DemoRequestForm: React.FC<DemoRequestFormProps> = ({
  title = 'Request a Demo',
  subtitle = 'See AmazePMS in action. Schedule a personalized demo tailored to your property management needs.',
  onSubmit,
  className,
}) => {
  // Form state
  const [formData, setFormData] = useState<Partial<DemoRequestData>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    propertyType: undefined,
    propertyCount: 0,
    currentSoftware: '',
    timeframe: undefined,
    preferredDate: '',
    preferredTime: '',
  });

  // UI state
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  // Handle input changes
  const handleInputChange = (field: keyof DemoRequestData, value: any) => {
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
    const validation = validateDemoRequestForm(formData);
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
      const submitData: DemoRequestData = {
        ...formData as DemoRequestData,
        propertyCount: Number(formData.propertyCount),
      };

      await onSubmit(submitData);
      
      setSubmitStatus('success');
      setSubmitMessage('Demo request submitted! Our team will contact you within 24 hours to schedule your personalized demo.');
      
      // Reset form on successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        propertyType: undefined,
        propertyCount: 0,
        currentSoftware: '',
        timeframe: undefined,
        preferredDate: '',
        preferredTime: '',
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
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-primary-600" />
          </div>
          <h3 className="text-2xl font-bold text-neutral-900">Demo Scheduled!</h3>
          <p className="text-neutral-600">{submitMessage}</p>
          <div className="space-y-2 text-sm text-neutral-500">
            <p>What happens next:</p>
            <ul className="space-y-1">
              <li>• Our team will review your requirements</li>
              <li>• We'll contact you to confirm the demo time</li>
              <li>• You'll receive a calendar invite with demo details</li>
            </ul>
          </div>
          <Button
            variant="outline"
            onClick={() => setSubmitStatus('idle')}
            className="mt-6"
          >
            Request Another Demo
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

        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-neutral-900 border-b pb-2">
            Personal Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              id="first-name"
              label="First Name"
              placeholder="John"
              value={formData.firstName || ''}
              onChange={(value) => handleInputChange('firstName', value)}
              error={getFieldError(errors, 'First Name')}
              required
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
              required
              leftIcon={<Phone className="w-4 h-4" />}
            />
          </div>
        </div>

        {/* Business Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-neutral-900 border-b pb-2">
            Business Information
          </h3>
          
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              id="property-type"
              label="Property Type"
              placeholder="Select property type"
              options={propertyTypeOptions}
              value={formData.propertyType || ''}
              onChange={(e) => handleInputChange('propertyType', e.target.value)}
              error={getFieldError(errors, 'Property Type')}
              required
            />
            <Select
              id="property-count"
              label="Number of Properties"
              placeholder="Select count"
              options={propertyCountOptions}
              value={String(formData.propertyCount) || ''}
              onChange={(e) => handleInputChange('propertyCount', Number(e.target.value))}
              error={getFieldError(errors, 'Property Count')}
              required
            />
          </div>

          <Input
            id="current-software"
            label="Current Software"
            placeholder="What system are you currently using? (optional)"
            value={formData.currentSoftware || ''}
            onChange={(value) => handleInputChange('currentSoftware', value)}
            helper="Helps us customize the demo to your needs"
          />
        </div>

        {/* Demo Preferences */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-neutral-900 border-b pb-2">
            Demo Preferences
          </h3>
          
          <Select
            id="timeframe"
            label="Implementation Timeframe"
            placeholder="When are you looking to implement?"
            options={timeframeOptions}
            value={formData.timeframe || ''}
            onChange={(e) => handleInputChange('timeframe', e.target.value)}
            error={getFieldError(errors, 'Timeframe')}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              id="preferred-date"
              type="date"
              label="Preferred Demo Date"
              value={formData.preferredDate || ''}
              onChange={(value) => handleInputChange('preferredDate', value)}
              leftIcon={<Calendar className="w-4 h-4" />}
              helper="We'll do our best to accommodate"
            />
            <Input
              id="preferred-time"
              type="time"
              label="Preferred Time"
              value={formData.preferredTime || ''}
              onChange={(value) => handleInputChange('preferredTime', value)}
              leftIcon={<Clock className="w-4 h-4" />}
              helper="Your local timezone"
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          loading={isSubmitting}
          disabled={isSubmitting}
          className="w-full"
          rightIcon={<Play className="w-5 h-5" />}
        >
          {isSubmitting ? 'Scheduling Demo...' : 'Schedule My Demo'}
        </Button>

        {/* Privacy Note */}
        <p className="text-xs text-neutral-500 text-center">
          By submitting this form, you agree to receive communications about your demo and AmazePMS solutions. 
          Your information is secure and will not be shared with third parties.
        </p>
      </motion.form>
    </motion.div>
  );
};

export default DemoRequestForm;