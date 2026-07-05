import type { DocumentCreateInput, DocumentDashboard, DocumentItem, DocumentListResponse } from "../types/document.types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api/v1";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export const documentService = {
  dashboard: () => request<DocumentDashboard>("/documents/dashboard"),
  list: (params: { page?: number; page_size?: number; search?: string; module?: string }) => {
    const query = new URLSearchParams();
    query.set("page", String(params.page ?? 1));
    query.set("page_size", String(params.page_size ?? 20));
    if (params.search) query.set("search", params.search);
    if (params.module && params.module !== "all") query.set("module", params.module);
    return request<DocumentListResponse>(`/documents?${query.toString()}`);
  },
  create: (payload: DocumentCreateInput) => request<DocumentItem>("/documents", { method: "POST", body: JSON.stringify(payload) }),
};
