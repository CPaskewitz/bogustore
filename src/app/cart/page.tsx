'use client';

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
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <main className="p-8 bg-beige-100 min-h-screen">
            <h1 className="text-3xl font-bold text-brown-800 mb-6">Your Cart</h1>
            {cartItems.length > 0 ? (
                <>
                    <ul className="space-y-6">
                        {cartItems.map((item) => (
                            <li key={item.id} className="flex items-center bg-white border border-gray-200 rounded-lg p-4 shadow-md gap-6">
                                <div className="w-24 h-24 flex-shrink-0">
                                    <Image
                                        src={`/${item.image}`}
                                        alt={item.title}
                                        width={96}
                                        height={96}
                                        className="object-cover w-full h-full rounded-lg"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <Link href={`/product/${item.id}`} className="text-xl font-bold text-brown-800 hover:text-soft-coral transition-colors">
                                        {item.title}
                                    </Link>
                                    {item.size && <p>Size: {item.size}</p>}
                                    {item.color && <p>Color: {item.color}</p>}
                                    <div className="flex items-center space-x-2 mt-2">
                                        <button
                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1, item.size, item.color)}
                                            className="bg-gray-200 text-brown-800 px-2 py-1 rounded"
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="px-2 text-brown-800 font-semibold">{item.quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1, item.size, item.color)}
                                            className="bg-gray-200 text-brown-800 px-2 py-1 rounded"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleRemoveItem(item.id, item.size, item.color)}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
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