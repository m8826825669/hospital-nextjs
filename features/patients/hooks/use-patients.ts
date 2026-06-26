"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createPatientApi, getPatientByIdApi, getPatientsApi } from "../api/patients.api";
import type { PatientCreateRequest } from "../types/patient.types";

export function useCreatePatient() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PatientCreateRequest) => createPatientApi(payload),

    onSuccess: async (patient) => {
      await queryClient.invalidateQueries({ queryKey: ["patients"] });

      toast.success("Patient registered successfully");

      if (patient.id) {
        router.replace(`/patients/${patient.id}`);
      } else {
        router.replace("/patients");
      }
    },

    onError: () => {
      toast.error("Failed to register patient");
    },
  });
}

export function usePatients(params: {
  search?: string;
  page?: number;
  size?: number;
}) {
  return useQuery({
    queryKey: ["patients", params],
    queryFn: () => getPatientsApi(params),
  });
}

export function usePatient(id: string) {
  return useQuery({
    queryKey: ["patients", id],
    queryFn: () => getPatientByIdApi(id),
    enabled: !!id,
  });
}