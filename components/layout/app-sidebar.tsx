"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity } from "lucide-react";

import { navigationGroups } from "@/config/navigation.config";
import type { CurrentUser } from "@/features/auth/types/auth.types";
import { hasPermission } from "@/lib/permissions";
import { cn } from "@/lib/utils";

type AppSidebarProps = {
  user: CurrentUser;
  onNavigate?: () => void;
};

export function AppSidebar({ user, onNavigate }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground shadow-sm">
          <Activity className="h-5 w-5" />
        </div>

        <div>
          <p className="font-semibold leading-none">HMS SaaS</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Hospital Platform
          </p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-6">
          {navigationGroups.map((group) => {
            const visibleItems = group.items.filter((item) =>
              hasPermission(user, item.permission)
            );

            if (!visibleItems.length) return null;

            return (
              <div key={group.label}>
                <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {group.label}
                </p>

                <div className="space-y-1">
                  {visibleItems.map((item) => {
                    const Icon = item.icon;
                    const active =
                      pathname === item.href ||
                      pathname.startsWith(`${item.href}/`);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onNavigate}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                          active
                            ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                            : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className="rounded-xl bg-sidebar-accent p-3">
          <p className="text-xs font-medium text-sidebar-accent-foreground">
            Current Tenant
          </p>
          <p className="mt-1 truncate text-xs text-muted-foreground">
            {user.tenant_id || "Default Hospital"}
          </p>
        </div>
      </div>
    </aside>
  );
}