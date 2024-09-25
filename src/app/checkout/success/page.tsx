'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { clearCart } from '../../../store/cartSlice';
import Link from 'next/link';

export default function SuccessPage() {
    const cartItemsFromStore = useSelector((state: RootState) => state.cart.cartItems);
    const shippingInfoFromStore = useSelector((state: RootState) => state.cart.shippingInfo);
    const dispatch = useDispatch();

    useEffect(() => {
        if (cartItemsFromStore.length > 0 && shippingInfoFromStore) {
            dispatch(clearCart());
        }
    }, [cartItemsFromStore, shippingInfoFromStore, dispatch]);

    const calculateTotalPrice = () => {
        return cartItemsFromStore.reduce((total, product) => {
            const salePrice = product.onSale > 0 ? product.price * (1 - product.onSale / 100) : product.price;
            return total + salePrice * product.quantity;
        }, 0);
    };

    return (
        <main className="p-8 bg-beige-100 min-h-screen">
            <h1 className="text-3xl font-bold text-brown-800 mb-6">Order Successful</h1>
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
                <h2 className="text-xl text-brown-800 font-semibold mb-4">Order Summary</h2>
                <ul className="mb-4 text-brown-600">
                    {cartItemsFromStore.map((item, index) => {
                        const salePrice = item.onSale > 0 ? item.price * (1 - item.onSale / 100) : item.price;
                        return (
                            <li key={`${item.id}-${item.size}-${item.color}-${index}`} className="mb-4">
                                <span>{item.title} (x{item.quantity})</span>
                                <div className="text-brown-600">
                                    {item.onSale > 0 ? (
                                        <>
                                            <p>
                                                <span className="line-through mr-2">${item.price.toFixed(2)}</span>
                                                <span className="text-soft-coral">${salePrice.toFixed(2)}</span>
                                            </p>
                                        </>
                                    ) : (
                                        <p>Price: ${item.price.toFixed(2)}</p>
                                    )}
                                </div>
                                {item.size && <p>Size: {item.size}</p>}
                                {item.color && <p>Color: {item.color}</p>}
                            </li>
                        );
                    })}
                </ul>
                <div className="mb-4 text-xl font-bold text-brown-800">
                    Total Price: ${calculateTotalPrice().toFixed(2)}
                </div>
                <Link href="/" className="text-center block w-full bg-green-500 text-white py-3 rounded-lg">
                    Continue Shopping
                </Link>
            </div>
        </main>
    );
}