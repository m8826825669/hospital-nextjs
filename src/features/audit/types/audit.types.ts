export interface AuditDashboard {
  total_audit_logs: number;
  security_events: number;
  unresolved_security_events: number;
  active_sessions: number;
  compliance_pending: number;
  high_risk_events: number;
}

export interface AuditLog {
  id: string;
  module: string;
  action: string;
  entity_type?: string | null;
  entity_id?: string | null;
  description?: string | null;
  risk_level: string;
  success: boolean;
  created_at: string;
}

export interface AuditLogListResponse {
  items: AuditLog[];
  total: number;
  page: number;
  page_size: number;
  pages: number;
}

export interface SecurityEvent {
  id: string;
  event_type: string;
  severity: string;
  title: string;
  message?: string | null;
  resolved: boolean;
  created_at: string;
}

export interface SecurityEventListResponse {
  items: SecurityEvent[];
  total: number;
  page: number;
  page_size: number;
  pages: number;
}

export interface ComplianceCheck {
  id: string;
  code: string;
  name: string;
  category: string;
  status: string;
  risk_level: string;
  score: number;
  evidence_required: boolean;
  due_at?: string | null;
}

export interface AuditLogCreateInput {
  module: string;
  action: string;
  entity_type?: string;
  description?: string;
  risk_level?: string;
  success?: boolean;
}
