// src/features/patients/components/patient-filters.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  bloodGroupOptions,
  patientGenderOptions,
  patientStatusOptions,
} from "../constants/patient.constants";

interface PatientFiltersProps {
  gender: string;
  status: string;
  bloodGroup: string;
  city: string;
  onGenderChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onBloodGroupChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onReset: () => void;
}

export function PatientFilters({
  gender,
  status,
  bloodGroup,
  city,
  onGenderChange,
  onStatusChange,
  onBloodGroupChange,
  onCityChange,
  onReset,
}: PatientFiltersProps) {
  return (
    <div className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-5">
      <select
        className="h-10 rounded-md border bg-background px-3 text-sm"
        value={gender}
        onChange={(event) => onGenderChange(event.target.value)}
      >
        <option value="">All Genders</option>
        {patientGenderOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        className="h-10 rounded-md border bg-background px-3 text-sm"
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
      >
        <option value="">All Status</option>
        {patientStatusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        className="h-10 rounded-md border bg-background px-3 text-sm"
        value={bloodGroup}
        onChange={(event) => onBloodGroupChange(event.target.value)}
      >
        <option value="">All Blood Groups</option>
        {bloodGroupOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <Input
        placeholder="City"
        value={city}
        onChange={(event) => onCityChange(event.target.value)}
      />

      <Button variant="outline" onClick={onReset}>
        Reset
      </Button>
    </div>
  );
}