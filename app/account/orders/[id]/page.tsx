'use client';

import Link from "next/link";
import { useMemo } from "react";
import { ORDER_STATUS_FLOW, ORDER_STATUS_LABELS, useOrder } from "@/components/OrderContext";

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const { getOrder } = useOrder();
  const order = getOrder(params.id);

  const historyMap = useMemo(() => {
    if (!order) return new Map<string, string>();
    return new Map(order.history.map((entry) => [entry.status, entry.timestamp]));
  }, [order]);

  if (!order) {
    return (
      <div className="space-y-4 rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
        <p className="text-lg font-semibold text-gray-800">Không tìm thấy đơn hàng</p>
        <Link href="/account/orders" className="text-sm font-semibold text-brand-700 hover:underline">
          Quay lại danh sách đơn
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link href="/account/orders" className="text-sm font-semibold text-brand-700 hover:underline">
        ← Quay lại danh sách đơn
      </Link>

      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">Đơn hàng {order.code}</h1>
        <p className="text-gray-600">
          Tạo lúc {new Date(order.createdAt).toLocaleString("vi-VN")} - Cập nhật{" "}
          {new Date(order.updatedAt).toLocaleString("vi-VN")}
        </p>
      </header>

      <section className="space-y-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Tiến trình giao hàng</h2>
        <div className="grid gap-4 md:grid-cols-5">
          {ORDER_STATUS_FLOW.map((status) => {
            const info = ORDER_STATUS_LABELS[status];
            const timestamp = historyMap.get(status);
            const isDone = historyMap.has(status);
            return (
              <div
                key={status}
                className={`rounded-xl border p-4 text-sm ${
                  isDone ? "border-brand-200 bg-brand-50 text-brand-700" : "border-gray-100 text-gray-500"
                }`}
              >
                <p className="font-semibold">{info.label}</p>
                <p className="mt-2 text-xs text-gray-500">{info.description}</p>
                {timestamp ? (
                  <p className="mt-3 text-xs text-gray-400">
                    {new Date(timestamp).toLocaleString("vi-VN")}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Chi tiết món ăn</h2>
        <ul className="space-y-3">
          {order.items.map((item) => (
            <li key={item.meal.slug} className="flex items-center justify-between text-sm">
              <div>
                <p className="font-semibold text-gray-800">{item.meal.name}</p>
                <p className="text-gray-500">
                  x{item.qty} - {item.meal.cals} kcal - {item.meal.protein}g protein
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
          <span className="text-lg text-brand-700">{order.total.toLocaleString("vi-VN")} ₫</span>
        </div>
      </section>

      <section className="space-y-2 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Thông tin giao hàng</h2>
        <p className="text-sm text-gray-600">{order.delivery.name}</p>
        <p className="text-sm text-gray-600">{order.delivery.phone}</p>
        <p className="text-sm text-gray-600">{order.delivery.address}</p>
        {order.delivery.note ? <p className="text-sm text-gray-500">Ghi chú: {order.delivery.note}</p> : null}
        <p className="text-sm text-gray-500">
          Thanh toán: {order.delivery.payment === "transfer" ? "Chuyển khoản" : "Thanh toán khi nhận"}
        </p>
      </section>
    </div>
  );
}
