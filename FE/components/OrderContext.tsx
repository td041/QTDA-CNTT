'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem } from "@/components/CartContext";
import { meals } from "@/lib/data/meals";

export type OrderStatus = "created" | "confirmed" | "preparing" | "on-delivery" | "completed";

export const ORDER_STATUS_FLOW: OrderStatus[] = ["created", "confirmed", "preparing", "on-delivery", "completed"];

export const ORDER_STATUS_LABELS: Record<OrderStatus, { label: string; description: string }> = {
  created: { label: "Đã tạo đơn", description: "Đơn hàng được ghi nhận trong hệ thống." },
  confirmed: { label: "Đã xác nhận", description: "Bếp đang chuẩn bị nguyên liệu cho đơn." },
  preparing: { label: "Đang chế biến", description: "Đầu bếp đang hoàn thiện món ăn." },
  "on-delivery": { label: "Đang giao hàng", description: "Shipper đã nhận món và đang trên đường giao." },
  completed: { label: "Hoàn tất", description: "Đơn hàng đã giao thành công." },
};

export type DeliveryInfo = {
  name: string;
  phone: string;
  address: string;
  note?: string;
  payment: "transfer" | "cod";
};

export type Order = {
  id: string;
  code: string;
  status: OrderStatus;
  items: CartItem[];
  total: number;
  createdAt: string;
  updatedAt: string;
  delivery: DeliveryInfo;
  history: Array<{ status: OrderStatus; timestamp: string }>;
};

type PlaceOrderPayload = {
  items: CartItem[];
  total: number;
  delivery: DeliveryInfo;
};

type OrderState = {
  orders: Order[];
  placeOrder: (payload: PlaceOrderPayload) => Order;
  updateStatus: (id: string, status: OrderStatus) => void;
  getOrder: (id: string) => Order | undefined;
};

const OrderContext = createContext<OrderState | undefined>(undefined);
const storageKey = "fitfoodish-orders";

function createSampleOrder(): Order {
  const [first, second] = meals;
  const createdAt = new Date(Date.now() - 1000 * 60 * 60).toISOString();
  const confirmedAt = new Date(Date.now() - 1000 * 60 * 50).toISOString();
  const preparingAt = new Date(Date.now() - 1000 * 60 * 20).toISOString();
  const total = first.price * 2 + second.price;

  return {
    id: "demo-001",
    code: "FF-2301",
    status: "preparing",
    items: [
      { meal: first, qty: 2 },
      { meal: second, qty: 1 },
    ],
    total,
    createdAt,
    updatedAt: preparingAt,
    delivery: {
      name: "Nguyễn Minh An",
      phone: "0901234567",
      address: "12 Nguyễn Trãi, Quận 1, TP.HCM",
      note: "Gọi trước 5 phút khi tới.",
      payment: "transfer",
    },
    history: [
      { status: "created", timestamp: createdAt },
      { status: "confirmed", timestamp: confirmedAt },
      { status: "preparing", timestamp: preparingAt },
    ],
  };
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(storageKey);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Order[];
        setOrders(parsed);
        setHydrated(true);
        return;
      } catch (error) {
        console.warn("Không thể đọc dữ liệu đơn hàng từ localStorage", error);
      }
    }
    setOrders([createSampleOrder()]);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    window.localStorage.setItem(storageKey, JSON.stringify(orders));
  }, [orders, hydrated]);

  const placeOrder = (payload: PlaceOrderPayload): Order => {
    const now = new Date();
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `ff-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const code = `FF-${now.getFullYear().toString().slice(-2)}${(orders.length + 1)
      .toString()
      .padStart(3, "0")}`;
    const createdAt = now.toISOString();

    const newOrder: Order = {
      id,
      code,
      status: "created",
      items: payload.items,
      total: payload.total,
      createdAt,
      updatedAt: createdAt,
      delivery: payload.delivery,
      history: [{ status: "created", timestamp: createdAt }],
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== id) return order;
        const now = new Date().toISOString();
        const alreadyLogged = order.history.some((entry) => entry.status === status);
        return {
          ...order,
          status,
          updatedAt: now,
          history: alreadyLogged
            ? order.history
            : [...order.history, { status, timestamp: now }],
        };
      }),
    );
  };

  const getOrder = (id: string) => orders.find((order) => order.id === id);

  const value = useMemo(
    () => ({
      orders,
      placeOrder,
      updateStatus,
      getOrder,
    }),
    [orders],
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used within OrderProvider");
  return ctx;
}
