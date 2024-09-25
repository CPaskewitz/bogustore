import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import SuccessPage from '@/app/checkout/success/page';
import { Provider } from 'react-redux';
import { store } from '@/store';
import '@testing-library/jest-dom';
import { addToCart } from '@/store/cartSlice';

function renderWithStore(ui: JSX.Element) {
    return render(<Provider store={store}>{ui}</Provider>);
}

describe('SuccessPage', () => {
    beforeEach(() => {
        store.dispatch({
            type: 'cart/clearCart',
        });
    });

    it('renders product details in the order summary', async () => {
        store.dispatch(addToCart({
            product: {
                id: 1,
                title: 'Test Product',
                price: 100,
                onSale: 20,
                inventory: 5,
                quantity: 2,
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
            expect(screen.getByText((content, element) => {
                return element?.textContent?.includes('(x2)') ?? false;
            })).toBeInTheDocument();
            expect(screen.getByText(/Size: Large/i)).toBeInTheDocument();
            expect(screen.getByText(/Color: red/i)).toBeInTheDocument();
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
                quantity: 2,
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
            expect(screen.getByText(/Total Price/i)).toBeInTheDocument();
            expect(screen.getByText(/\$160.00/i)).toBeInTheDocument();
        });
    });

    it('clears the cart after rendering', async () => {
        store.dispatch(addToCart({
            product: {
                id: 1,
                title: 'Test Product',
                price: 100,
                onSale: 20,
                inventory: 5,
                quantity: 2,
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
            expect(store.getState().cart.cartItems.length).toBe(0);
        });
    });

    it('renders continue shopping link', async () => {
        renderWithStore(<SuccessPage />);

        await waitFor(() => {
            expect(screen.getByRole('link', { name: /Continue Shopping/i })).toBeInTheDocument();
        });
    });
});