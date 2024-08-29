'use client';

import { useState, useEffect } from 'react';
import useCart from '../hooks/useCart';

type Product = {
    id: number;
    title: string;
    image: string;
    price: number;
    quantity?: number;
};

export default function QuantityButton({ product }: { product: Product }) {
    const { cartItems, addToCart, updateCartQuantity, removeFromCart } = useCart();
    const cartItem = cartItems.find(item => item.id === product.id);
    const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 0);

    useEffect(() => {
        if (cartItem) {
            setQuantity(cartItem.quantity);
        }
    }, [cartItem]);

    const handleAddToCart = () => {
        if (quantity === 0) {
            addToCart({ ...product, quantity: 1 });
            setQuantity(1);
        }
    };

    const increaseQuantity = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        updateCartQuantity(product.id, newQuantity);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            updateCartQuantity(product.id, newQuantity);
        } else {
            setQuantity(0);
            removeFromCart(product.id);
        }
    };

    return (
        <div className="flex items-center space-x-2">
            {quantity === 0 ? (
                <button className="bg-muted-blue text-white px-4 py-2 rounded" onClick={handleAddToCart}>
                    Add to Cart
                </button>
            ) : (
                <>
                    <button className="bg-gray-200 text-brown-800 px-2 py-1 rounded" onClick={decreaseQuantity}>
                        -
                    </button>
                    <span className="text-brown-800">{quantity}</span>
                    <button className="bg-gray-200 text-brown-800 px-2 py-1 rounded" onClick={increaseQuantity}>
                        +
                    </button>
                </>
            )}
        </div>
    );
}