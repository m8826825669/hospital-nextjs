// src/platform/providers/root-provider.tsx

"use client";

import { ReactNode } from "react";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/platform/theme/theme-provider";
import { AppQueryProvider } from "./query-provider";
import { AuthProvider } from "@/platform/auth/auth-provider";

export function RootProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AppQueryProvider>
        <AuthProvider>
          {children}
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </AppQueryProvider>
    </ThemeProvider>
  );
}