export interface ExecutiveKpi {
  key: string;
  label: string;
  value: number | string;
  unit?: string | null;
  trend?: number | null;
  status: string;
}

export interface ExecutiveChartPoint {
  label: string;
  value: number;
}

export interface ExecutiveDashboard {
  hospital: ExecutiveKpi[];
  finance: ExecutiveKpi[];
  clinical: ExecutiveKpi[];
  inventory: ExecutiveKpi[];
  hr: ExecutiveKpi[];
  emergency: ExecutiveKpi[];
  trends: Record<string, ExecutiveChartPoint[]>;
}

export interface ReportDefinition {
  key: string;
  title: string;
  category: string;
  description: string;
  export_formats: string[];
}

export interface ReportRunRequest {
  report_key: string;
  date_from?: string;
  date_to?: string;
  department_id?: string;
  filters?: Record<string, unknown>;
}

export interface ReportRunResult {
  report_key: string;
  title: string;
  columns: string[];
  rows: Record<string, unknown>[];
  summary: Record<string, unknown>;
}
