// src/features/reports/constants/reports.constants.ts

import type { ReportCategory, ReportFormat } from "../types/reports.types";

export const reportCategoryOptions: {
  label: string;
  value: ReportCategory;
}[] = [
  { label: "Clinical", value: "clinical" },
  { label: "Financial", value: "financial" },
  { label: "Operations", value: "operations" },
  { label: "Inventory", value: "inventory" },
  { label: "Insurance", value: "insurance" },
  { label: "Audit", value: "audit" },
];

export const reportFormatOptions: {
  label: string;
  value: ReportFormat;
}[] = [
  { label: "PDF", value: "pdf" },
  { label: "Excel", value: "excel" },
  { label: "CSV", value: "csv" },
];

export const reportModuleOptions = [
  { label: "Patients", value: "patients" },
  { label: "Appointments", value: "appointments" },
  { label: "OPD", value: "opd" },
  { label: "Pharmacy", value: "pharmacy" },
  { label: "Billing", value: "billing" },
  { label: "IPD", value: "ipd" },
  { label: "OT", value: "ot" },
  { label: "LIS", value: "lis" },
  { label: "Insurance", value: "insurance" },
  { label: "Audit", value: "audit" },
];