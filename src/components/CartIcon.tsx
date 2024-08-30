'use client';

import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default function CartIcon() {
    const itemCount = useSelector((state: RootState) =>
        state.cart.cartItems.reduce((total, item) => total + item.quantity, 0)
    );

    return (
        <div className="relative">
            <Image
                src="/carticon.png"
                alt="Cart"
                width={30}
                height={30}
            />
            {itemCount > 0 && (
                <span className="absolute -bottom-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {itemCount}
                </span>
            )}
        </div>
    );
}