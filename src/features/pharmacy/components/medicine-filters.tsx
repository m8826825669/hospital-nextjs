// src/features/pharmacy/components/medicine-filters.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { medicineStatusOptions } from "../constants/pharmacy.constants";

interface MedicineFiltersProps {
  status: string;
  categoryId: string;
  onStatusChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onReset: () => void;
}

export function MedicineFilters({
  status,
  categoryId,
  onStatusChange,
  onCategoryChange,
  onReset,
}: MedicineFiltersProps) {
  return (
    <div className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-3">
      <select
        className="h-10 rounded-md border bg-background px-3 text-sm"
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
      >
        <option value="">All Status</option>
        {medicineStatusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <Input
        placeholder="Category ID"
        value={categoryId}
        onChange={(event) => onCategoryChange(event.target.value)}
      />

      <Button variant="outline" onClick={onReset}>
        Reset
      </Button>
    </div>
  );
}