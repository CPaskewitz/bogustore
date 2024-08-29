import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

export default function RelatedProducts({ category }: { category: string }) {
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/products?category=${category}`)
            .then(response => response.json())
            .then(data => setRelatedProducts(data))
            .catch(error => console.error('Error fetching related products:', error));
    }, [category]);

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