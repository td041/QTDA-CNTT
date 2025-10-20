'use client';

import { useCart } from "@/components/CartContext";
import type { Meal } from "@/lib/data/meals";

export default function AddToCartButton({ meal }: { meal: Meal }) {
  const { add } = useCart();

  return (
    <button
      type="button"
      onClick={() => add(meal)}
      className="rounded-xl bg-brand-600 px-4 py-2 font-semibold text-white transition hover:bg-brand-700"
    >
      Thêm vào giỏ
    </button>
  );
}
