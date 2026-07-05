import type { AuditDashboard, AuditLogCreateInput, AuditLogListResponse, ComplianceCheck, SecurityEventListResponse } from "../types/audit.types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api/v1";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json() as Promise<T>;
}

export const auditService = {
  dashboard: () => request<AuditDashboard>("/audit/dashboard"),
  logs: (params: { page?: number; page_size?: number; module?: string; action?: string }) => {
    const query = new URLSearchParams();
    query.set("page", String(params.page ?? 1));
    query.set("page_size", String(params.page_size ?? 20));
    if (params.module && params.module !== "all") query.set("module", params.module);
    if (params.action) query.set("action", params.action);
    return request<AuditLogListResponse>(`/audit/logs?${query.toString()}`);
  },
  createLog: (payload: AuditLogCreateInput) => request("/audit/logs", { method: "POST", body: JSON.stringify(payload) }),
  securityEvents: (params: { page?: number; page_size?: number; severity?: string }) => {
    const query = new URLSearchParams();
    query.set("page", String(params.page ?? 1));
    query.set("page_size", String(params.page_size ?? 20));
    if (params.severity && params.severity !== "all") query.set("severity", params.severity);
    return request<SecurityEventListResponse>(`/audit/security-events?${query.toString()}`);
  },
  complianceChecks: (status?: string) => request<ComplianceCheck[]>(`/audit/compliance-checks${status && status !== "all" ? `?status=${status}` : ""}`),
};
