import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const saveCartToLocalStorage = (cartItems: Product[]) => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
};

const loadCartFromLocalStorage = (): Product[] => {
    if (typeof window !== 'undefined') {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
};

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

// Initialize state from local storage
const initialState: CartState = {
    cartItems: loadCartFromLocalStorage(),
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
            saveCartToLocalStorage(state.cartItems);  // Save to local storage
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
            saveCartToLocalStorage(state.cartItems);
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
            saveCartToLocalStorage(state.cartItems);
        },
        clearCart: (state) => {
            state.cartItems = [];
            localStorage.removeItem('cart');  
        },
    },
});

export const { addToCart, updateCartQuantity, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;