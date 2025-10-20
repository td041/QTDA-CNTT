'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type User = {
  name: string;
  email: string;
};

type AuthState = {
  user: User | null;
  login: (payload: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthState | undefined>(undefined);
const storageKey = "fitfoodish-auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(storageKey);
    if (raw) {
      try {
        setUser(JSON.parse(raw) as User);
      } catch (error) {
        console.warn("Không thể đọc thông tin người dùng từ localStorage", error);
      }
    }
  }, []);

  const login = (payload: User) => {
    setUser(payload);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(storageKey, JSON.stringify(payload));
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(storageKey);
    }
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
