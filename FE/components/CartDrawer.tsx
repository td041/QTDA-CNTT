'use client';

import Link from "next/link";
import { useCart } from "./CartContext";

export default function CartDrawer() {
  const { isOpen, setOpen, items, total, remove, clear, updateQuantity } = useCart();

  return (
    <div className={`fixed inset-0 z-50 transition ${isOpen ? "" : "pointer-events-none"}`}>
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={() => setOpen(false)}
      />

      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md transform bg-white shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-gray-100 p-5">
          <h2 className="text-lg font-semibold">Giỏ hàng</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-sm font-semibold text-gray-500 transition hover:text-gray-700"
          >
            Đóng
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <p className="text-sm text-gray-600">
              Giỏ hàng đang trống. Thêm món từ menu để bắt đầu một bữa ăn lành mạnh hôm nay.
            </p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.meal.slug} className="rounded-2xl border p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-gray-900">{item.meal.name}</p>
                      <p className="text-sm text-gray-500">
                        {(item.meal.price * item.qty).toLocaleString("vi-VN")} ₫
                      </p>
                    </div>
                    <button
                      onClick={() => remove(item.meal.slug)}
                      className="text-sm font-semibold text-red-500 transition hover:text-red-600"
                    >
                      Xóa
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-xl border">
                      <button
                        onClick={() => updateQuantity(item.meal.slug, item.qty - 1)}
                        className="px-3 py-1 text-lg text-gray-600 transition hover:text-brand-700"
                        aria-label="Giảm số lượng"
                      >
                        -
                      </button>
                      <span className="px-4 text-sm font-semibold">{item.qty}</span>
                      <button
                        onClick={() => updateQuantity(item.meal.slug, item.qty + 1)}
                        className="px-3 py-1 text-lg text-gray-600 transition hover:text-brand-700"
                        aria-label="Tăng số lượng"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm text-gray-500">
                      {item.meal.cals} kcal - {item.meal.protein}g protein
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="space-y-4 border-t border-gray-100 p-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Tổng cộng</span>
            <span className="text-lg font-semibold text-brand-700">
              {total.toLocaleString("vi-VN")} ₫
            </span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={clear}
              className="flex-1 rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-red-200 hover:text-red-500"
            >
              Xóa tất cả
            </button>
            <Link
              href="/checkout"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-xl bg-brand-600 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Thanh toán
            </Link>
          </div>
        </footer>
      </aside>
    </div>
  );
}
