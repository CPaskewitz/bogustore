import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

export default function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <section className="w-full grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </section>
    );
}