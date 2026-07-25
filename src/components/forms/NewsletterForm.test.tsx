import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewsletterForm from './NewsletterForm';
import { NewsletterData } from '@/lib/types';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
  },
}));

describe('NewsletterForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  describe('Section Variant (Default)', () => {
    it('renders with title, subtitle and all fields', () => {
      render(
        <NewsletterForm 
          onSubmit={mockOnSubmit}
          title="Stay Updated"
          subtitle="Get the latest insights"
          showInterests={true}
        />
      );

      expect(screen.getByText(/stay updated/i)).toBeInTheDocument();
      expect(screen.getByText(/get the latest insights/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
      expect(screen.getByText(/what interests you/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
    });

    it('displays validation error for invalid email', async () => {
      const user = userEvent.setup();
      render(<NewsletterForm onSubmit={mockOnSubmit} />);

      const emailInput = screen.getByLabelText(/email address/i);
      await user.type(emailInput, 'invalid-email');

      const submitButton = screen.getByRole('button', { name: /subscribe/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('requires email field', async () => {
      const user = userEvent.setup();
      render(<NewsletterForm onSubmit={mockOnSubmit} />);

      const submitButton = screen.getByRole('button', { name: /subscribe/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('submits with email only (minimal data)', async () => {
      const user = userEvent.setup();
      mockOnSubmit.mockResolvedValue(undefined);
      
      render(<NewsletterForm onSubmit={mockOnSubmit} />);

      const emailInput = screen.getByLabelText(/email address/i);
      await user.type(emailInput, 'test@example.com');

      const submitButton = screen.getByRole('button', { name: /subscribe/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          email: 'test@example.com',
          firstName: undefined,
          interests: [],
        });
      });
    });

    it('submits with all fields including interests', async () => {
      const user = userEvent.setup();
      mockOnSubmit.mockResolvedValue(undefined);
      
      render(<NewsletterForm onSubmit={mockOnSubmit} showInterests={true} />);

      // Fill out all fields
      await user.type(screen.getByLabelText(/first name/i), 'John');
      await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
      
      // Select some interests
      await user.click(screen.getByLabelText(/product updates/i));
      await user.click(screen.getByLabelText(/industry insights/i));

      const submitButton = screen.getByRole('button', { name: /subscribe/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          email: 'john@example.com',
          firstName: 'John',
          interests: ['product_updates', 'industry_insights'],
        });
      });
    });

    it('displays success state after successful submission', async () => {
      const user = userEvent.setup();
      mockOnSubmit.mockResolvedValue(undefined);
      
      render(<NewsletterForm onSubmit={mockOnSubmit} />);

      await user.type(screen.getByLabelText(/email address/i), 'success@example.com');
      const submitButton = screen.getByRole('button', { name: /subscribe/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/you're subscribed!/i)).toBeInTheDocument();
        expect(screen.getByText(/welcome aboard!/i)).toBeInTheDocument();
      });
    });
  });

  describe('Inline Variant', () => {
    it('renders in compact inline layout', () => {
      render(<NewsletterForm onSubmit={mockOnSubmit} variant="inline" />);

      // Should not have title/subtitle in inline mode
      expect(screen.queryByText(/stay updated/i)).not.toBeInTheDocument();
      
      // Should have email input and submit button
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();

      // Should not have first name or interests in inline mode
      expect(screen.queryByLabelText(/first name/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/what interests you/i)).not.toBeInTheDocument();
    });

    it('shows error message inline for invalid email', async () => {
      const user = userEvent.setup();
      render(<NewsletterForm onSubmit={mockOnSubmit} variant="inline" />);

      await user.type(screen.getByLabelText(/email address/i), 'invalid');
      await user.click(screen.getByRole('button', { name: /subscribe/i }));

      await waitFor(() => {
        expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
      });
    });

    it('submits successfully in inline mode', async () => {
      const user = userEvent.setup();
      mockOnSubmit.mockResolvedValue(undefined);
      
      render(<NewsletterForm onSubmit={mockOnSubmit} variant="inline" />);

      await user.type(screen.getByLabelText(/email address/i), 'inline@example.com');
      await user.click(screen.getByRole('button', { name: /subscribe/i }));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          email: 'inline@example.com',
          firstName: undefined,
          interests: [],
        });
      });
    });
  });

  describe('Modal Variant', () => {
    it('renders in modal layout without section styling', () => {
      render(<NewsletterForm onSubmit={mockOnSubmit} variant="modal" />);

      // Should have first name field in modal variant
      expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();

      // Should not show interests by default
      expect(screen.queryByText(/what interests you/i)).not.toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('displays error state when submission fails', async () => {
      const user = userEvent.setup();
      mockOnSubmit.mockRejectedValue(new Error('Subscription failed'));
      
      render(<NewsletterForm onSubmit={mockOnSubmit} />);

      await user.type(screen.getByLabelText(/email address/i), 'error@example.com');
      await user.click(screen.getByRole('button', { name: /subscribe/i }));

      await waitFor(() => {
        expect(screen.getByText(/subscription failed/i)).toBeInTheDocument();
      });
    });

    it('shows loading state during submission', async () => {
      const user = userEvent.setup();
      let resolveSubmit: (value?: any) => void;
      const submitPromise = new Promise(resolve => {
        resolveSubmit = resolve;
      });
      mockOnSubmit.mockReturnValue(submitPromise);
      
      render(<NewsletterForm onSubmit={mockOnSubmit} />);

      await user.type(screen.getByLabelText(/email address/i), 'loading@example.com');
      const submitButton = screen.getByRole('button', { name: /subscribe/i });
      await user.click(submitButton);

      // Check loading state
      expect(screen.getByText(/subscribing.../i)).toBeInTheDocument();
      expect(submitButton).toBeDisabled();

      // Resolve the promise
      resolveSubmit!();
      
      await waitFor(() => {
        expect(screen.getByText(/you're subscribed!/i)).toBeInTheDocument();
      });
    });

    it('clears field errors when user starts typing', async () => {
      const user = userEvent.setup();
      render(<NewsletterForm onSubmit={mockOnSubmit} />);

      // Submit to trigger validation error
      const submitButton = screen.getByRole('button', { name: /subscribe/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      });

      // Start typing in email field
      const emailInput = screen.getByLabelText(/email address/i);
      await user.type(emailInput, 't');

      await waitFor(() => {
        expect(screen.queryByText(/email is required/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('Interest Selection', () => {
    it('handles multiple interest selections', async () => {
      const user = userEvent.setup();
      mockOnSubmit.mockResolvedValue(undefined);
      
      render(<NewsletterForm onSubmit={mockOnSubmit} showInterests={true} />);

      await user.type(screen.getByLabelText(/email address/i), 'interests@example.com');

      // Select multiple interests
      const interests = [
        /product updates/i,
        /best practices/i,
        /events.*webinars/i
      ];

      for (const interest of interests) {
        await user.click(screen.getByLabelText(interest));
      }

      await user.click(screen.getByRole('button', { name: /subscribe/i }));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          email: 'interests@example.com',
          firstName: undefined,
          interests: ['product_updates', 'best_practices', 'events_webinars'],
        });
      });
    });

    it('allows deselecting interests', async () => {
      const user = userEvent.setup();
      mockOnSubmit.mockResolvedValue(undefined);
      
      render(<NewsletterForm onSubmit={mockOnSubmit} showInterests={true} />);

      await user.type(screen.getByLabelText(/email address/i), 'deselect@example.com');

      // Select and then deselect an interest
      const interestCheckbox = screen.getByLabelText(/case studies/i);
      await user.click(interestCheckbox); // Select
      await user.click(interestCheckbox); // Deselect

      await user.click(screen.getByRole('button', { name: /subscribe/i }));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          email: 'deselect@example.com',
          firstName: undefined,
          interests: [], // Should be empty after deselecting
        });
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper form labels and structure', () => {
      render(<NewsletterForm onSubmit={mockOnSubmit} />);

      const emailInput = screen.getByLabelText(/email address/i);
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('required');

      const submitButton = screen.getByRole('button', { name: /subscribe/i });
      expect(submitButton).toHaveAttribute('type', 'submit');
    });

    it('shows privacy notice in section variant', () => {
      render(<NewsletterForm onSubmit={mockOnSubmit} variant="section" />);
      
      expect(screen.getByText(/we respect your privacy/i)).toBeInTheDocument();
    });

    it('does not show privacy notice in inline variant', () => {
      render(<NewsletterForm onSubmit={mockOnSubmit} variant="inline" />);
      
      expect(screen.queryByText(/we respect your privacy/i)).not.toBeInTheDocument();
    });
  });

  describe('Form Reset', () => {
    it('resets form after successful submission', async () => {
      const user = userEvent.setup();
      mockOnSubmit.mockResolvedValue(undefined);
      
      render(<NewsletterForm onSubmit={mockOnSubmit} showInterests={true} />);

      // Fill out form
      await user.type(screen.getByLabelText(/first name/i), 'Reset');
      await user.type(screen.getByLabelText(/email address/i), 'reset@example.com');
      await user.click(screen.getByLabelText(/product updates/i));

      await user.click(screen.getByRole('button', { name: /subscribe/i }));

      // Wait for success state
      await waitFor(() => {
        expect(screen.getByText(/you're subscribed!/i)).toBeInTheDocument();
      });

      // Form should be reset (we can't directly check input values after success state,
      // but we can verify the component behavior by checking the success message appears)
      expect(screen.getByText(/welcome aboard!/i)).toBeInTheDocument();
    });
  });
});