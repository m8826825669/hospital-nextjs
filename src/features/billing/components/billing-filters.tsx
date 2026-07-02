// src/features/billing/components/billing-filters.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { billingStatusOptions } from "../constants/billing.constants";

interface BillingFiltersProps {
  status: string;
  patientId: string;
  invoiceDate: string;
  onStatusChange: (value: string) => void;
  onPatientChange: (value: string) => void;
  onInvoiceDateChange: (value: string) => void;
  onReset: () => void;
}

export function BillingFilters({
  status,
  patientId,
  invoiceDate,
  onStatusChange,
  onPatientChange,
  onInvoiceDateChange,
  onReset,
}: BillingFiltersProps) {
  return (
    <div className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-4">
      <select
        className="h-10 rounded-md border bg-background px-3 text-sm"
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
      >
        <option value="">All Status</option>
        {billingStatusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <Input
        placeholder="Patient ID"
        value={patientId}
        onChange={(event) => onPatientChange(event.target.value)}
      />

      <Input
        type="date"
        value={invoiceDate}
        onChange={(event) => onInvoiceDateChange(event.target.value)}
      />

      <Button variant="outline" onClick={onReset}>
        Reset
      </Button>
    </div>
  );
}