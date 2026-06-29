// src/features/doctors/components/doctor-filters.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DoctorFiltersProps {
  specialization: string;
  departmentId: string;
  activeOnly: boolean;
  onSpecializationChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onActiveOnlyChange: (value: boolean) => void;
  onReset: () => void;
}

export function DoctorFilters({
  specialization,
  departmentId,
  activeOnly,
  onSpecializationChange,
  onDepartmentChange,
  onActiveOnlyChange,
  onReset,
}: DoctorFiltersProps) {
  return (
    <div className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-4">
      <Input
        placeholder="Specialization"
        value={specialization}
        onChange={(event) => onSpecializationChange(event.target.value)}
      />

      <Input
        placeholder="Department ID"
        value={departmentId}
        onChange={(event) => onDepartmentChange(event.target.value)}
      />

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={activeOnly}
          onChange={(event) => onActiveOnlyChange(event.target.checked)}
        />
        Active only
      </label>

      <Button variant="outline" onClick={onReset}>
        Reset Filters
      </Button>
    </div>
  );
}