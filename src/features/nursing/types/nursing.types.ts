export interface PageResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  pages: number;
}

export interface NursingListParams {
  page?: number;
  size?: number;
  page_size?: number;
  patient_id?: string;
  status?: string;
  shift?: string;
}

export interface NursingDashboard {
  pending_tasks: number;
  scheduled_medications: number;
  overdue_medications: number;
  active_care_plans: number;
  vitals_today: number;
}

export interface VitalSign {
  id: string;
  patient_id: string;
  recorded_at: string;
  temperature?: number | null;
  pulse?: number | null;
  respiratory_rate?: number | null;
  systolic_bp?: number | null;
  diastolic_bp?: number | null;
  spo2?: number | null;
  pain_score?: number | null;
  consciousness_level?: string | null;
  notes?: string | null;
}

export interface NursingNote {
  id: string;
  patient_id: string;
  note_date: string;
  note_type: string;
  shift?: string | null;
  subjective?: string | null;
  objective?: string | null;
  assessment?: string | null;
  plan?: string | null;
}

export interface CarePlan {
  id: string;
  patient_id: string;
  problem: string;
  goal?: string | null;
  interventions?: string | null;
  evaluation?: string | null;
  start_date: string;
  target_date?: string | null;
  status: string;
}

export interface NursingTask {
  id: string;
  patient_id: string;
  assigned_to?: string | null;
  title: string;
  description?: string | null;
  priority: string;
  due_at?: string | null;
  status: string;
  completed_at?: string | null;
}

export interface MedicationAdministration {
  id: string;
  patient_id: string;
  medication_name: string;
  dose?: string | null;
  route?: string | null;
  frequency?: string | null;
  scheduled_at: string;
  administered_at?: string | null;
  administered_by?: string | null;
  status: string;
  remarks?: string | null;
}
