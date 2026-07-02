// src/features/ot/components/surgery-filters.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { surgeryStatusOptions } from "../constants/ot.constants";

interface SurgeryFiltersProps {
  status: string;
  scheduledDate: string;
  surgeonId: string;
  patientId: string;
  theatreId: string;
  onStatusChange: (value: string) => void;
  onScheduledDateChange: (value: string) => void;
  onSurgeonChange: (value: string) => void;
  onPatientChange: (value: string) => void;
  onTheatreChange: (value: string) => void;
  onReset: () => void;
}

export function SurgeryFilters({
  status,
  scheduledDate,
  surgeonId,
  patientId,
  theatreId,
  onStatusChange,
  onScheduledDateChange,
  onSurgeonChange,
  onPatientChange,
  onTheatreChange,
  onReset,
}: SurgeryFiltersProps) {
  return (
    <div className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-3 lg:grid-cols-6">
      <select
        className="h-10 rounded-md border bg-background px-3 text-sm"
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
      >
        <option value="">All Status</option>
        {surgeryStatusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <Input
        type="date"
        value={scheduledDate}
        onChange={(event) => onScheduledDateChange(event.target.value)}
      />

      <Input
        placeholder="Surgeon ID"
        value={surgeonId}
        onChange={(event) => onSurgeonChange(event.target.value)}
      />

      <Input
        placeholder="Patient ID"
        value={patientId}
        onChange={(event) => onPatientChange(event.target.value)}
      />

      <Input
        placeholder="Theatre ID"
        value={theatreId}
        onChange={(event) => onTheatreChange(event.target.value)}
      />

      <Button variant="outline" onClick={onReset}>
        Reset
      </Button>
    </div>
  );
}