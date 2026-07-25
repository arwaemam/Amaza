import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PricingSection, PricingPlan } from './PricingSection';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
}));

const mockPlans: PricingPlan[] = [
  {
    name: "Basic",
    price: "$19",
    period: "per month",
    description: "Perfect for small properties",
    features: ["Up to 5 rooms", "Basic support"],
    ctaText: "Get Started",
    ctaAction: jest.fn()
  },
  {
    name: "Pro",
    price: "$49", 
    period: "per month",
    description: "For growing businesses",
    features: ["Up to 20 rooms", "Priority support", "Advanced analytics"],
    highlighted: true,
    ctaText: "Start Trial",
    ctaAction: jest.fn()
  }
];

describe('PricingSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default props', () => {
    render(<PricingSection />);
    
    expect(screen.getByText('Choose Your Perfect Plan')).toBeInTheDocument();
    expect(screen.getByText('Flexible pricing designed to grow with your hospitality business')).toBeInTheDocument();
  });

  it('renders custom title and subtitle', () => {
    const customTitle = "Custom Pricing Title";
    const customSubtitle = "Custom pricing subtitle";
    
    render(
      <PricingSection 
        title={customTitle}
        subtitle={customSubtitle}
      />
    );
    
    expect(screen.getByText(customTitle)).toBeInTheDocument();
    expect(screen.getByText(customSubtitle)).toBeInTheDocument();
  });

  it('renders all default pricing plans', () => {
    render(<PricingSection />);
    
    // Check that all default plans are rendered
    expect(screen.getByText('Starter')).toBeInTheDocument();
    expect(screen.getByText('Professional')).toBeInTheDocument(); 
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
  });

  it('renders custom pricing plans', () => {
    render(<PricingSection plans={mockPlans} />);
    
    expect(screen.getByText('Basic')).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByText('$19')).toBeInTheDocument();
    expect(screen.getByText('$49')).toBeInTheDocument();
  });

  it('displays popular badge for highlighted plans', () => {
    render(<PricingSection plans={mockPlans} />);
    
    expect(screen.getByText('Most Popular')).toBeInTheDocument();
  });

  it('renders plan features correctly', () => {
    render(<PricingSection plans={mockPlans} />);
    
    expect(screen.getByText('Up to 5 rooms')).toBeInTheDocument();
    expect(screen.getByText('Basic support')).toBeInTheDocument();
    expect(screen.getByText('Up to 20 rooms')).toBeInTheDocument();
    expect(screen.getByText('Priority support')).toBeInTheDocument();
    expect(screen.getByText('Advanced analytics')).toBeInTheDocument();
  });

  it('calls plan action when CTA button is clicked', () => {
    render(<PricingSection plans={mockPlans} />);
    
    const basicButton = screen.getByRole('button', { name: /get started/i });
    const proButton = screen.getByRole('button', { name: /start trial/i });
    
    fireEvent.click(basicButton);
    fireEvent.click(proButton);
    
    expect(mockPlans[0].ctaAction).toHaveBeenCalledTimes(1);
    expect(mockPlans[1].ctaAction).toHaveBeenCalledTimes(1);
  });

  it('toggles annual/monthly pricing', () => {
    render(<PricingSection />);
    
    const toggle = screen.getByRole('button');
    
    // Should start in monthly mode
    expect(screen.getByText('Monthly')).toHaveClass('text-neutral-900');
    
    // Click to switch to annual
    fireEvent.click(toggle);
    
    // Should now be in annual mode and show save badge
    expect(screen.getByText('Save 20%')).toBeInTheDocument();
  });

  it('toggles feature comparison table', async () => {
    render(<PricingSection />);
    
    const comparisonButton = screen.getByRole('button', { name: /show detailed comparison/i });
    
    // Initially, comparison should be hidden
    expect(screen.queryByText('Feature Comparison')).not.toBeInTheDocument();
    
    // Click to show comparison
    fireEvent.click(comparisonButton);
    
    // Should show comparison table
    await waitFor(() => {
      expect(screen.getByText('Feature Comparison')).toBeInTheDocument();
    });
    
    // Button text should change
    expect(screen.getByRole('button', { name: /hide detailed comparison/i })).toBeInTheDocument();
  });

  it('renders bottom CTA section', () => {
    render(<PricingSection />);
    
    expect(screen.getByText('Ready to Transform Your Property Management?')).toBeInTheDocument();
    expect(screen.getByText('Start 14-Day Free Trial')).toBeInTheDocument();
    expect(screen.getByText('Schedule a Demo')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<PricingSection className="custom-class" />);
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('handles empty plans array', () => {
    render(<PricingSection plans={[]} />);
    
    // Should still render the section header and other elements
    expect(screen.getByText('Choose Your Perfect Plan')).toBeInTheDocument();
    
    // But no pricing cards
    expect(screen.queryByText('Starter')).not.toBeInTheDocument();
  });

  it('renders pricing with proper structure', () => {
    render(<PricingSection />);
    
    // Check for key structural elements
    expect(screen.getByRole('button', { name: /start free trial/i })).toBeInTheDocument();
    expect(screen.getByText('Transparent Pricing')).toBeInTheDocument();
  });
});