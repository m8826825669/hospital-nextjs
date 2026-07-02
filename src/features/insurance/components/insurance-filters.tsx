// src/features/insurance/components/insurance-filters.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  insuranceClaimPriorityOptions,
  insuranceClaimStatusOptions,
} from "../constants/insurance.constants";

interface InsuranceFiltersProps {
  status: string;
  priority: string;
  providerId: string;
  patientId: string;
  claimDate: string;
  onStatusChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onProviderChange: (value: string) => void;
  onPatientChange: (value: string) => void;
  onClaimDateChange: (value: string) => void;
  onReset: () => void;
}

export function InsuranceFilters({
  status,
  priority,
  providerId,
  patientId,
  claimDate,
  onStatusChange,
  onPriorityChange,
  onProviderChange,
  onPatientChange,
  onClaimDateChange,
  onReset,
}: InsuranceFiltersProps) {
  return (
    <div className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-3 lg:grid-cols-6">
      <select
        className="h-10 rounded-md border bg-background px-3 text-sm"
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
      >
        <option value="">All Status</option>
        {insuranceClaimStatusOptions.map((option) => (
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
        {insuranceClaimPriorityOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <Input
        placeholder="Provider ID"
        value={providerId}
        onChange={(event) => onProviderChange(event.target.value)}
      />

      <Input
        placeholder="Patient ID"
        value={patientId}
        onChange={(event) => onPatientChange(event.target.value)}
      />

      <Input
        type="date"
        value={claimDate}
        onChange={(event) => onClaimDateChange(event.target.value)}
      />

      <Button variant="outline" onClick={onReset}>
        Reset
      </Button>
    </div>
  );
}