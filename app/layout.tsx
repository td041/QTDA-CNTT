import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/components/CartContext";
import { AuthProvider } from "@/components/AuthContext";
import { OrderProvider } from "@/components/OrderContext";

export const metadata: Metadata = {
  title: "FitFoodish - Healthy meals, delivered",
  description:
    "Bữa ăn lành mạnh giao tận nơi cho người bận rộn. Chọn Keto, Low-carb, Vegan hoặc Balanced và nhận món trong 60 phút.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="bg-gray-50 text-gray-900">
        <AuthProvider>
          <OrderProvider>
            <CartProvider>
              <Navbar />
              <main className="container pb-16 pt-4">{children}</main>
              <CartDrawer />
              <Footer />
            </CartProvider>
          </OrderProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
