// src/store/cartStore.ts
import { create } from "zustand";

interface Package {
  id: string;
  title: string;
  price: number;
  image?: string; // Optional, matches your usage
  quantity?: number; // Added quantity property
}

interface CartState {
  items: Package[];
  addToCart: (item: Package) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
          ),
        };
      }
      return {
        items: [...state.items, { ...item, quantity: 1 }],
      };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),

  clearCart: () => set({ items: [] }),

  getCartTotal: () =>
    get().items.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    ),

  getCartCount: () =>
    get().items.reduce((count, item) => count + (item.quantity || 1), 0),
}));
