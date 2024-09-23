import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import cartReducer, { CartState, updateCartQuantity, removeFromCart } from '../../store/cartSlice';
import CartPage from './page';
import '@testing-library/jest-dom';

jest.mock('next/link', () => {
    return ({ children }: { children: React.ReactNode }) => children;
});

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => <img {...props} />,
}));

describe('CartPage', () => {
    let store: EnhancedStore<{ cart: CartState }>;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                cart: cartReducer,
            },
            preloadedState: {
                cart: {
                    cartItems: [
                        {
                            id: 1,
                            title: 'Product 1',
                            image: 'cap.jpg',
                            details: 'Some details',
                            price: 100,
                            category: 'Category 1',
                            onSale: 0,
                            inventory: 5,
                            quantity: 2,
                            sizes: [],
                            colors: []
                        },
                        {
                            id: 2,
                            title: 'Product 2',
                            image: 'jeans.jpg',
                            details: 'Some details',
                            price: 200,
                            category: 'Category 2',
                            onSale: 10,
                            inventory: 5,
                            quantity: 1,
                            sizes: [],
                            colors: []
                        },
                    ],
                    shippingInfo: null,
                },
            },
        });

        jest.clearAllMocks();
    });

    test('renders cart items and total price', () => {
        render(
            <Provider store={store}>
                <CartPage />
            </Provider>
        );

        // Check that products are rendered
        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.getByText('Product 2')).toBeInTheDocument();

        // Check the total price calculation
        expect(screen.getByText('Total: $380.00')).toBeInTheDocument(); // 2x Product 1 ($100) + 1x Product 2 ($180 with discount)
    });

    test('handles quantity changes', async () => {
        render(
            <Provider store={store}>
                <CartPage />
            </Provider>
        );

        // Spy on dispatch to ensure it was called with the right action
        const dispatchSpy = jest.spyOn(store, 'dispatch');

        // Simulate increasing quantity of Product 1
        const increaseButton = screen.getAllByRole('button', { name: '+' })[0]; // Target the first "+" button for Product 1
        fireEvent.click(increaseButton);

        // Check if the `updateCartQuantity` action is dispatched correctly
        await waitFor(() => {
            expect(dispatchSpy).toHaveBeenCalledWith(updateCartQuantity({ id: 1, quantity: 3 }));
        });
    });

    test('handles removing items from the cart', async () => {
        render(
            <Provider store={store}>
                <CartPage />
            </Provider>
        );

        // Spy on dispatch to ensure it was called with the right action
        const dispatchSpy = jest.spyOn(store, 'dispatch');

        // Simulate removing Product 2
        const removeButton = screen.getAllByText('Remove')[1]; // Target the second "Remove" button for Product 2
        fireEvent.click(removeButton);

        // Check if the `removeFromCart` action is dispatched correctly
        await waitFor(() => {
            expect(dispatchSpy).toHaveBeenCalledWith(removeFromCart({ id: 2 }));
        });
    });

    test('displays "Your cart is empty" message when cart is empty', () => {
        // Set store to have an empty cart
        store = configureStore({
            reducer: {
                cart: cartReducer,
            },
            preloadedState: {
                cart: {
                    cartItems: [],
                    shippingInfo: null,
                },
            },
        });

        render(
            <Provider store={store}>
                <CartPage />
            </Provider>
        );

        expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
    });
});