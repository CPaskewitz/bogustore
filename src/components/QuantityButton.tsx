'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addToCart, updateCartQuantity, removeFromCart } from '../store/cartSlice';

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

type QuantityButtonProps = {
    product: Product;
    selectedSize?: string | null;
    selectedColor?: string | null;
    handleUpdateQuantity: (quantity: number) => void;
};

export default function QuantityButton({ product, selectedSize, selectedColor, handleUpdateQuantity }: QuantityButtonProps) {
    const cartItem = useSelector((state: RootState) =>
        state.cart.cartItems.find(
            item =>
                item.id === product.id &&
                (selectedSize ? item.size === selectedSize : true) &&
                (selectedColor ? item.color === selectedColor : true)
        )
    );
    const dispatch = useDispatch();
    const quantity = cartItem ? cartItem.quantity : 0;

    const handleAddToCartClick = () => {
        if (quantity === 0) {
            dispatch(addToCart({
                product,
                size: selectedSize ?? undefined,
                color: selectedColor ?? undefined,
            }));
            handleUpdateQuantity(1);
        }
    };

    const increaseQuantityHandler = () => {
        if (quantity < product.inventory) {
            const newQuantity = quantity + 1;
            dispatch(updateCartQuantity({
                id: product.id,
                quantity: newQuantity,
                size: selectedSize ?? undefined,
                color: selectedColor ?? undefined,
            }));
            handleUpdateQuantity(newQuantity);
        }
    };

    const decreaseQuantityHandler = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            dispatch(updateCartQuantity({
                id: product.id,
                quantity: newQuantity,
                size: selectedSize ?? undefined,
                color: selectedColor ?? undefined,
            }));
            handleUpdateQuantity(newQuantity);
        } else {
            dispatch(removeFromCart({
                id: product.id,
                size: selectedSize ?? undefined,
                color: selectedColor ?? undefined,
            }));
            handleUpdateQuantity(0);
        }
    };

    return (
        <div className="flex items-center space-x-2">
            {quantity === 0 ? (
                <button className="bg-muted-blue text-white px-4 py-2 rounded" onClick={handleAddToCartClick}>
                    Add to Cart
                </button>
            ) : (
                <>
                    <button className="bg-gray-200 text-brown-800 px-2 py-1 rounded" onClick={decreaseQuantityHandler}>
                        -
                    </button>
                    <span className="text-brown-800">{quantity}</span>
                    {quantity < product.inventory && (
                        <button className="bg-gray-200 text-brown-800 px-2 py-1 rounded" onClick={increaseQuantityHandler}>
                            +
                        </button>
                    )}
                </>
            )}
        </div>
    );
}