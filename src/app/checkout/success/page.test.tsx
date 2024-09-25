import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SuccessPage from '@/app/checkout/success/page';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { addToCart, clearCart } from '@/store/cartSlice';
import '@testing-library/jest-dom';

function renderWithStore(ui: JSX.Element) {
    return render(<Provider store={store}>{ui}</Provider>);
}

describe('SuccessPage', () => {
    beforeEach(() => {
        store.dispatch(clearCart());
    });

    it('renders product details in the order summary', async () => {
        store.dispatch(addToCart({
            product: {
                id: 1,
                title: 'Test Product',
                price: 100,
                onSale: 20,
                inventory: 5,
                quantity: 1,
                sizes: [],
                colors: [],
                size: 'Large',
                color: 'red',
                details: 'Test Product details',
                image: 'test-image.jpg',
                category: 'Test Category',
            },
        }));

        renderWithStore(<SuccessPage />);

        await waitFor(() => {
            expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
            expect(screen.getByText(/Size:\s*Large/i)).toBeInTheDocument();
            expect(screen.getByText(/Color:\s*red/i)).toBeInTheDocument();
        });
    });

    it('calculates the total price correctly', async () => {
        store.dispatch(addToCart({
            product: {
                id: 1,
                title: 'Test Product',
                price: 100,
                onSale: 20,
                inventory: 5,
                quantity: 1,
                sizes: [],
                colors: [],
                size: 'Large',
                color: 'red',
                details: 'Test Product details',
                image: 'test-image.jpg',
                category: 'Test Category',
            },
        }));

        renderWithStore(<SuccessPage />);

        await waitFor(() => {
            expect(screen.getByText(/Total Price: \$80.00/i)).toBeInTheDocument();
        });
    });
});