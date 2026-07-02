// src/features/ipd/components/ipd-filters.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ipdAdmissionStatusOptions } from "../constants/ipd.constants";

interface IpdFiltersProps {
  status: string;
  admissionDate: string;
  doctorId: string;
  patientId: string;
  wardId: string;
  onStatusChange: (value: string) => void;
  onAdmissionDateChange: (value: string) => void;
  onDoctorChange: (value: string) => void;
  onPatientChange: (value: string) => void;
  onWardChange: (value: string) => void;
  onReset: () => void;
}

export function IpdFilters({
  status,
  admissionDate,
  doctorId,
  patientId,
  wardId,
  onStatusChange,
  onAdmissionDateChange,
  onDoctorChange,
  onPatientChange,
  onWardChange,
  onReset,
}: IpdFiltersProps) {
  return (
    <div className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-3 lg:grid-cols-6">
      <select
        className="h-10 rounded-md border bg-background px-3 text-sm"
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
      >
        <option value="">All Status</option>
        {ipdAdmissionStatusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <Input
        type="date"
        value={admissionDate}
        onChange={(event) => onAdmissionDateChange(event.target.value)}
      />

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

      <Input
        placeholder="Ward ID"
        value={wardId}
        onChange={(event) => onWardChange(event.target.value)}
      />

      <Button variant="outline" onClick={onReset}>
        Reset
      </Button>
    </div>
  );
}