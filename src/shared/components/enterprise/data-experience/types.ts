import type { ReactNode } from "react";

export type DataDensity = "comfortable" | "standard" | "compact";

export interface DataFilterOption {
  label: string;
  value: string;
}

export interface ActiveDataFilter {
  key: string;
  label: string;
  value: string;
  displayValue?: string;
}

export interface DataExportColumn<TData = Record<string, unknown>> {
  key: keyof TData | string;
  header: string;
  render?: (row: TData) => string | number | boolean | null | undefined;
}

export interface BulkAction {
  label: string;
  icon?: ReactNode;
  variant?: "default" | "outline" | "destructive" | "secondary" | "ghost";
  onClick: () => void;
}
