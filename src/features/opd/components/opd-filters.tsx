// src/features/opd/components/opd-filters.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { opdStatusOptions } from "../constants/opd.constants";

interface OpdFiltersProps {
  visitDate: string;
  status: string;
  doctorId: string;
  patientId: string;
  onVisitDateChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onDoctorChange: (value: string) => void;
  onPatientChange: (value: string) => void;
  onReset: () => void;
}

export function OpdFilters({
  visitDate,
  status,
  doctorId,
  patientId,
  onVisitDateChange,
  onStatusChange,
  onDoctorChange,
  onPatientChange,
  onReset,
}: OpdFiltersProps) {
  return (
    <div className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-5">
      <Input
        type="date"
        value={visitDate}
        onChange={(event) => onVisitDateChange(event.target.value)}
      />

      <select
        className="h-10 rounded-md border bg-background px-3 text-sm"
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
      >
        <option value="">All Status</option>
        {opdStatusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <Input
        placeholder="Doctor ID"
        value={doctorId}
        onChange={(event) => onDoctorChange(event.target.value)}
      />

      <Input
        placeholder="Patient ID"
        value={patientId}
        onChange={(event) => onPatientChange(event.target.value)}
      />

      <Button variant="outline" onClick={onReset}>
        Reset
      </Button>
    </div>
  );
}