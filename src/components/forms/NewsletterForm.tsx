import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  validateNewsletterForm, 
  getFieldError, 
  sanitizeInput,
  ValidationError 
} from '@/lib/validations';
import { NewsletterData } from '@/lib/types';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { Mail, CheckCircle, AlertCircle, Send } from 'lucide-react';

export interface NewsletterFormProps {
  title?: string;
  subtitle?: string;
  variant?: 'inline' | 'modal' | 'section';
  showInterests?: boolean;
  onSubmit: (data: NewsletterData) => Promise<void>;
  className?: string;
}

// Interest options for newsletter
const interestOptions = [
  { id: 'product_updates', label: 'Product Updates & New Features' },
  { id: 'industry_insights', label: 'Industry Insights & Trends' },
  { id: 'best_practices', label: 'Best Practices & Tips' },
  { id: 'events_webinars', label: 'Events & Webinars' },
  { id: 'case_studies', label: 'Customer Success Stories' },
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

const NewsletterForm: React.FC<NewsletterFormProps> = ({
  title = 'Stay Updated',
  subtitle = 'Get the latest insights on property management trends, product updates, and industry best practices.',
  variant = 'section',
  showInterests = false,
  onSubmit,
  className,
}) => {
  // Form state
  const [formData, setFormData] = useState<Partial<NewsletterData>>({
    email: '',
    firstName: '',
    interests: [],
  });

  // UI state
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  // Handle input changes
  const handleInputChange = (field: keyof NewsletterData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? sanitizeInput(value) : value,
    }));

    // Clear field-specific errors when user starts typing
    if (errors.length > 0) {
      setErrors(prev => prev.filter(error => error.field !== field));
    }
  };

  // Handle interest selection
  const handleInterestChange = (interestId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      interests: checked
        ? [...(prev.interests || []), interestId]
        : (prev.interests || []).filter(id => id !== interestId),
    }));
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Validate form
    const validation = validateNewsletterForm(formData);
    setErrors(validation.errors);

    if (!validation.isValid) {
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitStatus('idle');
      
      const submitData: NewsletterData = {
        email: formData.email || '',
        firstName: formData.firstName || undefined,
        interests: formData.interests || [],
      };

      await onSubmit(submitData);
      
      setSubmitStatus('success');
      setSubmitMessage('Welcome aboard! You\'ll receive our next newsletter soon.');
      
      // Reset form on successful submission
      setFormData({
        email: '',
        firstName: '',
        interests: [],
      });
      
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Subscription failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get container styling based on variant
  const getContainerClass = () => {
    switch (variant) {
      case 'inline':
        return 'flex flex-col sm:flex-row items-end gap-3';
      case 'modal':
        return 'space-y-4';
      case 'section':
      default:
        return 'max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg border border-neutral-200 space-y-4';
    }
  };

  // Success state
  if (submitStatus === 'success') {
    return (
      <motion.div
        className={cn(
          variant === 'section' ? 'max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg border border-neutral-200' : '',
          className
        )}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900">You're Subscribed!</h3>
          <p className="text-sm text-neutral-600">{submitMessage}</p>
          {variant === 'section' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSubmitStatus('idle')}
              className="mt-4"
            >
              Subscribe Another Email
            </Button>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn(getContainerClass(), className)}
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header - only show for section variant */}
      {variant === 'section' && (
        <motion.div className="text-center mb-4" variants={fieldVariants}>
          <h3 className="text-xl font-bold text-neutral-900 mb-2">{title}</h3>
          {subtitle && (
            <p className="text-sm text-neutral-600">{subtitle}</p>
          )}
        </motion.div>
      )}

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className={cn(
          variant === 'inline' ? 'flex-1 flex flex-col sm:flex-row items-end gap-3' : 'space-y-4'
        )}
        variants={fieldVariants}
        noValidate
      >
        {/* Error Status */}
        {submitStatus === 'error' && variant !== 'inline' && (
          <motion.div
            className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-red-700">{submitMessage}</p>
            </div>
          </motion.div>
        )}

        {/* First Name - optional and only for section/modal variants */}
        {variant !== 'inline' && (
          <Input
            id="newsletter-first-name"
            label="First Name"
            placeholder="John"
            value={formData.firstName || ''}
            onChange={(value) => handleInputChange('firstName', value)}
            helper="Optional, helps us personalize your experience"
          />
        )}

        {/* Email Field */}
        <div className={variant === 'inline' ? 'flex-1' : ''}>
          <Input
            id="newsletter-email"
            type="email"
            label={variant === 'inline' ? undefined : 'Email Address'}
            placeholder="your@email.com"
            value={formData.email || ''}
            onChange={(value) => handleInputChange('email', value)}
            error={getFieldError(errors, 'Email')}
            required
            leftIcon={<Mail className="w-4 h-4" />}
          />
        </div>

        {/* Interests - only for section variant when showInterests is true */}
        {variant === 'section' && showInterests && (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-neutral-700">
              What interests you? (Optional)
            </label>
            <div className="space-y-2">
              {interestOptions.map((interest) => (
                <Checkbox
                  key={interest.id}
                  id={`interest-${interest.id}`}
                  label={interest.label}
                  checked={(formData.interests || []).includes(interest.id)}
                  onCheckedChange={(checked) => handleInterestChange(interest.id, checked)}
                  size="sm"
                />
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          size={variant === 'inline' ? 'md' : 'sm'}
          loading={isSubmitting}
          disabled={isSubmitting}
          className={variant === 'inline' ? 'shrink-0' : 'w-full'}
          rightIcon={<Send className="w-4 h-4" />}
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </Button>

        {/* Privacy Note - only for section variant */}
        {variant === 'section' && (
          <p className="text-xs text-neutral-500 text-center">
            We respect your privacy. Unsubscribe at any time.
          </p>
        )}
      </motion.form>

      {/* Error for inline variant */}
      {submitStatus === 'error' && variant === 'inline' && (
        <motion.p
          className="text-xs text-red-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {submitMessage}
        </motion.p>
      )}
    </motion.div>
  );
};

export default NewsletterForm;