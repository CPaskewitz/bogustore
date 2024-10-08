import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { updateCartQuantity, removeFromCart, CartState } from '../../store/cartSlice';
import CartPage from './page';
import '@testing-library/jest-dom';

const renderWithStore = (preloadedState: { cart: CartState }) => {
    const store = configureStore({
        reducer: { cart: cartReducer },
        preloadedState,
    });

    const dispatchSpy = jest.spyOn(store, 'dispatch');

    return {
        ...render(
            <Provider store={store}>
                <CartPage />
            </Provider>
        ),
        store,
        dispatchSpy,
    };
};

describe('CartPage', () => {
    it('renders cart items and calculates the total price correctly', async () => {
        const preloadedState = {
            cart: {
                cartItems: [
                    {
                        id: 1,
                        title: 'Product 1',
                        image: 'cap.jpg',
                        price: 100,
                        onSale: 0,
                        inventory: 5,
                        quantity: 2,
                        sizes: [],
                        colors: [],
                        details: 'Some details',
                        category: 'Accessories',
                    },
                ],
                shippingInfo: null,
            },
        };

        await act(async () => {
            renderWithStore(preloadedState);
        });

        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.getByText('Total: $200.00')).toBeInTheDocument();
    });

    it('handles increasing and decreasing quantity', async () => {
        const preloadedState = {
            cart: {
                cartItems: [
                    {
                        id: 1,
                        title: 'Product 1',
                        image: 'cap.jpg',
                        price: 100,
                        onSale: 0,
                        inventory: 5,
                        quantity: 2,
                        sizes: [],
                        colors: [],
                        details: 'Some details',
                        category: 'Accessories',
                    },
                ],
                shippingInfo: null,
            },
        };

        const { dispatchSpy } = renderWithStore(preloadedState);

        const increaseButton = screen.getByRole('button', { name: '+' });

        await act(async () => {
            fireEvent.click(increaseButton);
        });

        await waitFor(() => {
            expect(dispatchSpy).toHaveBeenCalledWith(updateCartQuantity({ id: 1, quantity: 3 }));
        });

        const decreaseButton = screen.getByRole('button', { name: '-' });

        await act(async () => {
            fireEvent.click(decreaseButton);
        });

        await waitFor(() => {
            expect(dispatchSpy).toHaveBeenCalledWith(updateCartQuantity({ id: 1, quantity: 2 }));
        });
    });

    it('handles removing items from the cart', async () => {
        const preloadedState = {
            cart: {
                cartItems: [
                    {
                        id: 1,
                        title: 'Product 1',
                        image: 'cap.jpg',
                        price: 100,
                        onSale: 0,
                        inventory: 5,
                        quantity: 2,
                        sizes: [],
                        colors: [],
                        details: 'Some details',
                        category: 'Accessories',
                    },
                ],
                shippingInfo: null,
            },
        };

        const { dispatchSpy } = renderWithStore(preloadedState);

        const removeButton = screen.getByText('Remove');

        await act(async () => {
            fireEvent.click(removeButton);
        });

        await waitFor(() => {
            expect(dispatchSpy).toHaveBeenCalledWith(removeFromCart({ id: 1 }));
        });
    });

    it('displays a message when the cart is empty', async () => {
        const preloadedState = {
            cart: {
                cartItems: [],
                shippingInfo: null,
            },
        };

        await act(async () => {
            renderWithStore(preloadedState);
        });

        expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
    });
});