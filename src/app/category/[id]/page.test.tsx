import { render, screen, waitFor } from '@testing-library/react';
import CategoryPage from '@/app/category/[id]/page';
import { GET as fetchProducts } from '@/app/api/products/route';
import { NextResponse } from 'next/server';
import '@testing-library/jest-dom/extend-expect';

// Mock the API response
jest.mock('@/app/api/products/route', () => ({
    GET: jest.fn(),
}));

describe('CategoryPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders category products and pagination', async () => {
        // Cast the fetchProducts to a Jest mock function
        const mockFetchProducts = fetchProducts as jest.Mock;

        // Mock a successful response for category filtering
        mockFetchProducts.mockImplementationOnce(async () => {
            return NextResponse.json([
                { id: 1, title: 'Product 1', price: 100, category: 'category-1', image: '', details: '', onSale: 0, inventory: 0, quantity: 0, sizes: [], colors: [] },
                { id: 2, title: 'Product 2', price: 200, category: 'category-1', image: '', details: '', onSale: 0, inventory: 0, quantity: 0, sizes: [], colors: [] },
            ]);
        });

        // Render the CategoryPage component with the id inside the params object
        render(<CategoryPage params={{ id: 'category-1' }} />);

        // Wait for the products to be fetched and displayed
        await waitFor(() => {
            expect(screen.getByText('Product 1')).toBeInTheDocument();
            expect(screen.getByText('Product 2')).toBeInTheDocument();
        });

        // Check pagination buttons if applicable
        await waitFor(() => {
            expect(screen.getByText('1')).toBeInTheDocument();
        });
    });

    it('displays an error when fetch fails', async () => {
        // Cast the fetchProducts to a Jest mock function
        const mockFetchProducts = fetchProducts as jest.Mock;

        // Mock a failed fetch request
        mockFetchProducts.mockImplementationOnce(async () => {
            throw new Error('Failed to fetch products');
        });

        // Render the CategoryPage component with the id inside the params object
        render(<CategoryPage params={{ id: 'category-1' }} />);

        // Wait for the error message to be displayed
        await waitFor(() => {
            expect(screen.getByText('Error fetching category products:')).toBeInTheDocument();
        });
    });
});