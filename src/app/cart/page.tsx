'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { updateCartQuantity, removeFromCart } from '../../store/cartSlice';
import Image from 'next/image';

export default function CartPage() {
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const dispatch = useDispatch();

    const handleRemoveItem = (id: number) => {
        dispatch(removeFromCart(id));
    };

    const handleQuantityChange = (id: number, newQuantity: number) => {
        dispatch(updateCartQuantity({ id, quantity: newQuantity }));
    };

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
                            <div className="flex-grow">
                                <h2 className="text-xl font-bold">{item.title}</h2>
                                <p className="text-brown-600">${item.price.toFixed(2)}</p>
                                <div className="flex items-center space-x-2 mt-2">
                                    <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} className="bg-gray-200 text-brown-800 px-2 py-1 rounded">
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    {item.quantity < item.inventory && (
                                        <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} className="bg-gray-200 text-brown-800 px-2 py-1 rounded">
                                            +
                                        </button>
                                    )}
                                </div>
                            </div>
                            <button onClick={() => handleRemoveItem(item.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </main>
    );
}