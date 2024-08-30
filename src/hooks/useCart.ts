'use client';
import { useState, useEffect, useCallback } from 'react';

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

    const addToCart = useCallback((product: Product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                const updatedCartItems = [...prevItems, { ...product, quantity: 1 }];
                localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
                return updatedCartItems;
            }
        });
    }, []);

    const updateCartQuantity = useCallback((id: number, quantity: number) => {
        setCartItems(prevItems => {
            const updatedCartItems = prevItems
                .map(item => (item.id === id ? { ...item, quantity } : item))
                .filter(item => item.quantity > 0);

            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
            return updatedCartItems;
        });
    }, []);

    const removeFromCart = useCallback((id: number) => {
        setCartItems(prevItems => {
            const updatedCartItems = prevItems.filter(item => item.id !== id);
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
            return updatedCartItems;
        });
    }, []);

    return { cartItems, addToCart, updateCartQuantity, removeFromCart };
}