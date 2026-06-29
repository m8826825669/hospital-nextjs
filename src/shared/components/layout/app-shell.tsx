// src/shared/components/layout/app-shell.tsx

"use client";

import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { TopNav } from "./top-nav";
import { ProtectedRoute } from "@/platform/auth/protected-route";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Sidebar />

        <div className="lg:pl-72">
          <TopNav />

          <main className="p-4 md:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}