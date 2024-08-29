'use client';

import { useEffect, useState } from 'react';
import ProductImage from '../../../components/ProductImage';
import ProductDetails from '../../../components/ProductDetails';
import QuantityButton from '../../../components/QuantityButton';
import RelatedProducts from '../../../components/RelatedProducts';
import SaleTag from '../../../components/SaleTag';
import useCart from '../../../hooks/useCart';

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

export default function ProductPage({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<Product | null>(null);
    const { cartItems } = useCart();
    const { id } = params;

    useEffect(() => {
        fetch(`http://localhost:5001/products/${id}`)
            .then((response) => response.json())
            .then((data) => {
                const cartItem = cartItems.find(item => item.id === data.id);
                setProduct({ ...data, quantity: cartItem ? cartItem.quantity : 0 });
            })
            .catch((error) => console.error('Error fetching product:', error));
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <main className="p-8 bg-beige-100 min-h-screen">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <ProductImage imageUrl={product.image} alt={product.title}>
                    {product.onSale && <SaleTag />}
                </ProductImage>
                <div>
                    <ProductDetails product={product} />
                    <QuantityButton product={product} />
                </div>
            </div>
            <RelatedProducts category={product.category} />
        </main>
    );
}