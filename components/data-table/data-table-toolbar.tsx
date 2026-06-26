"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type DataTableToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
};

export function DataTableToolbar({
  search,
  onSearchChange,
  placeholder = "Search...",
}: DataTableToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />

        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={placeholder}
          className="pl-9"
        />
      </div>
    </div>
  );
}