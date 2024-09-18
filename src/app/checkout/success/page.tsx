'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { clearCart } from '../../../store/cartSlice';
import Link from 'next/link';

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

export default function SuccessPage() {
    const cartItemsFromStore = useSelector((state: RootState) => state.cart.cartItems);
    const shippingInfoFromStore = useSelector((state: RootState) => state.cart.shippingInfo);
    const dispatch = useDispatch();

    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [shippingInfo, setShippingInfo] = useState<{ fullName: string; address: string; email: string } | null>(null);

    useEffect(() => {
        if (cartItemsFromStore.length > 0 && shippingInfoFromStore) {
            setCartItems(cartItemsFromStore);
            setShippingInfo(shippingInfoFromStore);
            dispatch(clearCart());
        }
    }, [cartItemsFromStore, shippingInfoFromStore, dispatch]);

    const calculateDiscountedPrice = (price: number, discount: number) => {
        return discount ? price - (price * discount) / 100 : price;
    };

    if (!shippingInfo || cartItems.length === 0) {
        return (
            <main className="p-8 bg-beige-100 min-h-screen">
                <h1 className="text-3xl font-bold text-brown-800 mb-6">No items have been purchased...</h1>
            </main>
        );
    }

    return (
        <main className="p-8 bg-beige-100 min-h-screen">
            <h1 className="text-3xl font-bold text-brown-800 mb-6">Order Successful</h1>
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
                <h2 className="text-xl text-brown-800 font-semibold mb-4">Order Summary</h2>
                <ul className="mb-4 text-brown-600">
                    {cartItems.map((item) => (
                        <li key={item.id} className="mb-2">
                            {item.title} (x{item.quantity}) -{' '}
                            {item.onSale > 0 ? (
                                <>
                                    <span className="line-through">${(item.price * item.quantity).toFixed(2)}</span>{' '}
                                    <span className="text-green-600">${calculateDiscountedPrice(item.price, item.onSale).toFixed(2)}</span>
                                </>
                            ) : (
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            )}
                        </li>
                    ))}
                </ul>
                <p className="font-bold mb-4">
                    Total:{' '}
                    <span className="line-through">
                        ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                    </span>{' '}
                    <span className="text-green-600">
                        ${cartItems
                            .reduce(
                                (total, item) =>
                                    total + calculateDiscountedPrice(item.price, item.onSale) * item.quantity,
                                0
                            )
                            .toFixed(2)}
                    </span>
                </p>

                <h2 className="text-xl text-brown-800 font-semibold mb-4">Shipping To</h2>
                <p className="mb-2">
                    <strong>Name:</strong> {shippingInfo.fullName}
                </p>
                <p className="mb-2">
                    <strong>Address:</strong> {shippingInfo.address}
                </p>
                <p className="mb-4">
                    <strong>Email:</strong> {shippingInfo.email}
                </p>

                <p className="text-green-600 mb-4">An email confirmation has been sent to {shippingInfo.email}.</p>

                <Link href="/" className="text-center block w-full bg-green-500 text-white py-3 rounded-lg">
                    Continue Shopping
                </Link>
            </div>
        </main>
    );
}