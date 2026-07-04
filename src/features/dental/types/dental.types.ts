export type DentalVisit = {
  id: string;
  patient_id: string;
  doctor_id?: string | null;
  visit_number: string;
  visit_date: string;
  chief_complaint: string;
  oral_examination?: string | null;
  diagnosis?: string | null;
  treatment_plan?: string | null;
  status: string;
  notes?: string | null;
};

export type DentalChart = {
  id: string;
  patient_id: string;
  visit_id?: string | null;
  tooth_number: number;
  surface?: string | null;
  condition: string;
  notes?: string | null;
};

export type DentalProcedure = {
  id: string;
  patient_id: string;
  visit_id?: string | null;
  tooth_number?: number | null;
  procedure_name: string;
  procedure_type: string;
  scheduled_at?: string | null;
  performed_at?: string | null;
  dentist_id?: string | null;
  status: string;
  cost: number;
  notes?: string | null;
};

export type DentalDashboard = {
  visits_today: number;
  open_visits: number;
  planned_procedures: number;
  completed_procedures: number;
  chart_entries: number;
};

export type PaginatedDental<T> = {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  pages: number;
};
