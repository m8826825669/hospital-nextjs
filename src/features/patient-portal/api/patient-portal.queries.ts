// src/features/patient-portal/api/patient-portal.queries.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/platform/api/query-keys";
import { getApiErrorMessage } from "@/platform/api/api-error";
import { patientPortalService } from "./patient-portal.service";
import type { PatientPortalListParams } from "../types/patient-portal.types";
import type { PatientPortalProfileFormValues } from "../schemas/patient-portal.schema";

export function usePatientPortalKpis() {
  return useQuery({
    queryKey: queryKeys.patientPortal.kpis,
    queryFn: () => patientPortalService.getKpis(),
  });
}

export function usePatientPortalProfile() {
  return useQuery({
    queryKey: queryKeys.patientPortal.profile,
    queryFn: () => patientPortalService.getProfile(),
  });
}

export function useUpdatePatientPortalProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PatientPortalProfileFormValues) =>
      patientPortalService.updateProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.patientPortal.profile,
      });
      toast.success("Profile updated");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function usePortalAppointments(params: PatientPortalListParams) {
  return useQuery({
    queryKey: queryKeys.patientPortal.appointments.list(params),
    queryFn: () => patientPortalService.listAppointments(params),
  });
}

export function usePortalPrescriptions(params: PatientPortalListParams) {
  return useQuery({
    queryKey: queryKeys.patientPortal.prescriptions.list(params),
    queryFn: () => patientPortalService.listPrescriptions(params),
  });
}

export function usePortalLabReports(params: PatientPortalListParams) {
  return useQuery({
    queryKey: queryKeys.patientPortal.labReports.list(params),
    queryFn: () => patientPortalService.listLabReports(params),
  });
}

export function usePortalRadiologyReports(params: PatientPortalListParams) {
  return useQuery({
    queryKey: queryKeys.patientPortal.radiologyReports.list(params),
    queryFn: () => patientPortalService.listRadiologyReports(params),
  });
}

export function usePortalBills(params: PatientPortalListParams) {
  return useQuery({
    queryKey: queryKeys.patientPortal.bills.list(params),
    queryFn: () => patientPortalService.listBills(params),
  });
}

export function usePortalInsuranceClaims(params: PatientPortalListParams) {
  return useQuery({
    queryKey: queryKeys.patientPortal.claims.list(params),
    queryFn: () => patientPortalService.listClaims(params),
  });
}