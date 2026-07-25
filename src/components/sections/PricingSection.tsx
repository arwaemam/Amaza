'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { fadeInUp, staggerChildren } from '@/lib/animations';
import {
  Check,
  X,
  Star,
  Zap,
  Crown,
  ArrowRight,
  Users,
  Building,
  Globe,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

// Pricing plan interface from design document
export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaText: string;
  ctaAction: () => void;
}

export interface PricingSectionProps {
  title?: string;
  subtitle?: string;
  plans?: PricingPlan[];
  className?: string;
}

// Default pricing data - based on AmazePMS hospitality focus
const defaultPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: "$29",
    period: "per property/month",
    description: "Perfect for small B&Bs and vacation rentals starting their journey",
    features: [
      "Up to 10 rooms/units",
      "Basic reservation management",
      "Guest communication",
      "Channel manager (2 channels)",
      "Payment processing",
      "Basic reporting",
      "Email support",
      "Mobile app access"
    ],
    ctaText: "Start Free Trial",
    ctaAction: () => console.log('Starter plan selected')
  },
  {
    name: "Professional",
    price: "$79",
    period: "per property/month",
    description: "The most popular choice for growing hospitality businesses",
    features: [
      "Up to 50 rooms/units",
      "Advanced reservation system",
      "Multi-channel distribution",
      "Channel manager (10+ channels)",
      "Revenue management tools",
      "Guest experience automation",
      "Advanced analytics & reports",
      "Priority phone & chat support",
      "Staff management tools",
      "Custom integrations",
      "API access",
      "White-label booking engine"
    ],
    highlighted: true,
    ctaText: "Start Free Trial",
    ctaAction: () => console.log('Professional plan selected')
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact for pricing",
    description: "Comprehensive solution for hotel chains and large properties",
    features: [
      "Unlimited rooms/units",
      "Multi-property management",
      "Enterprise integrations",
      "Custom workflow automation",
      "Advanced revenue optimization",
      "Dedicated account manager",
      "24/7 priority support",
      "Custom training & onboarding",
      "SLA guarantees",
      "Advanced security & compliance",
      "Custom reporting & analytics",
      "White-label solutions",
      "API priority access",
      "Custom development"
    ],
    ctaText: "Contact Sales",
    ctaAction: () => console.log('Enterprise plan selected')
  }
];

// Feature comparison data
const featureComparison = [
  {
    category: "Property Management",
    features: [
      { name: "Rooms/Units", starter: "Up to 10", professional: "Up to 50", enterprise: "Unlimited" },
      { name: "Properties", starter: "1", professional: "1", enterprise: "Unlimited" },
      { name: "Reservation Management", starter: true, professional: true, enterprise: true },
      { name: "Multi-Property Dashboard", starter: false, professional: false, enterprise: true }
    ]
  },
  {
    category: "Distribution & Channels",
    features: [
      { name: "Channel Manager", starter: "2 channels", professional: "10+ channels", enterprise: "Unlimited" },
      { name: "Direct Booking Engine", starter: true, professional: true, enterprise: true },
      { name: "White-Label Solutions", starter: false, professional: true, enterprise: true },
      { name: "API Access", starter: false, professional: true, enterprise: true }
    ]
  },
  {
    category: "Support & Training",
    features: [
      { name: "Email Support", starter: true, professional: true, enterprise: true },
      { name: "Phone & Chat Support", starter: false, professional: true, enterprise: true },
      { name: "Dedicated Account Manager", starter: false, professional: false, enterprise: true },
      { name: "24/7 Priority Support", starter: false, professional: false, enterprise: true }
    ]
  }
];

export const PricingSection: React.FC<PricingSectionProps> = ({
  title = "Choose Your Perfect Plan",
  subtitle = "Flexible pricing designed to grow with your hospitality business",
  plans = defaultPlans,
  className = ""
}) => {
  const [showComparison, setShowComparison] = React.useState(false);
  const [isAnnual, setIsAnnual] = React.useState(false);
  const router = useRouter();

  const getDisplayPrice = (priceStr: string, isAnnual: boolean) => {
    if (priceStr === "Custom") return priceStr;
    if (!isAnnual) return priceStr;

    const match = priceStr.match(/\$(\d+)/);
    if (match && match[1]) {
      const num = parseInt(match[1]);
      return `$${Math.round(num * 0.8)}`;
    }
    return priceStr;
  };

  // Render feature value in comparison table
  const renderFeatureValue = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-success-600 mx-auto" />
      ) : (
        <X className="w-5 h-5 text-neutral-400 mx-auto" />
      );
    }
    return <span className="text-sm text-neutral-700 text-center">{value}</span>;
  };

  // Get plan icon based on name
  const getPlanIcon = (planName: string) => {
    switch (planName.toLowerCase()) {
      case 'starter':
        return <Users className="w-6 h-6" />;
      case 'professional':
        return <Building className="w-6 h-6" />;
      case 'enterprise':
        return <Globe className="w-6 h-6" />;
      default:
        return <Star className="w-6 h-6" />;
    }
  };

  return (
    <section className={cn("animate-section py-24 bg-gradient-to-br from-neutral-50 via-white to-primary-50/30", className)}>
      <div className="container-section">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-16"
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeInUp} className="mb-4">
            <Badge variant="primary" size="lg" className="px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              Transparent Pricing
            </Badge>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6"
          >
            {title}
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-neutral-600 mb-8"
          >
            {subtitle}
          </motion.p>

          {/* Annual/Monthly Toggle */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <span className={cn("text-sm font-medium", !isAnnual && "text-neutral-900", isAnnual && "text-neutral-500")}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                isAnnual ? "bg-primary-600" : "bg-neutral-200"
              )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  isAnnual ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
            <span className={cn("text-sm font-medium", isAnnual && "text-neutral-900", !isAnnual && "text-neutral-500")}>
              Annual
            </span>
            {isAnnual && (
              <Badge variant="success" size="sm" className="ml-2">
                Save 20%
              </Badge>
            )}
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              variants={fadeInUp}
              whileHover="hover"
              className="relative"
            >
              <Card
                className={cn(
                  "animate-card relative h-full border transition-all duration-300",
                  plan.highlighted
                    ? "border-primary-300 shadow-lg ring-2 ring-primary-200 scale-105 z-10"
                    : "border-neutral-200 hover:border-primary-200 hover:shadow-md"
                )}
                enableHover
                hoverable
                padding="lg"
              >
                {/* Popular Badge */}
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge variant="primary" size="lg" className="px-4 py-2 shadow-sm">
                      <Crown className="w-4 h-4 mr-2 fill-current" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center mb-4">
                    <div className={cn(
                      "p-3 rounded-full",
                      plan.highlighted ? "bg-primary-100 text-primary-600" : "bg-neutral-100 text-neutral-600"
                    )}>
                      {getPlanIcon(plan.name)}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                    {plan.name}
                  </h3>

                  <p className="text-neutral-600 mb-6">
                    {plan.description}
                  </p>

                  {/* Pricing */}
                  <div className="mb-6">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-neutral-900">
                        {getDisplayPrice(plan.price, isAnnual)}
                      </span>
                      {plan.price !== "Custom" && (
                        <span className="text-neutral-600 text-lg">
                          /{isAnnual ? "year" : "month"}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-neutral-500 mt-1">
                      {plan.period}
                    </p>
                    {isAnnual && plan.price !== "Custom" && (
                      <p className="text-sm text-success-600 font-medium mt-1">
                        Save 20% with annual billing
                      </p>
                    )}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
                      <span className="text-neutral-700 text-sm leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  size="lg"
                  variant={plan.highlighted ? "primary" : "outline"}
                  className="w-full group"
                  onClick={() => router.push('/contact')}
                >
                  {plan.ctaText}
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Comparison Toggle */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Button
            variant="ghost"
            size="lg"
            onClick={() => setShowComparison(!showComparison)}
            className="group"
          >
            {showComparison ? "Hide" : "Show"} Detailed Comparison
            {showComparison ? (
              <ChevronUp className="w-5 h-5 ml-2 transition-transform group-hover:-translate-y-1" />
            ) : (
              <ChevronDown className="w-5 h-5 ml-2 transition-transform group-hover:translate-y-1" />
            )}
          </Button>
        </motion.div>

        {/* Feature Comparison Table */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: showComparison ? "auto" : 0,
            opacity: showComparison ? 1 : 0
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-soft p-8">
            <h3 className="text-2xl font-bold text-center text-neutral-900 mb-8">
              Feature Comparison
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-4 pr-8">
                      <span className="text-lg font-semibold text-neutral-900">Features</span>
                    </th>
                    {plans.map((plan) => (
                      <th key={plan.name} className="text-center py-4 px-4 min-w-[140px]">
                        <div className="flex flex-col items-center">
                          <span className="text-lg font-semibold text-neutral-900 mb-1">
                            {plan.name}
                          </span>
                          <span className="text-sm text-neutral-600">
                            {plan.price}{plan.price !== "Custom" && `/${isAnnual ? "year" : "month"}`}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {featureComparison.map((category, categoryIndex) => (
                    <React.Fragment key={category.category}>
                      <tr>
                        <td colSpan={plans.length + 1} className="py-6">
                          <h4 className="text-lg font-semibold text-neutral-900 border-b border-neutral-100 pb-2">
                            {category.category}
                          </h4>
                        </td>
                      </tr>
                      {category.features.map((feature, featureIndex) => (
                        <tr key={featureIndex} className="border-b border-neutral-50">
                          <td className="py-3 pr-8">
                            <span className="text-neutral-700 font-medium">
                              {feature.name}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            {renderFeatureValue(feature.starter)}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {renderFeatureValue(feature.professional)}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {renderFeatureValue(feature.enterprise)}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          className="text-center mt-16 p-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl text-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Transform Your Property Management?
          </h3>
          <p className="text-lg text-primary-100 mb-6 max-w-2xl mx-auto">
            Join 10,000+ hospitality professionals who trust AmazePMS to streamline their operations and boost revenue.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="xl"
              variant="secondary"
              className="bg-white text-primary-900 hover:bg-neutral-50"
              onClick={() => router.push('/contact')}
            >
              Start Free Trial
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="border-primary-700 text-white hover:bg-primary-800"
              onClick={() => router.push('/contact')}
            >
              Contact Sales
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};