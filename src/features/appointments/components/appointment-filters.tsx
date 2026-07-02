// src/features/appointments/components/appointment-filters.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  appointmentStatusOptions,
  appointmentTypeOptions,
} from "../constants/appointment.constants";

interface AppointmentFiltersProps {
  date: string;
  status: string;
  appointmentType: string;
  doctorId: string;
  departmentId: string;
  onDateChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onAppointmentTypeChange: (value: string) => void;
  onDoctorChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onReset: () => void;
}

export function AppointmentFilters({
  date,
  status,
  appointmentType,
  doctorId,
  departmentId,
  onDateChange,
  onStatusChange,
  onAppointmentTypeChange,
  onDoctorChange,
  onDepartmentChange,
  onReset,
}: AppointmentFiltersProps) {
  return (
    <div className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-3 lg:grid-cols-6">
      <Input
        type="date"
        value={date}
        onChange={(event) => onDateChange(event.target.value)}
      />

      <select
        className="h-10 rounded-md border bg-background px-3 text-sm"
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
      >
        <option value="">All Status</option>
        {appointmentStatusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        className="h-10 rounded-md border bg-background px-3 text-sm"
        value={appointmentType}
        onChange={(event) => onAppointmentTypeChange(event.target.value)}
      >
        <option value="">All Types</option>
        {appointmentTypeOptions.map((option) => (
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
        placeholder="Department ID"
        value={departmentId}
        onChange={(event) => onDepartmentChange(event.target.value)}
      />

      <Button variant="outline" onClick={onReset}>
        Reset
      </Button>
    </div>
  );
}