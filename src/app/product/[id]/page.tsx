'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductImage from '../../../components/ProductImage';
import ProductDetails from '../../../components/ProductDetails';
import QuantityButton from '../../../components/QuantityButton';
import RelatedProducts from '../../../components/RelatedProducts';
import SaleTag from '../../../components/SaleTag';
import { RootState } from '../../../store';
import { updateCartQuantity } from '../../../store/cartSlice';

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
};

export default function ProductPage({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<Product | null>(null);
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const { id } = params;

    useEffect(() => {
        fetch(`/api/products/${id}`)
            .then((response) => response.json())
            .then((data) => {
                const cartItem = cartItems.find(item => item.id === data.id);
                setProduct({ ...data, quantity: cartItem ? cartItem.quantity : 0 });
            })
            .catch((error) => console.error('Error fetching product:', error));
    }, [id, cartItems]);

    const handleUpdateQuantity = (quantity: number) => {
        if (product) {
            dispatch(updateCartQuantity({ id: product.id, quantity }));
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <main className="p-8 bg-beige-100 min-h-screen">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-start">
                    <ProductImage imageUrl={`/${product.image}`} alt={product.title}>
                        {product.onSale > 0 && <SaleTag discount={product.onSale} />}
                    </ProductImage>
                </div>
                <div className="flex flex-col justify-between" style={{ minHeight: '400px' }}>
                    <ProductDetails product={product} />
                    <QuantityButton product={product} handleUpdateQuantity={handleUpdateQuantity} />
                </div>
            </div>
            <RelatedProducts category={product.category} currentProductId={product.id} />
        </main>
    );
}