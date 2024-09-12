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

export default function RelatedProducts({ category, currentProductId }: { category: string, currentProductId: number }) {
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch(`http://localhost:5001/products?category=${category}`)
            .then(response => response.json())
            .then(data => {
                const filteredProducts = data.filter((product: Product) => product.id !== currentProductId);
                setRelatedProducts(filteredProducts);
            })
            .catch(error => console.error('Error fetching related products:', error));
    }, [category, currentProductId]);

    return (
        <section className="mt-12">
            <h2 className="text-3xl font-bold text-brown-800 mb-6">Related Products</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {relatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}