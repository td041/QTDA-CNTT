'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";

const navItems = [
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "Giới thiệu" },
  { href: "/contact", label: "Liên hệ" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { count, setOpen } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="text-xl font-semibold text-brand-700">
          FitFoodish
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={isActive ? "text-brand-600" : "hover:text-brand-700"}
              >
                {item.label}
              </Link>
            );
          })}
          {user ? (
            <Link href="/account" className="hover:text-brand-700">
              Tài khoản
            </Link>
          ) : null}
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <span className="hidden text-sm font-medium text-gray-600 md:inline">
              Chào, {user.name.split(" ")[0]}
            </span>
          ) : null}
          {user ? (
            <button
              onClick={logout}
              className="hidden rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-brand-200 hover:text-brand-700 md:inline-flex"
            >
              Đăng xuất
            </button>
          ) : (
            <Link
              href="/login"
              className="hidden rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-brand-200 hover:text-brand-700 md:inline-flex"
            >
              Đăng nhập
            </Link>
          )}
          <button
            onClick={() => setOpen(true)}
            className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Giỏ hàng {count ? `(${count})` : ""}
          </button>
        </div>
      </div>
    </header>
  );
}
