// src/features/reports/types/reports.types.ts

export type ReportCategory =
  | "clinical"
  | "financial"
  | "operations"
  | "inventory"
  | "insurance"
  | "audit";

export type ReportFormat = "pdf" | "excel" | "csv";

export interface ReportDefinition {
  id: string;
  code: string;
  name: string;
  description?: string | null;
  category: ReportCategory;
  module?: string | null;
  is_active: boolean;
}

export interface ReportRun {
  id: string;
  report_id: string;
  report_name: string;
  status: "queued" | "running" | "completed" | "failed";
  format: ReportFormat;
  file_url?: string | null;
  created_at: string;
  created_by_name?: string | null;
}

export interface ReportListParams {
  page?: number;
  size?: number;
  search?: string;
  category?: ReportCategory;
  module?: string;
}

export interface RunReportPayload {
  report_id: string;
  format: ReportFormat;
  date_from?: string;
  date_to?: string;
  patient_id?: string;
  doctor_id?: string;
  department_id?: string;
  module?: string;
}

export interface ReportPreviewRow {
  id: string;
  [key: string]: string | number | boolean | null;
}