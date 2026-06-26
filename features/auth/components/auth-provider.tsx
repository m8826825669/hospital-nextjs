"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { authStorage } from "@/lib/auth-storage";
import { useCurrentUser } from "../hooks/use-auth";
import type { CurrentUser } from "../types/auth.types";

type AuthContextValue = {
  user: CurrentUser;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hasToken = mounted && authStorage.isAuthenticated();

  const { data: user, isLoading, isError } = useCurrentUser();

  useEffect(() => {
    if (mounted && (!hasToken || isError)) {
      router.replace("/login");
    }
  }, [mounted, hasToken, isError, router]);

  if (!mounted) {
    return null;
  }

  if (!hasToken) {
    return null;
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}