'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { updateCartQuantity, removeFromCart } from '../../store/cartSlice';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const dispatch = useDispatch();

    const handleRemoveItem = (id: number, size?: string, color?: string) => {
        dispatch(removeFromCart({ id, size, color }));
    };

    const handleQuantityChange = (id: number, newQuantity: number, size?: string, color?: string) => {
        dispatch(updateCartQuantity({ id, quantity: newQuantity, size, color }));
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, product) => {
            const salePrice = product.onSale > 0 ? product.price * (1 - product.onSale / 100) : product.price;
            return total + salePrice * product.quantity;
        }, 0);
    };

    return (
        <main className="p-8 bg-beige-100 min-h-screen">
            <h1 className="text-3xl font-bold text-brown-800 mb-6">Your Cart</h1>
            {cartItems.length > 0 ? (
                <>
                    <ul className="space-y-6">
                        {cartItems.map((product, index) => {
                            const salePrice = product.onSale > 0 ? product.price * (1 - product.onSale / 100) : product.price;

                            return (
                                <li key={`${product.id}-${product.size}-${product.color}-${index}`} className="flex items-center bg-white border border-gray-200 rounded-lg p-4 shadow-md gap-6">
                                    <div className="w-24 h-24 flex-shrink-0">
                                        <Image
                                            src={`/${product.image}`}
                                            alt={product.title}
                                            width={96}
                                            height={96}
                                            className="object-cover w-full h-full rounded-lg"
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <Link href={`/product/${product.id}`} className="text-xl font-bold text-brown-800 hover:text-soft-coral transition-colors">
                                            {product.title}
                                        </Link>
                                        <div className="text-brown-600">
                                            {product.onSale > 0 ? (
                                                <>
                                                    <p>
                                                        <span className="line-through mr-2">${product.price.toFixed(2)}</span>
                                                        <span className="text-soft-coral">${salePrice.toFixed(2)}</span>
                                                    </p>
                                                </>
                                            ) : (
                                                <p>Price: ${product.price.toFixed(2)}</p>
                                            )}
                                        </div>
                                        {product.size && <p className="text-brown-600">Size: {product.size}</p>}
                                        {product.color && <p className="text-brown-600">Color: {product.color}</p>}
                                        <div className="flex items-center space-x-2 mt-2">
                                            <button
                                                onClick={() => handleQuantityChange(product.id, product.quantity - 1, product.size, product.color)}
                                                className="bg-gray-200 text-brown-800 px-2 py-1 rounded"
                                                disabled={product.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="px-2 text-brown-800 font-semibold">{product.quantity}</span>
                                            <button
                                                onClick={() => handleQuantityChange(product.id, product.quantity + 1, product.size, product.color)}
                                                className="bg-gray-200 text-brown-800 px-2 py-1 rounded"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveItem(product.id, product.size, product.color)}
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                        Remove
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="mt-8 flex justify-between items-center bg-white border border-gray-200 p-4 rounded-lg shadow-md">
                        <span className="text-2xl font-bold text-brown-800">Total: ${calculateTotalPrice().toFixed(2)}</span>
                        <Link href="/checkout" className="bg-green-500 text-white px-6 py-3 rounded-lg">
                            Checkout
                        </Link>
                    </div>
                </>
            ) : (
                <p className="text-gray-700">Your cart is empty.</p>
            )}
        </main>
    );
}