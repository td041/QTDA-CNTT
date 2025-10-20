'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";

export default function LoginPage() {
  const { user, login, logout } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "" });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    if (!trimmedName || !trimmedEmail) {
      setError("Vui lòng nhập đầy đủ họ tên và email.");
      return;
    }

    login({ name: trimmedName, email: trimmedEmail });
    router.push("/account");
  };

  if (user) {
    return (
      <div className="mx-auto max-w-xl space-y-6 py-12">
        <h1 className="text-3xl font-semibold">Bạn đã đăng nhập</h1>
        <p className="text-gray-600">
          Xin chào <strong>{user.name}</strong>. Truy cập trang tài khoản để theo dõi đơn hàng của bạn.
        </p>
        <div className="flex gap-4">
          <Link
            href="/account"
            className="rounded-xl bg-brand-600 px-5 py-2 font-semibold text-white transition hover:bg-brand-700"
          >
            Đi tới tài khoản
          </Link>
          <button
            onClick={logout}
            className="rounded-xl border border-gray-200 px-5 py-2 font-semibold text-gray-700 transition hover:border-brand-200 hover:text-brand-700"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl py-12">
      <h1 className="text-3xl font-semibold">Đăng nhập vào FitFoodish</h1>
      <p className="mt-2 text-gray-600">
        Đăng nhập nhanh bằng email để lưu giỏ hàng và quản lý đơn. Không cần mật khẩu trong bản demo này.
      </p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <label className="space-y-1 text-sm">
          <span className="font-semibold text-gray-700">Họ và tên</span>
          <input
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            className="w-full rounded-xl border px-4 py-2 focus:border-brand-500 focus:outline-none"
          />
        </label>
        <label className="space-y-1 text-sm">
          <span className="font-semibold text-gray-700">Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            className="w-full rounded-xl border px-4 py-2 focus:border-brand-500 focus:outline-none"
          />
        </label>
        {error ? <p className="text-sm font-semibold text-red-500">{error}</p> : null}
        <button
          type="submit"
          className="w-full rounded-xl bg-brand-600 px-5 py-3 text-lg font-semibold text-white transition hover:bg-brand-700"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
