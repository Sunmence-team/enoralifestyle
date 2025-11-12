// src/store/cartStore.ts
import { create } from 'zustand';

interface Package {
  id: string;
  title: string;
  price: number;
  image?: string; // Optional, matches your usage
}

interface CartState {
  items: Package[];
  addToCart: (item: Package) => void;
  removeFromCart: (id: string) => void;// <-- NEW
  clearCart: () => void;                    // <-- NEW
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addToCart: (item) => set((state) => ({ items: [...state.items, item] })),
  removeFromCart: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  clearCart: () => set({ items: [] }),
  getCartTotal: () => get().items.reduce((total, item) => total + item.price, 0),
  getCartCount: () => get().items.length,
}));