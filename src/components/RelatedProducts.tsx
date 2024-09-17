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
        fetch(`/api/products?category=${category}`)
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
            <div className="w-full overflow-x-scroll whitespace-nowrap py-4">
                {relatedProducts.map((product) => (
                    <div key={product.id} className="inline-block px-2">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </section>
    );
}