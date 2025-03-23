import {create} from "zustand/react";
import {CartModel} from '@/src/models/cart';
import {ProductModel} from '@/src/models/product';

interface CartState {
    cart: CartModel;
    addItem: (product: ProductModel, quantity: number) => void;
    removeItem: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
}

const useCartStore = create<CartState>((set) => ({
    cart: {items: [], total: 0},
    addItem: (product, quantity) => set((state) => {
        const existingItem = state.cart.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            state.cart.items.push({product, quantity});
        }
        state.cart.total += product.price * quantity;
        return {...state};
    }),
    removeItem: (productId) => set((state) => {
        const itemIndex = state.cart.items.findIndex(item => item.product.id === productId);
        if (itemIndex > -1) {
            const item = state.cart.items[itemIndex];
            state.cart.total -= item.product.price * item.quantity;
            state.cart.items.splice(itemIndex, 1);
        }
        return {...state};
    }),
    updateQuantity: (productId, quantity) => set((state) => {
        const item = state.cart.items.find(item => item.product.id === productId);
        if (item) {
            state.cart.total += item.product.price * (quantity - item.quantity);
            item.quantity = quantity;
        }
        return {...state};
    }),
    clearCart: () => set(() => ({cart: {items: [], total: 0}})),
}));

export default useCartStore;