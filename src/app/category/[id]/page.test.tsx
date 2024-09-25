import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CategoryPage from '@/app/category/[id]/page';
import ProductCard from '@/components/ProductCard';
import Pagination from '@/components/Pagination';
import SaleTag from '@/components/SaleTag';
import '@testing-library/jest-dom';

describe('CategoryPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve([
                    ...Array.from({ length: 12 }).map((_, index) => ({
                        id: index + 1,
                        title: `Product ${index + 1}`,
                        image: `product${index + 1}.jpg`,
                        price: 100 + index,
                        onSale: 0,
                        inventory: 10,
                        category: 'category1',
                        quantity: 1,
                        sizes: [],
                        colors: [],
                        details: `Product details ${index + 1}`,
                    }))
                ]),
            } as Response)
        );
    });

    it('renders product cards and pagination', async () => {
        render(<CategoryPage params={{ id: 'category1' }} />);

        await waitFor(() => expect(screen.getByText(/Products in category1/i)).toBeInTheDocument());

        await waitFor(() => expect(screen.getByText(/Product 1/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/Product 9/i)).toBeInTheDocument());

        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('handles pagination', async () => {
        render(<CategoryPage params={{ id: 'category1' }} />);

        await waitFor(() => expect(screen.getByText(/Products in category1/i)).toBeInTheDocument());

        expect(screen.getByText('2')).toBeInTheDocument();

        fireEvent.click(screen.getByText('2'));

        await waitFor(() => expect(screen.getByText('Product 10')).toBeInTheDocument());
        expect(screen.getByText('Product 11')).toBeInTheDocument();
    });

    it('handles API fetch error', async () => {
        jest.spyOn(console, 'error').mockImplementation(() => { });
        global.fetch = jest.fn(() => Promise.reject(new Error('API fetch failed')));

        render(<CategoryPage params={{ id: 'category1' }} />);

        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith('Error fetching category products:', expect.any(Error));
        });
    });
});

describe('ProductCard Component', () => {
    const mockProduct = {
        id: 1,
        title: 'Product 1',
        image: 'product1.jpg',
        price: 100,
        onSale: 0,
        category: 'category1',
        inventory: 10,
        quantity: 1,
        sizes: [],
        colors: [],
        details: 'Product details 1',
    };

    it('renders product information', () => {
        render(<ProductCard product={mockProduct} />);

        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.getByText('$100.00')).toBeInTheDocument();
    });

    it('shows sale price if product is on sale', () => {
        const saleProduct = { ...mockProduct, onSale: 20, price: 200 };
        render(<ProductCard product={saleProduct} />);

        expect(screen.getByText('$160.00')).toBeInTheDocument();
        expect(screen.getByText('20% OFF')).toBeInTheDocument();
    });
});

describe('Pagination Component', () => {
    it('renders pagination buttons', () => {
        render(<Pagination currentPage={1} totalPages={3} onPageChange={() => { }} />);

        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('handles page change on button click', () => {
        const mockOnPageChange = jest.fn();
        render(<Pagination currentPage={1} totalPages={3} onPageChange={mockOnPageChange} />);

        fireEvent.click(screen.getByText('2'));
        expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });
});

describe('SaleTag Component', () => {
    it('renders the discount percentage', () => {
        render(<SaleTag discount={25} />);
        expect(screen.getByText('25% OFF')).toBeInTheDocument();
    });
});