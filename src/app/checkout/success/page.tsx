'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { clearCart } from '../../../store/cartSlice';
import Link from 'next/link';

export default function SuccessPage() {
    const cartItemsFromStore = useSelector((state: RootState) => state.cart.cartItems);
    const shippingInfoFromStore = useSelector((state: RootState) => state.cart.shippingInfo);
    const dispatch = useDispatch();

    const [cartItems, setCartItems] = useState(cartItemsFromStore);
    const [shippingInfo, setShippingInfo] = useState(shippingInfoFromStore);

    useEffect(() => {
        if (cartItemsFromStore.length > 0 && shippingInfoFromStore) {
            dispatch(clearCart());
        }
    }, [cartItemsFromStore, shippingInfoFromStore, dispatch]);

    return (
        <main className="p-8 bg-beige-100 min-h-screen">
            <h1 className="text-3xl font-bold text-brown-800 mb-6">Order Successful</h1>
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
                <h2 className="text-xl text-brown-800 font-semibold mb-4">Order Summary</h2>
                <ul className="mb-4 text-brown-600">
                    {cartItems.map((item) => (
                        <li key={item.id}>
                            {item.title} (x{item.quantity})
                            {item.size && <p>Size: {item.size}</p>}
                            {item.color && <p>Color: {item.color}</p>}
                        </li>
                    ))}
                </ul>
                <Link href="/" className="text-center block w-full bg-green-500 text-white py-3 rounded-lg">
                    Continue Shopping
                </Link>
            </div>
        </main>
    );
}