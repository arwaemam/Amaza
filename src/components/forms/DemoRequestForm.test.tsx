import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DemoRequestForm from './DemoRequestForm';
import { DemoRequestData } from '@/lib/types';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
  },
}));

describe('DemoRequestForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders all form sections and fields correctly', () => {
    render(<DemoRequestForm onSubmit={mockOnSubmit} />);

    // Check for section headers
    expect(screen.getByText(/personal information/i)).toBeInTheDocument();
    expect(screen.getByText(/business information/i)).toBeInTheDocument();
    expect(screen.getByText(/demo preferences/i)).toBeInTheDocument();

    // Check for required form fields
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/property type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of properties/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/implementation timeframe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /schedule my demo/i })).toBeInTheDocument();
  });

  it('displays validation errors for all required fields', async () => {
    const user = userEvent.setup();
    render(<DemoRequestForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole('button', { name: /schedule my demo/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/phone is required/i)).toBeInTheDocument();
      expect(screen.getByText(/company is required/i)).toBeInTheDocument();
      expect(screen.getByText(/property type is required/i)).toBeInTheDocument();
      expect(screen.getByText(/property count is required/i)).toBeInTheDocument();
      expect(screen.getByText(/timeframe is required/i)).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('validates email and phone formats', async () => {
    const user = userEvent.setup();
    render(<DemoRequestForm onSubmit={mockOnSubmit} />);

    const emailInput = screen.getByLabelText(/email address/i);
    const phoneInput = screen.getByLabelText(/phone number/i);

    await user.type(emailInput, 'invalid-email');
    await user.type(phoneInput, '123'); // Invalid phone

    const submitButton = screen.getByRole('button', { name: /schedule my demo/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/please enter a valid phone number/i)).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('submits form with valid data including all fields', async () => {
    const user = userEvent.setup();
    mockOnSubmit.mockResolvedValue(undefined);
    
    render(<DemoRequestForm onSubmit={mockOnSubmit} />);

    // Fill out all required fields
    await user.type(screen.getByLabelText(/first name/i), 'Jane');
    await user.type(screen.getByLabelText(/last name/i), 'Smith');
    await user.type(screen.getByLabelText(/email address/i), 'jane.smith@example.com');
    await user.type(screen.getByLabelText(/phone number/i), '555-987-6543');
    await user.type(screen.getByLabelText(/company name/i), 'ABC Hotels');
    await user.selectOptions(screen.getByLabelText(/property type/i), 'hotel');
    await user.selectOptions(screen.getByLabelText(/number of properties/i), '25');
    await user.type(screen.getByLabelText(/current software/i), 'Legacy PMS');
    await user.selectOptions(screen.getByLabelText(/implementation timeframe/i), 'within_month');
    await user.type(screen.getByLabelText(/preferred demo date/i), '2024-02-15');
    await user.type(screen.getByLabelText(/preferred time/i), '14:30');

    const submitButton = screen.getByRole('button', { name: /schedule my demo/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '555-987-6543',
        company: 'ABC Hotels',
        propertyType: 'hotel',
        propertyCount: 25, // Should be converted to number
        currentSoftware: 'Legacy PMS',
        timeframe: 'within_month',
        preferredDate: '2024-02-15',
        preferredTime: '14:30',
      });
    });
  });

  it('displays success state after successful submission', async () => {
    const user = userEvent.setup();
    mockOnSubmit.mockResolvedValue(undefined);
    
    render(<DemoRequestForm onSubmit={mockOnSubmit} />);

    // Fill out minimal required fields
    await user.type(screen.getByLabelText(/first name/i), 'John');
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john.doe@example.com');
    await user.type(screen.getByLabelText(/phone number/i), '555-123-4567');
    await user.type(screen.getByLabelText(/company name/i), 'Test Company');
    await user.selectOptions(screen.getByLabelText(/property type/i), 'bnb');
    await user.selectOptions(screen.getByLabelText(/number of properties/i), '1');
    await user.selectOptions(screen.getByLabelText(/implementation timeframe/i), 'immediate');

    const submitButton = screen.getByRole('button', { name: /schedule my demo/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/demo scheduled!/i)).toBeInTheDocument();
      expect(screen.getByText(/our team will contact you within 24 hours/i)).toBeInTheDocument();
      expect(screen.getByText(/what happens next:/i)).toBeInTheDocument();
    });
  });

  it('displays error state when submission fails', async () => {
    const user = userEvent.setup();
    mockOnSubmit.mockRejectedValue(new Error('Submission failed'));
    
    render(<DemoRequestForm onSubmit={mockOnSubmit} />);

    // Fill out minimal required fields
    await user.type(screen.getByLabelText(/first name/i), 'John');
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john.doe@example.com');
    await user.type(screen.getByLabelText(/phone number/i), '555-123-4567');
    await user.type(screen.getByLabelText(/company name/i), 'Test Company');
    await user.selectOptions(screen.getByLabelText(/property type/i), 'hotel');
    await user.selectOptions(screen.getByLabelText(/number of properties/i), '10');
    await user.selectOptions(screen.getByLabelText(/implementation timeframe/i), 'research');

    const submitButton = screen.getByRole('button', { name: /schedule my demo/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/submission failed/i)).toBeInTheDocument();
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });

  it('shows loading state during submission', async () => {
    const user = userEvent.setup();
    let resolveSubmit: (value?: any) => void;
    const submitPromise = new Promise(resolve => {
      resolveSubmit = resolve;
    });
    mockOnSubmit.mockReturnValue(submitPromise);
    
    render(<DemoRequestForm onSubmit={mockOnSubmit} />);

    // Fill out minimal required fields
    await user.type(screen.getByLabelText(/first name/i), 'John');
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john.doe@example.com');
    await user.type(screen.getByLabelText(/phone number/i), '555-123-4567');
    await user.type(screen.getByLabelText(/company name/i), 'Test Company');
    await user.selectOptions(screen.getByLabelText(/property type/i), 'vacation_rental');
    await user.selectOptions(screen.getByLabelText(/number of properties/i), '75');
    await user.selectOptions(screen.getByLabelText(/implementation timeframe/i), 'within_quarter');

    const submitButton = screen.getByRole('button', { name: /schedule my demo/i });
    await user.click(submitButton);

    // Check loading state
    expect(screen.getByText(/scheduling demo.../i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    // Resolve the promise
    resolveSubmit!();
    
    await waitFor(() => {
      expect(screen.getByText(/demo scheduled!/i)).toBeInTheDocument();
    });
  });

  it('clears field errors when user starts typing', async () => {
    const user = userEvent.setup();
    render(<DemoRequestForm onSubmit={mockOnSubmit} />);

    // Submit to trigger validation errors
    const submitButton = screen.getByRole('button', { name: /schedule my demo/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
    });

    // Start typing in first name field
    const firstNameInput = screen.getByLabelText(/first name/i);
    await user.type(firstNameInput, 'J');

    await waitFor(() => {
      expect(screen.queryByText(/first name is required/i)).not.toBeInTheDocument();
    });
  });

  it('handles property type and count selections correctly', async () => {
    const user = userEvent.setup();
    render(<DemoRequestForm onSubmit={mockOnSubmit} />);

    const propertyTypeSelect = screen.getByLabelText(/property type/i);
    const propertyCountSelect = screen.getByLabelText(/number of properties/i);

    // Test property type options
    expect(propertyTypeSelect).toBeInTheDocument();
    await user.selectOptions(propertyTypeSelect, 'resort');
    expect((screen.getByDisplayValue('Resort') as HTMLOptionElement).selected).toBe(true);

    // Test property count options
    expect(propertyCountSelect).toBeInTheDocument();
    await user.selectOptions(propertyCountSelect, '100');
    expect((screen.getByDisplayValue('100+') as HTMLOptionElement).selected).toBe(true);
  });

  it('validates optional fields correctly', async () => {
    const user = userEvent.setup();
    mockOnSubmit.mockResolvedValue(undefined);
    
    render(<DemoRequestForm onSubmit={mockOnSubmit} />);

    // Fill out required fields only (no optional fields)
    await user.type(screen.getByLabelText(/first name/i), 'Test');
    await user.type(screen.getByLabelText(/last name/i), 'User');
    await user.type(screen.getByLabelText(/email address/i), 'test@example.com');
    await user.type(screen.getByLabelText(/phone number/i), '555-000-0000');
    await user.type(screen.getByLabelText(/company name/i), 'Test Co');
    await user.selectOptions(screen.getByLabelText(/property type/i), 'other');
    await user.selectOptions(screen.getByLabelText(/number of properties/i), '1');
    await user.selectOptions(screen.getByLabelText(/implementation timeframe/i), 'research');

    const submitButton = screen.getByRole('button', { name: /schedule my demo/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        phone: '555-000-0000',
        company: 'Test Co',
        propertyType: 'other',
        propertyCount: 1,
        currentSoftware: '', // Optional field, should be empty string
        timeframe: 'research',
        preferredDate: '', // Optional field, should be empty string
        preferredTime: '', // Optional field, should be empty string
      });
    });
  });
});