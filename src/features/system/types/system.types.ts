// src/features/system/types/system.types.ts

export interface BackendHealth {
  status: string;
  service?: string;
  version?: string;
  database?: string;
}