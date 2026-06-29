// src/shared/components/enterprise/search-toolbar.tsx

"use client";

import { ReactNode } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchToolbarProps {
  search: string;
  placeholder?: string;
  actions?: ReactNode;
  onSearchChange: (value: string) => void;
  onFilterClick?: () => void;
}

export function SearchToolbar({
  search,
  placeholder = "Search...",
  actions,
  onSearchChange,
  onFilterClick,
}: SearchToolbarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card p-4 md:flex-row md:items-center md:justify-between">
      <div className="relative w-full md:max-w-sm">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          placeholder={placeholder}
          onChange={(event) => onSearchChange(event.target.value)}
          className="pl-9"
        />
      </div>

      <div className="flex items-center gap-2">
        {onFilterClick && (
          <Button variant="outline" onClick={onFilterClick}>
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
          </Button>
        )}

        {actions}
      </div>
    </div>
  );
}