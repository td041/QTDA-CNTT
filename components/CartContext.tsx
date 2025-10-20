'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Meal } from "@/lib/data/meals";

export type CartItem = { meal: Meal; qty: number };

type CartState = {
  items: CartItem[];
  add: (meal: Meal, qty?: number) => void;
  updateQuantity: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  total: number;
  count: number;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

const CartContext = createContext<CartState | undefined>(undefined);
const storageKey = "fitfoodish-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(storageKey);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as CartItem[];
        setItems(parsed);
      } catch (error) {
        console.warn("Không thể đọc giỏ hàng từ localStorage", error);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items, hydrated]);

  const add = (meal: Meal, qty = 1) => {
    setItems((prev) => {
      const index = prev.findIndex((item) => item.meal.slug === meal.slug);
      if (index >= 0) {
        const next = [...prev];
        next[index] = { ...next[index], qty: next[index].qty + qty };
        return next;
      }
      return [...prev, { meal, qty }];
    });
    setOpen(true);
  };

  const updateQuantity = (slug: string, qty: number) => {
    setItems((prev) => {
      const index = prev.findIndex((item) => item.meal.slug === slug);
      if (index === -1) return prev;
      if (qty <= 0) {
        return prev.filter((item) => item.meal.slug !== slug);
      }
      const next = [...prev];
      next[index] = { ...next[index], qty };
      return next;
    });
  };

  const remove = (slug: string) => {
    setItems((prev) => prev.filter((item) => item.meal.slug !== slug));
  };

  const clear = () => setItems([]);

  const { total, count } = useMemo(() => {
    const totals = items.reduce(
      (acc, item) => {
        acc.total += item.meal.price * item.qty;
        acc.count += item.qty;
        return acc;
      },
      { total: 0, count: 0 },
    );
    return totals;
  }, [items]);

  const value: CartState = {
    items,
    add,
    updateQuantity,
    remove,
    clear,
    total,
    count,
    isOpen,
    setOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
