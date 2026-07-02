// src/features/lis/components/lab-sample-filters.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  labPriorityOptions,
  labSampleStatusOptions,
} from "../constants/lis.constants";

interface LabSampleFiltersProps {
  status: string;
  priority: string;
  sampleDate: string;
  patientId: string;
  doctorId: string;
  onStatusChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onSampleDateChange: (value: string) => void;
  onPatientChange: (value: string) => void;
  onDoctorChange: (value: string) => void;
  onReset: () => void;
}

export function LabSampleFilters({
  status,
  priority,
  sampleDate,
  patientId,
  doctorId,
  onStatusChange,
  onPriorityChange,
  onSampleDateChange,
  onPatientChange,
  onDoctorChange,
  onReset,
}: LabSampleFiltersProps) {
  return (
    <div className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-3 lg:grid-cols-6">
      <select
        className="h-10 rounded-md border bg-background px-3 text-sm"
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
      >
        <option value="">All Status</option>
        {labSampleStatusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        className="h-10 rounded-md border bg-background px-3 text-sm"
        value={priority}
        onChange={(event) => onPriorityChange(event.target.value)}
      >
        <option value="">All Priority</option>
        {labPriorityOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <Input
        type="date"
        value={sampleDate}
        onChange={(event) => onSampleDateChange(event.target.value)}
      />

      <Input
        placeholder="Patient ID"
        value={patientId}
        onChange={(event) => onPatientChange(event.target.value)}
      />

      <Input
        placeholder="Doctor ID"
        value={doctorId}
        onChange={(event) => onDoctorChange(event.target.value)}
      />

      <Button variant="outline" onClick={onReset}>
        Reset
      </Button>
    </div>
  );
}