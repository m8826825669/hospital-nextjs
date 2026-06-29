// src/platform/auth/auth.types.ts

export type Permission = string;

export interface CurrentUser {
  id: string;
  email: string;
  full_name?: string;
  hospital_id: string;
  role?: string;
  permissions: Permission[];
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  user?: CurrentUser;
}