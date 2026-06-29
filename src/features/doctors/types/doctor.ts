export type Doctor = {
  id: string;
  hospital_id: string;
  user_id: string;

  first_name: string;
  last_name: string;
  email: string;

  registration_number: string;
  specialization: string;
  qualification?: string | null;
  consultation_fee?: string | number | null;

  department_names: string[];
  department_ids?: string[];

  active: boolean;
};

export type DoctorSchedule = {
  id: string;
  doctor_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  slot_duration_minutes: number;
  active: boolean;
};