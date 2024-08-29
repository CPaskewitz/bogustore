'use client';
import { useState, useEffect } from 'react';

type Product = {
    id: number;
    title: string;
    image: string;
    price: number;
    quantity: number;
};

export default function useCart() {
    const [cartItems, setCartItems] = useState<Product[]>([]);

    useEffect(() => {
        const savedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        setCartItems(savedCartItems);
    }, []);

    const addToCart = (product: Product) => {
        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
            updateCartQuantity(product.id, existingItem.quantity + 1);
        } else {
            const updatedCartItems = [...cartItems, { ...product, quantity: 1 }];
            setCartItems(updatedCartItems);
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        }
    };

    const updateCartQuantity = (id: number, quantity: number) => {
        const updatedCartItems = cartItems.map(item =>
            item.id === id ? { ...item, quantity } : item
        ).filter(item => item.quantity > 0);

        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    const removeFromCart = (id: number) => {
        const updatedCartItems = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    return { cartItems, addToCart, updateCartQuantity, removeFromCart };
}