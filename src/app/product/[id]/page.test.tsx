import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductPage from '@/app/product/[id]/page';
import ProductImage from '@/components/ProductImage';
import ProductDetails from '@/components/ProductDetails';
import QuantityButton from '@/components/QuantityButton';
import RelatedProducts from '@/components/RelatedProducts';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '@/store';

const renderWithStore = (ui: JSX.Element) => render(<Provider store={store}>{ui}</Provider>);

describe('ProductPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        global.fetch = jest.fn((url) => {
            if ((url as string).includes('/api/products/')) {
                return Promise.resolve({
                    ok: true,
                    status: 200,
                    json: () => Promise.resolve({
                        id: 1,
                        title: 'Test Product',
                        image: 'test-image.jpg',
                        details: 'A great product',
                        price: 100,
                        category: 'TestCategory',
                        onSale: 20,
                        inventory: 10,
                        quantity: 0,
                        sizes: ['Medium', 'Large'],
                        colors: ['blue', 'red'],
                    }),
                } as Response);
            }
            if ((url as string).includes('/api/products?category=')) {
                return Promise.resolve({
                    ok: true,
                    status: 200,
                    json: () => Promise.resolve([
                        {
                            id: 2,
                            title: 'Related Product 1',
                            image: 'related1.jpg',
                            details: 'A great related product',
                            price: 150,
                            category: 'TestCategory',
                            onSale: 10,
                            inventory: 20,
                            quantity: 0,
                            sizes: ['Small', 'Medium'],
                            colors: ['green', 'yellow'],
                        },
                        {
                            id: 3,
                            title: 'Related Product 2',
                            image: 'related2.jpg',
                            details: 'Another great related product',
                            price: 180,
                            category: 'TestCategory',
                            onSale: 15,
                            inventory: 15,
                            quantity: 0,
                            sizes: ['Large', 'X-Large'],
                            colors: ['black', 'white'],
                        },
                    ]),
                } as Response);
            }
            return Promise.reject(new Error('Unknown API endpoint'));
        });
        store.dispatch({ type: 'cart/clearCart' });
    });

    it('renders product details and components', async () => {
        renderWithStore(<ProductPage params={{ id: '1' }} />);

        await waitFor(() => expect(screen.getByText(/Test Product/i)).toBeInTheDocument());
        expect(screen.getByText(/A great product/i)).toBeInTheDocument();
        expect(screen.getByText(/\$80\.00/i)).toBeInTheDocument();
        expect(screen.getByText(/In stock: 10/i)).toBeInTheDocument();

        const sizeSelector = screen.getByLabelText('Select Size:');
        expect(sizeSelector).toBeInTheDocument();

        const blueColorButton = screen.getByRole('button', { name: 'Select color blue' });
        expect(blueColorButton).toHaveStyle({ backgroundColor: 'blue' });

        const redColorButton = screen.getByRole('button', { name: 'Select color red' });
        expect(redColorButton).toHaveStyle({ backgroundColor: 'red' });
    });

    it('adds to cart and adjusts quantity', async () => {
        renderWithStore(<ProductPage params={{ id: '1' }} />);

        await waitFor(() => expect(screen.getByText(/Add to Cart/i)).toBeInTheDocument());

        const addToCartButton = screen.getByText(/Add to Cart/i);
        fireEvent.click(addToCartButton);

        const quantityDisplay = screen.getByText('1', { selector: 'span' });
        expect(quantityDisplay).toBeInTheDocument();

        const incrementButton = screen.getByText(/\+/);
        fireEvent.click(incrementButton);
        await waitFor(() => expect(screen.getByText('2', { selector: 'span' })).toBeInTheDocument());

        const decrementButton = screen.getByText(/-/);
        fireEvent.click(decrementButton);
        await waitFor(() => expect(screen.getByText('1', { selector: 'span' })).toBeInTheDocument());
    });

    it('displays related products', async () => {
        renderWithStore(<ProductPage params={{ id: '1' }} />);

        await waitFor(() => expect(screen.getByText(/Related Products/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/Related Product 1/i)).toBeInTheDocument(), { timeout: 3000 });
        expect(screen.getByText(/Related Product 2/i)).toBeInTheDocument();
    });

    it('handles API fetch error for product details', async () => {
        jest.spyOn(console, 'error').mockImplementation(() => { });
        global.fetch = jest.fn(() => Promise.reject(new Error('API fetch failed')));

        renderWithStore(<ProductPage params={{ id: '1' }} />);

        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith('Error fetching product:', expect.any(Error));
        });
    });
});

describe('ProductImage Component', () => {
    it('renders product image', () => {
        render(<ProductImage imageUrl="/test-image.jpg" alt="Test Product" />);
        expect(screen.getByAltText('Test Product')).toBeInTheDocument();
    });
});

describe('ProductDetails Component', () => {
    const mockProduct = {
        id: 1,
        title: 'Test Product',
        image: 'test-image.jpg',
        details: 'A great product',
        price: 100,
        category: 'TestCategory',
        onSale: 20,
        inventory: 10,
        quantity: 0,
        sizes: ['Medium', 'Large'],
        colors: ['blue', 'red'],
    };

    it('renders product details', () => {
        render(<ProductDetails product={mockProduct} />);
        expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
        expect(screen.getByText(/\$80\.00/i)).toBeInTheDocument();
        expect(screen.getByText(/In stock: 10/i)).toBeInTheDocument();
    });
});

describe('QuantityButton Component', () => {
    const mockProduct = {
        id: 1,
        title: 'Test Product',
        image: 'test-image.jpg',
        details: 'A great product',
        price: 100,
        category: 'TestCategory',
        onSale: 20,
        inventory: 10,
        quantity: 0,
        sizes: ['Medium', 'Large'],
        colors: ['blue', 'red'],
    };

    it('renders quantity buttons and handles adding to cart', () => {
        renderWithStore(<QuantityButton product={mockProduct} handleUpdateQuantity={jest.fn()} />);
        expect(screen.getByText(/Add to Cart/i)).toBeInTheDocument();
    });
});

describe('RelatedProducts Component', () => {
    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve([
                    { id: 2, title: 'Related Product 1', image: 'related1.jpg', price: 150 },
                    { id: 3, title: 'Related Product 2', image: 'related2.jpg', price: 180 },
                ]),
            } as Response)
        );
    });

    it('renders related products', async () => {
        render(<RelatedProducts category="TestCategory" currentProductId={1} />);
        await waitFor(() => expect(screen.getByText(/Related Product 1/i)).toBeInTheDocument());
        expect(screen.getByText(/Related Product 2/i)).toBeInTheDocument();
    });
});