import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SaleProductsPage from '@/app/sale/page';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '@/store';

const renderWithStore = (ui: JSX.Element) => render(<Provider store={store}>{ui}</Provider>);

describe('SaleProductsPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        global.fetch = jest.fn((url) => {
            if ((url as string).includes('/api/products')) {
                return Promise.resolve({
                    ok: true,
                    status: 200,
                    json: () => Promise.resolve([
                        {
                            id: 1,
                            title: 'Sale Product 1',
                            image: 'sale1.jpg',
                            details: 'A great product on sale',
                            price: 100,
                            category: 'Category1',
                            onSale: 20,
                            inventory: 5,
                            quantity: 0,
                            sizes: ['Medium', 'Large'],
                            colors: ['blue', 'red'],
                        },
                        {
                            id: 2,
                            title: 'Sale Product 2',
                            image: 'sale2.jpg',
                            details: 'Another great product on sale',
                            price: 200,
                            category: 'Category2',
                            onSale: 30,
                            inventory: 10,
                            quantity: 0,
                            sizes: ['Small', 'Medium'],
                            colors: ['green', 'black'],
                        },
                    ]),
                } as Response);
            }
            return Promise.reject(new Error('Unknown API endpoint'));
        });
    });

    it('renders the sale products heading', async () => {
        renderWithStore(<SaleProductsPage />);

        await waitFor(() => expect(screen.getByText(/Today's Deals!/i)).toBeInTheDocument());
    });

    it('displays sale products', async () => {
        renderWithStore(<SaleProductsPage />);

        await waitFor(() => expect(screen.getByText(/Sale Product 1/i)).toBeInTheDocument());
        expect(screen.getByText(/\$80\.00/i)).toBeInTheDocument();

        await waitFor(() => expect(screen.getByText(/Sale Product 2/i)).toBeInTheDocument());
        expect(screen.getByText(/\$140\.00/i)).toBeInTheDocument();
    });

    it('handles API fetch error for sale products', async () => {
        jest.spyOn(console, 'error').mockImplementation(() => { });
        global.fetch = jest.fn(() => Promise.reject(new Error('API fetch failed')));

        renderWithStore(<SaleProductsPage />);

        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith('Error fetching sale products:', expect.any(Error));
        });
    });
});