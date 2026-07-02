// src/features/clinical-workflow/api/clinical-workflow.service.ts

import { apiClient } from "@/platform/api/api-client";
import type {
  ClinicalPatientContext,
  ClinicalTimelineItem,
  ClinicalWorkflowParams,
} from "../types/clinical-workflow.types";

export const clinicalWorkflowService = {
  async getPatientContext(patientId: string): Promise<ClinicalPatientContext> {
    const response = await apiClient.get<ClinicalPatientContext>(
      `/clinical-workflow/patients/${patientId}/context`
    );
    return response.data;
  },

  async getTimeline(
    params: ClinicalWorkflowParams
  ): Promise<ClinicalTimelineItem[]> {
    const response = await apiClient.get<ClinicalTimelineItem[]>(
      "/clinical-workflow/timeline",
      { params }
    );
    return response.data;
  },
};