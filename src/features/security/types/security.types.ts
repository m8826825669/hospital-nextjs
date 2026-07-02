// src/features/security/types/security.types.ts

export type UserStatus = "active" | "inactive" | "locked";
export type SessionStatus = "active" | "expired" | "revoked";

export interface SecurityUser {
  id: string;
  hospital_id: string;
  full_name: string;
  email: string;
  phone?: string | null;
  status: UserStatus;
  is_active: boolean;
  roles?: string[];
  last_login_at?: string | null;
  mfa_enabled?: boolean;
}

export interface Role {
  id: string;
  hospital_id: string;
  name: string;
  code: string;
  description?: string | null;
  is_system?: boolean;
  is_active: boolean;
}

export interface Permission {
  id: string;
  module: string;
  action: string;
  code: string;
  description?: string | null;
}

export interface RolePermission {
  role_id: string;
  permission_id: string;
  allowed: boolean;
}

export interface UserSession {
  id: string;
  user_id: string;
  user_name: string;
  ip_address?: string | null;
  user_agent?: string | null;
  status: SessionStatus;
  created_at: string;
  last_seen_at?: string | null;
}

export interface SecurityAuditLog {
  id: string;
  actor_name?: string | null;
  action: string;
  module?: string | null;
  entity_type?: string | null;
  entity_id?: string | null;
  description?: string | null;
  ip_address?: string | null;
  created_at: string;
}

export interface SecurityListParams {
  page?: number;
  size?: number;
  search?: string;
  status?: string;
  module?: string;
  role_id?: string;
}