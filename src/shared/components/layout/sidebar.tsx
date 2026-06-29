// src/shared/components/layout/sidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/platform/navigation/navigation.config";
import { useAuth } from "@/platform/auth/auth-provider";
import { hasPermission } from "@/platform/permissions/permissions";
import { cn } from "@/shared/lib/utils";

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r bg-card lg:block">
      <div className="flex h-16 items-center border-b px-6">
        <div>
          <h1 className="text-lg font-semibold">HMS SaaS</h1>
          <p className="text-xs text-muted-foreground">Enterprise Platform</p>
        </div>
      </div>

      <nav className="space-y-1 p-4">
        {navigationItems
          .filter((item) => hasPermission(user, item.permission))
          .map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground",
                  active && "bg-muted text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.title}
              </Link>
            );
          })}
      </nav>
    </aside>
  );
}