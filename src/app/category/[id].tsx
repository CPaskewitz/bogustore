import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';

export default function CategoryPage({ params }: { params: { id: string } }) {
    const [products, setProducts] = useState([]);
    const { id } = params;

    useEffect(() => {
        fetch(`http://localhost:5000/products?category=${id}`)
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching category products:', error));
    }, [id]);

    return (
        <main className="p-8 bg-beige-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Products in {id}</h1>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </main>
    );
}