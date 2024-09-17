'use client';

import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';

type Product = {
    id: number;
    title: string;
    image: string;
    details: string;
    price: number;
    category: string;
    onSale: boolean;
    inventory: number;
    quantity: number;
};

export default function SaleProductsPage() {
    const [saleProducts, setSaleProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('/api/products?onSale=true')
            .then((response) => response.json())
            .then((data) => setSaleProducts(data))
            .catch((error) => console.error('Error fetching sale products:', error));
    }, []);

    return (
        <main className="p-8 bg-beige-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Products on Sale</h1>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {saleProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </main>
    );
}