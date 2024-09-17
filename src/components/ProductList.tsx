'use client';

import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

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

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('/api/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <section className="w-full overflow-x-scroll whitespace-nowrap py-4">
            {products.map((product) => (
                <div key={product.id} className="inline-block px-2">
                    <ProductCard product={product} />
                </div>
            ))}
        </section>
    );
}