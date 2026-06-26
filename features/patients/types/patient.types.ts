export type PatientAddress = {
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
};

export type PatientEmergencyContact = {
  name: string;
  relation: string;
  phone: string;
};

export type PatientCreateRequest = {
  first_name: string;
  middle_name?: string;
  last_name: string;
  dob: string;
  gender: string;
  blood_group?: string;
  mobile: string;
  alternate_mobile?: string;
  email?: string;
  aadhaar_number?: string;
  pan_number?: string;
  passport_number?: string;
  address: PatientAddress;
  emergency_contact: PatientEmergencyContact;
};

export type PatientResponse = {
  id: string;
  patient_code?: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  dob?: string;
  gender: string;
  blood_group?: string;
  mobile?: string;
  alternate_mobile?: string;
  email?: string;
  status?: string;
  created_at?: string;

  address?: {
    address_line1?: string;
    address_line2?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
  };

  emergency_contact?: {
    name?: string;
    relation?: string;
    phone?: string;
  };
};