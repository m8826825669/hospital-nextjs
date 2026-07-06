"use client";

import { CheckSquare, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { BulkAction } from "./types";

interface BulkActionBarProps {
  selectedCount: number;
  actions?: BulkAction[];
  onClearSelection?: () => void;
}

export function BulkActionBar({ selectedCount, actions = [], onClearSelection }: BulkActionBarProps) {
  if (selectedCount <= 0) return null;

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2 font-medium text-primary">
        <CheckSquare className="h-4 w-4" />
        {selectedCount} selected
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {actions.map((action) => (
          <Button
            key={action.label}
            type="button"
            size="sm"
            variant={action.variant ?? "outline"}
            className="gap-2"
            onClick={action.onClick}
          >
            {action.icon}
            {action.label}
          </Button>
        ))}

        {onClearSelection && (
          <Button type="button" size="sm" variant="ghost" className="gap-2" onClick={onClearSelection}>
            <X className="h-4 w-4" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
