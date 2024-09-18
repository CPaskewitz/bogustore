import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

type CartItem = Product & {
    size?: string;
    color?: string;
};

type ShippingInfo = {
    fullName: string;
    address: string;
    email: string;
};

type CartState = {
    cartItems: CartItem[];
    shippingInfo: ShippingInfo | null;
};

const initialState: CartState = {
    cartItems: [],
    shippingInfo: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<{ product: Product; size?: string; color?: string }>) => {
            const { product, size, color } = action.payload;
            const existingItem = state.cartItems.find(
                item => item.id === product.id && item.size === size && item.color === color
            );

            if (existingItem) {
                if (existingItem.quantity < existingItem.inventory) {
                    existingItem.quantity += 1;
                }
            } else {
                state.cartItems.push({ ...product, quantity: 1, size, color });
            }
        },
        updateCartQuantity: (state, action: PayloadAction<{ id: number; quantity: number; size?: string; color?: string }>) => {
            const { id, quantity, size, color } = action.payload;
            const item = state.cartItems.find(item => item.id === id && item.size === size && item.color === color);
            if (item) {
                if (quantity === 0) {
                    state.cartItems = state.cartItems.filter(
                        item => !(item.id === id && item.size === size && item.color === color)
                    );
                } else if (quantity <= item.inventory) {
                    item.quantity = quantity;
                }
            }
        },
        removeFromCart: (state, action: PayloadAction<{ id: number; size?: string; color?: string }>) => {
            const { id, size, color } = action.payload;
            state.cartItems = state.cartItems.filter(item => !(item.id === id && item.size === size && item.color === color));
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.shippingInfo = null;
        },
        setShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
            state.shippingInfo = action.payload;
        },
    },
});

export const { addToCart, updateCartQuantity, removeFromCart, clearCart, setShippingInfo } = cartSlice.actions;

export default cartSlice.reducer;