// src/shared/components/layout/top-nav.tsx

"use client";

import { LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "@/platform/auth/auth-provider";
import { Button } from "@/components/ui/button";

export function TopNav() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur md:px-6">
      <div>
        <p className="text-sm text-muted-foreground">Workspace</p>
        <h2 className="font-semibold">Hospital Management System</h2>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-4 w-4 dark:hidden" />
          <Moon className="hidden h-4 w-4 dark:block" />
        </Button>

        <div className="hidden text-right md:block">
          <p className="text-sm font-medium">{user?.full_name || user?.email}</p>
          <p className="text-xs text-muted-foreground">{user?.role}</p>
        </div>

        <Button variant="ghost" size="icon" onClick={logout}>
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}