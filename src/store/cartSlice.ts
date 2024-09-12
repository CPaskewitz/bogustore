import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Product = {
    id: number;
    title: string;
    image: string;
    details: string;
    price: number;
    category: string;
    onSale: boolean;
    inventory: number;
    quantity: number;
};

type CartState = {
    cartItems: Product[];
};

const initialState: CartState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingItem = state.cartItems.find(item => item.id === action.payload.id);
            if (existingItem) {
                if (existingItem.quantity < existingItem.inventory) {
                    existingItem.quantity += 1;
                }
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }
        },
        updateCartQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const item = state.cartItems.find(item => item.id === action.payload.id);
            if (item) {
                if (action.payload.quantity === 0) {
                    state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
                } else if (action.payload.quantity <= item.inventory) {
                    item.quantity = action.payload.quantity;
                }
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        },
    },
});

export const { addToCart, updateCartQuantity, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;