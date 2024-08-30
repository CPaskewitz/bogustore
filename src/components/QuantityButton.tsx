'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addToCart, updateCartQuantity, removeFromCart } from '../store/cartSlice';

type Product = {
    id: number;
    title: string;
    image: string;
    price: number;
    quantity: number;
    inventory: number;
};

export default function QuantityButton({ product }: { product: Product }) {
    const cartItem = useSelector((state: RootState) =>
        state.cart.cartItems.find(item => item.id === product.id)
    );
    const dispatch = useDispatch();
    const quantity = cartItem ? cartItem.quantity : 0;

    const handleAddToCart = () => {
        if (quantity === 0) {
            dispatch(addToCart(product));
        }
    };

    const increaseQuantity = () => {
        if (quantity < product.inventory) {
            dispatch(updateCartQuantity({ id: product.id, quantity: quantity + 1 }));
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            dispatch(updateCartQuantity({ id: product.id, quantity: quantity - 1 }));
        } else {
            dispatch(removeFromCart(product.id));
        }
    };

    return (
        <div className="flex items-center space-x-2">
            {quantity === 0 ? (
                <button className="bg-muted-blue text-white px-4 py-2 rounded" onClick={handleAddToCart}>
                    Add to Cart
                </button>
            ) : (
                <>
                    <button className="bg-gray-200 text-brown-800 px-2 py-1 rounded" onClick={decreaseQuantity}>
                        -
                    </button>
                    <span className="text-brown-800">{quantity}</span>
                    {quantity < product.inventory && (
                        <button className="bg-gray-200 text-brown-800 px-2 py-1 rounded" onClick={increaseQuantity}>
                            +
                        </button>
                    )}
                </>
            )}
        </div>
    );
}