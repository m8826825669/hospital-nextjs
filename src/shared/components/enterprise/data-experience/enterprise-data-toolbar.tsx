"use client";

import type { ReactNode } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EnterpriseDataToolbarProps {
  title?: string;
  description?: string;
  search?: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  filters?: ReactNode;
  actions?: ReactNode;
  onOpenFilters?: () => void;
}

export function EnterpriseDataToolbar({
  title,
  description,
  search = "",
  searchPlaceholder = "Search records...",
  onSearchChange,
  filters,
  actions,
  onOpenFilters,
}: EnterpriseDataToolbarProps) {
  return (
    <div className="rounded-2xl border bg-card p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {(title || description) && (
          <div className="min-w-0">
            {title && <h3 className="text-sm font-semibold text-foreground">{title}</h3>}
            {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
          </div>
        )}

        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center lg:justify-end">
          {onSearchChange && (
            <div className="relative w-full sm:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder={searchPlaceholder}
                className="pl-9"
              />
            </div>
          )}

          {onOpenFilters && (
            <Button type="button" variant="outline" className="gap-2" onClick={onOpenFilters}>
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          )}

          {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
        </div>
      </div>

      {filters && <div className="mt-4 border-t pt-4">{filters}</div>}
    </div>
  );
}
