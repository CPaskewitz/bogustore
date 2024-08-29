'use client';
import { useState, useEffect } from 'react';

type Product = {
    id: number;
    title: string;
    image: string;
    price: number;
};

export default function useCart() {
    const [cartItems, setCartItems] = useState<Product[]>([]);

    useEffect(() => {
        const savedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        setCartItems(savedCartItems);
    }, []);

    const addToCart = (product: Product) => {
        const updatedCartItems = [...cartItems, product];
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    return { cartItems, addToCart };
}