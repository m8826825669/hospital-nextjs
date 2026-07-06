"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import type { ActiveDataFilter } from "./types";

interface ActiveFilterChipsProps {
  filters: ActiveDataFilter[];
  onRemove: (key: string) => void;
  onClearAll?: () => void;
}

export function ActiveFilterChips({ filters, onRemove, onClearAll }: ActiveFilterChipsProps) {
  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border bg-muted/30 px-3 py-2">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Active filters
      </span>

      {filters.map((filter) => (
        <Badge key={filter.key} variant="secondary" className="gap-1 rounded-full px-2.5 py-1">
          <span className="font-medium">{filter.label}:</span>
          <span>{filter.displayValue ?? filter.value}</span>
          <button
            type="button"
            aria-label={`Remove ${filter.label} filter`}
            className="ml-1 rounded-full hover:bg-background/80"
            onClick={() => onRemove(filter.key)}
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}

      {onClearAll && (
        <Button type="button" variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={onClearAll}>
          Clear all
        </Button>
      )}
    </div>
  );
}
