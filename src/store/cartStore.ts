import {create} from 'zustand';

interface Package {
  id: string;
  title: string;
  price: number;
  image: string;
}

interface CartState {
  items: Package[];
  addToCart: (item: Package) => void;
  removeFromCart: (id: string) => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addToCart: (item) => set((state) => ({ items: [...state.items, item] })),
  removeFromCart: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  getCartTotal: () => get().items.reduce((total, item) => total + item.price, 0),
  getCartCount: () => get().items.length,
}));
