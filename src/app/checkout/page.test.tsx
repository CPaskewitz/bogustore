import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CheckoutPage from '@/app/checkout/page';
import { Provider } from 'react-redux';
import { store } from '@/store';
import '@testing-library/jest-dom';

function renderWithStore(ui: JSX.Element) {
    return render(<Provider store={store}>{ui}</Provider>);
}

describe('CheckoutPage', () => {
    it('renders the shipping form by default', async () => {
        renderWithStore(<CheckoutPage />);

        expect(screen.getByText(/Shipping Information/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText('John Doe')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('1234 Main St, Apartment 101')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('johndoe@example.com')).toBeInTheDocument();
    });

    it('moves to payment step when shipping info is submitted', async () => {
        renderWithStore(<CheckoutPage />);

        fireEvent.change(screen.getByPlaceholderText('John Doe'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText('1234 Main St, Apartment 101'), { target: { value: '1234 Main St' } });
        fireEvent.change(screen.getByPlaceholderText('johndoe@example.com'), { target: { value: 'johndoe@example.com' } });

        fireEvent.click(screen.getByRole('button', { name: /Next: Payment/i }));

        await waitFor(() => {
            expect(screen.getByText(/Payment Information/i)).toBeInTheDocument();
            expect(screen.getByPlaceholderText('4242 4242 4242 4242')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('12/24')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('123')).toBeInTheDocument();
        });
    });

    it('shows success link after payment submission', async () => {
        renderWithStore(<CheckoutPage />);

        fireEvent.change(screen.getByPlaceholderText('John Doe'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText('1234 Main St, Apartment 101'), { target: { value: '1234 Main St' } });
        fireEvent.change(screen.getByPlaceholderText('johndoe@example.com'), { target: { value: 'johndoe@example.com' } });

        fireEvent.click(screen.getByRole('button', { name: /Next: Payment/i }));
        
        await waitFor(() => screen.getByText(/Payment Information/i));
        
        fireEvent.change(screen.getByPlaceholderText('4242 4242 4242 4242'), { target: { value: '4242 4242 4242 4242' } });
        fireEvent.change(screen.getByPlaceholderText('12/24'), { target: { value: '12/24' } });
        fireEvent.change(screen.getByPlaceholderText('123'), { target: { value: '123' } });

        fireEvent.click(screen.getByRole('button', { name: /Submit Payment/i }));

        await waitFor(() => screen.getByText(/Processing payment, please wait.../i));

        await new Promise((resolve) => setTimeout(resolve, 2000));

        await waitFor(() => {
            expect(screen.getByRole('link', { name: /Continue/i })).toBeInTheDocument();
        });
    });
});