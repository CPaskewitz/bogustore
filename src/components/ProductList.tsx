'use client';

import React, { useEffect, useState, useRef } from 'react';
import ProductCard from './ProductCard';

type Product = {
    id: number;
    title: string;
    image: string;
    details: string;
    price: number;
    category: string;
    onSale: number;
    inventory: number;
    quantity: number;
    sizes: string[];
    colors: string[];
    size?: string;
    color?: string;
};

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [groupedProducts, setGroupedProducts] = useState<{ [category: string]: Product[] }>({});
    const scrollRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

    useEffect(() => {
        fetch('/api/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data);

                const grouped = data.reduce((acc: { [category: string]: Product[] }, product: Product) => {
                    const category = product.category.charAt(0).toUpperCase() + product.category.slice(1);
                    if (!acc[category]) acc[category] = [];
                    acc[category].push(product);

                    if (product.onSale > 0) {
                        if (!acc['On Sale']) acc['On Sale'] = [];
                        acc['On Sale'].push(product);
                    }

                    return acc;
                }, {});

                const sortedCategories = { 'On Sale': grouped['On Sale'], ...grouped };
                setGroupedProducts(sortedCategories);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleScroll = (category: string, direction: string) => {
        const scrollContainer = scrollRef.current[category];
        if (scrollContainer) {
            const scrollAmount = scrollContainer.clientWidth / 2;
            scrollContainer.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <>
            {Object.keys(groupedProducts).map((category) => (
                <section key={category} className="w-full my-8">
                    <h2 className="text-2xl font-semibold mb-4 text-brown-800">{category}</h2>
                    <div className="relative group">
                        <button
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 h-10 w-10 px-2 hidden group-hover:block text-white bg-black bg-opacity-50 z-10"
                            onClick={() => handleScroll(category, 'left')}
                        >
                            ←
                        </button>
                        <div
                            ref={(el) => {
                                scrollRef.current[category] = el;
                            }}
                            className="overflow-x-scroll overflow-y-hidden whitespace-nowrap scrollbar-hide relative w-full py-2"
                            style={{ maxHeight: '400px' }}
                        >
                            {groupedProducts[category].map((product) => (
                                <div key={product.id} className="inline-block px-2 h-auto w-[300px]">
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                        <button
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 h-10 w-10 px-2 hidden group-hover:block text-white bg-black bg-opacity-50 z-10"
                            onClick={() => handleScroll(category, 'right')}
                        >
                            →
                        </button>
                    </div>
                </section>
            ))}
        </>
    );
}