'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartContext";
import { useOrder } from "@/components/OrderContext";
import { useAuth } from "@/components/AuthContext";

type FormState = {
  name: string;
  phone: string;
  address: string;
  note: string;
  payment: "transfer" | "cod";
};

const initialForm: FormState = {
  name: "",
  phone: "",
  address: "",
  note: "",
  payment: "transfer",
};

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const { placeOrder } = useOrder();
  const { user } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    ...initialForm,
    name: user?.name ?? "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!items.length) {
      setError("Giỏ hàng đang trống. Hãy thêm món trước khi thanh toán.");
      return;
    }
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      setError("Vui lòng nhập đầy đủ họ tên, số điện thoại và địa chỉ giao hàng.");
      return;
    }

    setLoading(true);
    setError(null);

    const order = placeOrder({
      items,
      total,
      delivery: {
        name: form.name.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        note: form.note.trim(),
        payment: form.payment,
      },
    });
    clear();
    setOrderId(order.id);
    setLoading(false);
  };

  if (orderId) {
    return (
      <div className="mx-auto max-w-3xl space-y-6 py-12 text-center">
        <h1 className="text-3xl font-semibold text-brand-700">Đặt hàng thành công!</h1>
        <p className="text-gray-600">
          Cảm ơn bạn đã tin tưởng FitFoodish. Đơn hàng đang được xử lý. Bạn có thể theo dõi tiến trình giao món
          trong mục Đơn hàng.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href={`/account/orders/${orderId}`}
            className="rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700"
          >
            Xem đơn hàng
          </Link>
          <button
            onClick={() => router.push("/menu")}
            className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700 transition hover:border-brand-200 hover:text-brand-700"
          >
            Tiếp tục mua sắm
          </button>
        </div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="mx-auto max-w-3xl space-y-6 py-12 text-center">
        <h1 className="text-3xl font-semibold text-gray-800">Giỏ hàng của bạn đang trống</h1>
        <p className="text-gray-600">Khám phá menu và thêm món yêu thích trước khi thanh toán nhé.</p>
        <Link
          href="/menu"
          className="inline-flex items-center rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700"
        >
          Xem menu
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl gap-8 py-12 lg:grid lg:grid-cols-[1.4fr_1fr]">
      <form onSubmit={handleSubmit} className="space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold">Thanh toán</h1>
          <p className="text-gray-600">
            Điền thông tin để chúng tôi giao món chính xác và nhanh chóng. Bản demo chưa kết nối cổng thanh toán.
          </p>
        </header>

        <section className="space-y-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Thông tin người nhận</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1 text-sm">
              <span className="font-semibold text-gray-700">Họ và tên</span>
              <input
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                className="w-full rounded-xl border px-4 py-2 focus:border-brand-500 focus:outline-none"
              />
            </label>
            <label className="space-y-1 text-sm">
              <span className="font-semibold text-gray-700">Số điện thoại</span>
              <input
                value={form.phone}
                onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                className="w-full rounded-xl border px-4 py-2 focus:border-brand-500 focus:outline-none"
              />
            </label>
          </div>
          <label className="space-y-1 text-sm">
            <span className="font-semibold text-gray-700">Địa chỉ giao</span>
            <input
              value={form.address}
              onChange={(event) => setForm((prev) => ({ ...prev, address: event.target.value }))}
              className="w-full rounded-xl border px-4 py-2 focus:border-brand-500 focus:outline-none"
            />
          </label>
          <label className="space-y-1 text-sm">
            <span className="font-semibold text-gray-700">Ghi chú cho shipper</span>
            <textarea
              rows={3}
              value={form.note}
              onChange={(event) => setForm((prev) => ({ ...prev, note: event.target.value }))}
              className="w-full rounded-xl border px-4 py-2 focus:border-brand-500 focus:outline-none"
            />
          </label>
        </section>

        <section className="space-y-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Phương thức thanh toán</h2>
          <div className="flex flex-col gap-3 text-sm">
            <label className="flex items-center gap-3 rounded-xl border px-4 py-3 transition hover:border-brand-200">
              <input
                type="radio"
                name="payment"
                checked={form.payment === "transfer"}
                onChange={() => setForm((prev) => ({ ...prev, payment: "transfer" }))}
              />
              <div>
                <p className="font-semibold text-gray-700">Chuyển khoản ngân hàng</p>
                <p className="text-gray-500">Nhận thông tin tài khoản sau khi đặt hàng.</p>
              </div>
            </label>
            <label className="flex items-center gap-3 rounded-xl border px-4 py-3 transition hover:border-brand-200">
              <input
                type="radio"
                name="payment"
                checked={form.payment === "cod"}
                onChange={() => setForm((prev) => ({ ...prev, payment: "cod" }))}
              />
              <div>
                <p className="font-semibold text-gray-700">Thanh toán khi nhận hàng</p>
                <p className="text-gray-500">Áp dụng cho đơn nội thành TP.HCM.</p>
              </div>
            </label>
          </div>
        </section>

        {error ? <p className="text-sm font-semibold text-red-500">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-brand-600 px-5 py-3 text-lg font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
        >
          {loading ? "Đang xử lý..." : "Xác nhận đặt hàng"}
        </button>
      </form>

      <aside className="mt-10 space-y-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:mt-16">
        <h2 className="text-lg font-semibold">Tóm tắt đơn hàng</h2>
        <ul className="space-y-3 text-sm">
          {items.map((item) => (
            <li key={item.meal.slug} className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">{item.meal.name}</p>
                <p className="text-gray-500">
                  x{item.qty} - {item.meal.cals} kcal
                </p>
              </div>
              <span className="font-semibold text-brand-700">
                {(item.meal.price * item.qty).toLocaleString("vi-VN")} ₫
              </span>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between border-t border-gray-100 pt-4 text-sm font-semibold">
          <span>Tổng cộng</span>
          <span className="text-lg text-brand-700">{total.toLocaleString("vi-VN")} ₫</span>
        </div>
      </aside>
    </div>
  );
}
