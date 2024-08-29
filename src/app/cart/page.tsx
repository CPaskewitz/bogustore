'use client';

import useCart from '../../hooks/useCart';
import Image from 'next/image';

export default function CartPage() {
    const { cartItems } = useCart();

    return (
        <main className="p-8 bg-beige-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
            {cartItems.length > 0 ? (
                <ul className="space-y-4">
                    {cartItems.map((item) => (
                        <li key={item.id} className="flex items-center gap-4">
                            <Image
                                src={item.image}
                                alt={item.title}
                                width={100}
                                height={100}
                                className="rounded-lg"
                            />
                            <div>
                                <h2 className="text-xl font-bold">{item.title}</h2>
                                <p className="text-brown-600">${item.price.toFixed(2)}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </main>
    );
}