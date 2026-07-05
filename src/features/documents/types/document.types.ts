export interface DocumentDashboard {
  total_documents: number;
  patient_documents: number;
  finance_documents: number;
  hr_documents: number;
  recent_uploads: number;
}

export interface DocumentItem {
  id: string;
  title: string;
  module: string;
  document_type: string;
  file_name: string;
  mime_type: string;
  file_size: number;
  storage_path: string;
  status: string;
  visibility: string;
  current_version: number;
  created_at?: string;
}

export interface DocumentFolder {
  id: string;
  name: string;
  code?: string | null;
  module: string;
  is_active: boolean;
}

export interface DocumentListResponse {
  items: DocumentItem[];
  total: number;
  page: number;
  page_size: number;
  pages: number;
}

export interface DocumentCreateInput {
  module: string;
  title: string;
  document_type: string;
  file_name: string;
  mime_type: string;
  file_size: number;
  storage_path: string;
  visibility?: string;
  description?: string;
}
