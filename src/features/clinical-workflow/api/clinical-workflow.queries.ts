// src/features/clinical-workflow/api/clinical-workflow.queries.ts

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/platform/api/query-keys";
import { clinicalWorkflowService } from "./clinical-workflow.service";
import type { ClinicalWorkflowParams } from "../types/clinical-workflow.types";

export function useClinicalPatientContext(patientId?: string) {
  return useQuery({
    queryKey: patientId
      ? queryKeys.clinicalWorkflow.patientContext(patientId)
      : ["clinical-workflow", "patient-context", "empty"],
    queryFn: () => clinicalWorkflowService.getPatientContext(patientId!),
    enabled: Boolean(patientId),
  });
}

export function useClinicalTimeline(params: ClinicalWorkflowParams) {
  return useQuery({
    queryKey: queryKeys.clinicalWorkflow.timeline(params),
    queryFn: () => clinicalWorkflowService.getTimeline(params),
    enabled: Boolean(params.patient_id || params.admission_id || params.encounter_id),
  });
}