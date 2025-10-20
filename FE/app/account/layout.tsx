'use client';

import Link from "next/link";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";

const navLinks = [
  { href: "/account", label: "Tổng quan" },
  { href: "/account/orders", label: "Đơn hàng" },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="py-12 text-center text-gray-600">Đang chuyển tới trang đăng nhập...</div>
    );
  }

  return (
    <div className="grid gap-8 py-12 lg:grid-cols-[240px_1fr]">
      <aside className="space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div>
          <p className="text-sm text-gray-500">Tài khoản của</p>
          <p className="text-lg font-semibold text-gray-900">{user.name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <nav className="space-y-2 text-sm font-semibold">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block rounded-xl px-4 py-2 transition ${
                  isActive ? "bg-brand-50 text-brand-700" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={() => logout()}
          className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-red-200 hover:text-red-500"
        >
          Đăng xuất
        </button>
      </aside>
      <div>{children}</div>
    </div>
  );
}
