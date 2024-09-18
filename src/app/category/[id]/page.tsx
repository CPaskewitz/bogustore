'use client';

import { useEffect, useState } from 'react';
import ProductCard from '../../../components/ProductCard';
import Pagination from '../../../components/Pagination';

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

export default function CategoryPage({ params }: { params: { id: string } }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const productsPerPage = 9;
    const { id } = params;

    useEffect(() => {
        fetch(`/api/products?category=${id}`)
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                setTotalPages(Math.ceil(data.length / productsPerPage));
            })
            .catch(error => console.error('Error fetching category products:', error));
    }, [id]);

    const currentProducts = products.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

    return (
        <main className="p-8 bg-beige-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 capitalize">Products in {id}</h1>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {currentProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </main>
    );
}