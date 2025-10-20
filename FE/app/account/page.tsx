'use client';

import Link from "next/link";
import { useAuth } from "@/components/AuthContext";
import { ORDER_STATUS_LABELS, ORDER_STATUS_FLOW, useOrder } from "@/components/OrderContext";

export default function AccountDashboardPage() {
  const { user } = useAuth();
  const { orders } = useOrder();

  const completed = orders.filter((order) => order.status === "completed").length;
  const inProgress = orders.filter((order) => order.status !== "completed").length;
  const latestOrder = orders[0];
  const firstName = user?.name?.split(" ")[0] ?? "bạn";

  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold">Xin chào {firstName}</h1>
        <p className="text-gray-600">
          Quản lý đơn hàng, cập nhật trạng thái giao và tiếp tục đặt món yêu thích của bạn.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Đơn đang xử lý</p>
          <p className="mt-2 text-3xl font-semibold text-brand-700">{inProgress}</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Đơn đã hoàn tất</p>
          <p className="mt-2 text-3xl font-semibold text-brand-700">{completed}</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Tổng chi tiêu</p>
          <p className="mt-2 text-3xl font-semibold text-brand-700">
            {orders.reduce((sum, order) => sum + order.total, 0).toLocaleString("vi-VN")} ₫
          </p>
        </div>
      </section>

      {latestOrder ? (
        <section className="space-y-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Đơn hàng gần nhất</h2>
              <p className="text-sm text-gray-500">
                Mã đơn <strong>{latestOrder.code}</strong> - Tổng tiền {latestOrder.total.toLocaleString("vi-VN")} ₫
              </p>
            </div>
            <Link href={`/account/orders/${latestOrder.id}`} className="text-sm font-semibold text-brand-700">
              Xem chi tiết
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-5">
            {ORDER_STATUS_FLOW.map((status) => {
              const position = ORDER_STATUS_FLOW.indexOf(status);
              const currentIndex = ORDER_STATUS_FLOW.indexOf(latestOrder.status);
              const isDone = position <= currentIndex;
              const statusInfo = ORDER_STATUS_LABELS[status];
              return (
                <div
                  key={status}
                  className={`rounded-xl border px-3 py-4 text-sm ${
                    isDone ? "border-brand-200 bg-brand-50 text-brand-700" : "border-gray-100 text-gray-500"
                  }`}
                >
                  <p className="font-semibold">{statusInfo.label}</p>
                  <p className="mt-1 text-xs text-gray-500">{statusInfo.description}</p>
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        <section className="rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">Bạn chưa có đơn hàng nào</h2>
          <p className="mt-2 text-gray-500">Khám phá menu và đặt món đầu tiên ngay bây giờ.</p>
          <Link
            href="/menu"
            className="mt-6 inline-flex items-center rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700"
          >
            Xem menu
          </Link>
        </section>
      )}

      <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Tiếp tục đặt món</h2>
        <p className="mt-1 text-sm text-gray-500">Giỏ hàng được đồng bộ giữa thiết bị khi bạn đăng nhập.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/menu?tag=keto"
            className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-brand-200 hover:text-brand-700"
          >
            Gợi ý Keto
          </Link>
          <Link
            href="/menu?tag=balanced"
            className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-brand-200 hover:text-brand-700"
          >
            Set cân bằng
          </Link>
        </div>
      </section>
    </div>
  );
}
