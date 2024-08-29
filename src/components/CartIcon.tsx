'use client';

import Image from 'next/image';
import useCart from '../hooks/useCart';

export default function CartIcon() {
    const { cartItems } = useCart();
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className="relative">
            <Image
                src="/carticon.png"
                alt="Cart"
                width={24}
                height={24}
            />
            {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {itemCount}
                </span>
            )}
        </div>
    );
}