import { create } from "zustand";

interface Package {
  id: string;
  title: string;
  price: number;
  image?: string;
  quantity?: number;
}

interface CartState {
  items: Package[];
  addToCart: (item: Package) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  updateQuantity: (id: string, newQuantity: number) => void;
  reduceQuantity: (id: string) => void;
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

  updateQuantity: (id, newQuantity) =>
    set((state) => {
      if (newQuantity <= 0) {
        return {
          items: state.items.filter((i) => i.id !== id),
        };
      }
      return {
        items: state.items.map((i) =>
          i.id === id ? { ...i, quantity: newQuantity } : i
        ),
      };
    }),

  reduceQuantity: (id) =>
    set((state) => {
      const updatedItems = state.items
        .map((i) => {
          if (i.id === id) {
            const currentQuantity = i.quantity || 1;
            const newQuantity = currentQuantity - 1;
            if (newQuantity <= 0) {
              return null;
            }
            return { ...i, quantity: newQuantity };
          }
          return i;
        })
        .filter((i): i is Package => i !== null);

      return { items: updatedItems };
    }),
}));