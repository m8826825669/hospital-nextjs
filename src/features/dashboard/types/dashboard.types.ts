// src/features/dashboard/types/dashboard.types.ts

export interface DashboardKpis {
  total_patients: number;
  today_appointments: number;
  opd_queue: number;
  ipd_occupancy: number;
  pending_lab_samples: number;
  pharmacy_revenue: number;
  billing_revenue: number;
  pending_insurance_claims: number;
}

export interface DashboardTrendPoint {
  label: string;
  value: number;
}

export interface DashboardActivity {
  id: string;
  title: string;
  description?: string | null;
  module: string;
  created_at: string;
}

export interface DashboardQuickAction {
  label: string;
  href: string;
  description: string;
}