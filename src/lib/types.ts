/**
 * TypeScript Type Definitions
 * Centralized location for all application types and interfaces
 */

// Base Types
export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Status = 'idle' | 'loading' | 'success' | 'error';

// Component Props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
  'data-testid'?: string;
}

// Button Types
export interface ButtonProps extends BaseComponentProps {
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  asChild?: boolean;
}

// Input Types
export interface InputProps extends BaseComponentProps {
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number';
  placeholder?: string;
  label?: string;
  error?: string;
  helper?: string;
  required?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  autoComplete?: string;
  autoFocus?: boolean;
}

// Card Types
export interface CardProps extends BaseComponentProps {
  variant?: 'default' | 'elevated' | 'glass' | 'outline';
  padding?: Size;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  hoverable?: boolean;
}

// Modal Types
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: Size | 'full';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  initialFocus?: React.RefObject<HTMLElement>;
}

// Navigation Types
export interface NavLinkProps extends BaseComponentProps {
  href: string;
  active?: boolean;
  disabled?: boolean;
  external?: boolean;
  onClick?: () => void;
}

// Feature Types
export interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: string;
  image?: string;
  category?: string;
  highlighted?: boolean;
}

export interface FeatureSection {
  id: string;
  title: string;
  subtitle?: string;
  features: Feature[];
  layout?: 'grid' | 'list' | 'carousel';
  columns?: 2 | 3 | 4;
}

// Testimonial Types
export interface Author {
  name: string;
  title: string;
  company: string;
  avatar?: string;
}

export interface Testimonial {
  id: string;
  content: string;
  author: Author;
  rating?: number;
  featured?: boolean;
  date?: string;
}

export interface TestimonialSection {
  title: string;
  subtitle?: string;
  testimonials: Testimonial[];
  logos?: CompanyLogo[];
  stats?: Statistic[];
}

// Company Types
export interface CompanyLogo {
  src: string;
  alt: string;
  name: string;
  width?: number;
  height?: number;
}

export interface Statistic {
  label: string;
  value: string;
  description?: string;
}

// Pricing Types
export interface PricingFeature {
  name: string;
  included: boolean;
  description?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string | number;
  period: string;
  description: string;
  features: PricingFeature[];
  highlighted?: boolean;
  ctaText: string;
  ctaAction: () => void;
  badge?: string;
}

export interface PricingSection {
  title: string;
  subtitle?: string;
  plans: PricingPlan[];
  faq?: FAQ[];
}

// Integration Types
export interface Integration {
  id: string;
  name: string;
  logo: string;
  category: string;
  description: string;
  features: string[];
  documentation?: string;
  status?: 'available' | 'coming_soon' | 'beta';
}

export interface IntegrationSection {
  title: string;
  subtitle?: string;
  integrations: Integration[];
  categories: string[];
}

// Form Types
export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company: string;
  propertyCount?: number;
  message: string;
  consent: boolean;
}

export interface DemoRequestData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  propertyType: 'hotel' | 'vacation_rental' | 'bnb' | 'resort' | 'other';
  propertyCount: number;
  currentSoftware?: string;
  timeframe: 'immediate' | 'within_month' | 'within_quarter' | 'research';
  preferredDate?: string;
  preferredTime?: string;
}

export interface NewsletterData {
  email: string;
  firstName?: string;
  interests: string[];
}

// Dashboard Types
export interface DashboardContent {
  title: string;
  description: string;
  screenshots: Screenshot[];
  features: string[];
  interactiveDemo?: boolean;
}

export interface Screenshot {
  src: string;
  alt: string;
  caption?: string;
  hotspots?: Hotspot[];
}

export interface Hotspot {
  x: number;
  y: number;
  title: string;
  description: string;
}

// FAQ Types
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

// Animation Types
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number;
}

export interface ScrollAnimationConfig extends AnimationConfig {
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean;
}

// API Types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
  success: boolean;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: any;
}

// SEO Types
export interface SeoConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
}

// Performance Types
export interface PerformanceMetrics {
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte
}

// Error Types
export interface ErrorInfo {
  message: string;
  code?: string;
  status?: number;
  timestamp: Date;
  stack?: string;
  context?: Record<string, any>;
}

// Theme Types
export interface ThemeConfig {
  colors: Record<string, string>;
  fonts: Record<string, string>;
  spacing: Record<string, string>;
  shadows: Record<string, string>;
  borderRadius: Record<string, string>;
}

// Event Types
export type EventHandler<T = Event> = (event: T) => void;
export type KeyboardEventHandler = EventHandler<React.KeyboardEvent>;
export type MouseEventHandler = EventHandler<React.MouseEvent>;
export type FormEventHandler = EventHandler<React.FormEvent>;
export type ChangeEventHandler = EventHandler<React.ChangeEvent<HTMLInputElement>>;

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredNonNull<T> = { [P in keyof T]-?: NonNullable<T[P]> };
export type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };
export type Prettify<T> = { [K in keyof T]: T[K] } & {};

// Content Types
export interface SiteContent {
  hero: HeroContent;
  features: FeatureSection[];
  dashboard: DashboardContent;
  integrations: IntegrationSection;
  testimonials: TestimonialSection;
  pricing: PricingSection;
  contact: ContactSection;
  footer: FooterContent;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  primaryCTA: CTAButton;
  secondaryCTA?: CTAButton;
  backgroundImage?: string;
  backgroundVideo?: string;
  enableParallax?: boolean;
}

export interface CTAButton {
  text: string;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
}

export interface ContactSection {
  title: string;
  subtitle?: string;
  description?: string;
  form: ContactFormConfig;
  info: ContactInfo;
}

export interface ContactFormConfig {
  fields: FormField[];
  submitText: string;
  onSubmit: (data: ContactFormData) => Promise<void>;
}

export interface FormField {
  name: string;
  type: InputProps['type'];
  label: string;
  required?: boolean;
  placeholder?: string;
  validation?: ValidationRule[];
}

export interface ValidationRule {
  type: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern';
  value?: string | number;
  message: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  address?: Address;
  socialLinks?: SocialLink[];
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface SocialLink {
  platform: string;
  href: string;
  icon: React.ReactNode;
}

export interface FooterContent {
  logo: React.ReactNode;
  sections: FooterSection[];
  socialLinks: SocialLink[];
  copyright: string;
  legal?: FooterLink[];
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}