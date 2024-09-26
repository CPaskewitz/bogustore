import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Home from '@/app/page';
import Promotion from '@/components/Promotion';
import CategoryList from '@/components/CategoryList';
import ProductList from '@/components/ProductList';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '@/store';

const renderWithStore = (ui: JSX.Element) => render(<Provider store={store}>{ui}</Provider>);

Object.defineProperty(HTMLElement.prototype, 'scrollBy', {
    value: jest.fn(),
    writable: true,
});

beforeAll(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve([
                {
                    id: 1,
                    title: 'Product 1',
                    image: 'product1.jpg',
                    details: 'A great product 1',
                    price: 100,
                    category: 'Furniture',
                    onSale: 20,
                    inventory: 10,
                    quantity: 0,
                    sizes: ['Medium', 'Large'],
                    colors: ['blue', 'red'],
                },
                {
                    id: 2,
                    title: 'Product 2',
                    image: 'product2.jpg',
                    details: 'A great product 2',
                    price: 150,
                    category: 'Electronics',
                    onSale: 10,
                    inventory: 5,
                    quantity: 0,
                    sizes: ['Small', 'Medium'],
                    colors: ['black', 'white'],
                },
            ]),
        } as Response)
    );
});

describe('Home Page', () => {
    it('renders Promotion, CategoryList, and ProductList components', () => {
        renderWithStore(<Home />);

        expect(screen.getByText(/Special Offer: Up to 25% Off Selected Items!/i)).toBeInTheDocument();
        expect(screen.getByText(/Furniture/i)).toBeInTheDocument();
        expect(screen.getByText(/Electronics/i)).toBeInTheDocument();
        expect(screen.getByText(/Apparel/i)).toBeInTheDocument();
    });
});

describe('Promotion Component', () => {
    it('renders promotion link and navigates to sale page', () => {
        render(<Promotion />);

        const promotionLink = screen.getByRole('link', { name: /Special Offer: Up to 25% Off Selected Items!/i });
        expect(promotionLink).toBeInTheDocument();
        expect(promotionLink).toHaveAttribute('href', '/sale');
    });
});

describe('CategoryList Component', () => {
    it('renders category links', () => {
        render(<CategoryList />);

        const furnitureLink = screen.getByRole('link', { name: /Furniture/i });
        const electronicsLink = screen.getByRole('link', { name: /Electronics/i });
        const apparelLink = screen.getByRole('link', { name: /Apparel/i });

        expect(furnitureLink).toBeInTheDocument();
        expect(electronicsLink).toBeInTheDocument();
        expect(apparelLink).toBeInTheDocument();

        expect(furnitureLink).toHaveAttribute('href', '/category/furniture');
        expect(electronicsLink).toHaveAttribute('href', '/category/electronics');
        expect(apparelLink).toHaveAttribute('href', '/category/apparel');
    });
});

describe('ProductList Component', () => {
    it('renders products grouped by categories', async () => {
        await act(async () => {
            renderWithStore(<ProductList />);
        });

        await waitFor(() => expect(screen.getByText(/Furniture/i)).toBeInTheDocument());
        const product1Elements = screen.getAllByText(/Product 1/i);
        expect(product1Elements.length).toBeGreaterThan(0);

        await waitFor(() => expect(screen.getByText(/Electronics/i)).toBeInTheDocument());
        const product2Elements = screen.getAllByText(/Product 2/i);
        expect(product2Elements.length).toBeGreaterThan(0);
    });

    it('renders sale products separately', async () => {
        await act(async () => {
            renderWithStore(<ProductList />);
        });

        await waitFor(() => expect(screen.getByText(/Today's Deals!/i)).toBeInTheDocument());
        const saleProduct1Elements = screen.getAllByText(/Product 1/i);
        expect(saleProduct1Elements.length).toBeGreaterThan(0);

        const salePriceElements = screen.getAllByText(/\$80\.00/i);
        expect(salePriceElements.length).toBeGreaterThan(0);
    });

    it('handles scroll buttons for product categories', async () => {
        await act(async () => {
            renderWithStore(<ProductList />);
        });

        await waitFor(() => expect(screen.getByText(/Furniture/i)).toBeInTheDocument());

        const leftScrollButton = screen.getAllByText('←')[0];
        const rightScrollButton = screen.getAllByText('→')[0];

        expect(leftScrollButton).toBeInTheDocument();
        expect(rightScrollButton).toBeInTheDocument();

        fireEvent.click(rightScrollButton);
        fireEvent.click(leftScrollButton);
    });
});