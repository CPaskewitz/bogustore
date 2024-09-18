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

type ShippingInfo = {
    fullName: string;
    address: string;
    email: string;
};

type CartState = {
    cartItems: Product[];
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