import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProductImage from '../../components/ProductImage';
import ProductDetails from '../../components/ProductDetails';
import Button from '../../components/Button';
import RelatedProducts from '../../components/RelatedProducts';

export default function ProductPage({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState(null);
    const { id } = params;

    useEffect(() => {
        fetch(`http://localhost:5000/products/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.error('Error fetching product:', error));
    }, [id]);

    const handleAddToCart = () => {
        console.log(`${product.name} added to cart`);
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <main className="p-8 bg-beige-100 min-h-screen">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <ProductImage imageUrl={product.imageUrl} alt={product.name} />
                <div>
                    <ProductDetails product={product} />
                    <Button label="Add to Cart" onClick={handleAddToCart} />
                </div>
            </div>
            <RelatedProducts />
        </main>
    );
}