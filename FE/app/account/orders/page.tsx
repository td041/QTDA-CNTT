'use client';

import Link from "next/link";
import { ORDER_STATUS_FLOW, ORDER_STATUS_LABELS, type OrderStatus, useOrder } from "@/components/OrderContext";

const statusColors: Record<OrderStatus, string> = {
  created: "bg-gray-100 text-gray-600",
  confirmed: "bg-blue-100 text-blue-700",
  preparing: "bg-amber-100 text-amber-700",
  "on-delivery": "bg-violet-100 text-violet-700",
  completed: "bg-emerald-100 text-emerald-700",
};

function getNextStatus(status: OrderStatus) {
  const currentIndex = ORDER_STATUS_FLOW.indexOf(status);
  if (currentIndex === -1) return null;
  return ORDER_STATUS_FLOW[currentIndex + 1] ?? null;
}

export default function AccountOrdersPage() {
  const { orders, updateStatus } = useOrder();

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">Đơn hàng của bạn</h1>
        <p className="text-gray-600">Theo dõi tiến trình giao món và cập nhật trạng thái theo thời gian thực.</p>
      </header>

      <div className="space-y-4">
        {orders.map((order) => {
          const nextStatus = getNextStatus(order.status);
          return (
            <article
              key={order.id}
              className="space-y-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:border-brand-200"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold">
                    Đơn {order.code}
                    <span className={`ml-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusColors[order.status]}`}>
                      {ORDER_STATUS_LABELS[order.status].label}
                    </span>
                  </h2>
                  <p className="text-sm text-gray-500">
                    Tạo lúc {new Date(order.createdAt).toLocaleString("vi-VN")} - Tổng{" "}
                    {order.total.toLocaleString("vi-VN")} ₫
                  </p>
                </div>
                <div className="flex gap-3 text-sm font-semibold">
                  <Link href={`/account/orders/${order.id}`} className="text-brand-700 hover:underline">
                    Xem chi tiết
                  </Link>
                  {nextStatus ? (
                    <button
                      onClick={() => updateStatus(order.id, nextStatus)}
                      className="rounded-xl border border-gray-200 px-4 py-2 text-gray-700 transition hover:border-brand-200 hover:text-brand-700"
                    >
                      Chuyển sang {ORDER_STATUS_LABELS[nextStatus].label}
                    </button>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {order.items.map((item) => (
                  <div key={item.meal.slug} className="rounded-xl border border-gray-100 p-3 text-sm">
                    <p className="font-semibold text-gray-800">{item.meal.name}</p>
                    <p className="text-gray-500">
                      x{item.qty} - {(item.meal.price * item.qty).toLocaleString("vi-VN")} ₫
                    </p>
                  </div>
                ))}
              </div>
            </article>
          );
        })}

        {orders.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">Chưa có đơn hàng nào</h2>
            <p className="mt-2 text-gray-500">Bắt đầu bằng việc thêm món vào giỏ hàng và thanh toán.</p>
            <Link
              href="/menu"
              className="mt-6 inline-flex items-center rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700"
            >
              Mua ngay
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
