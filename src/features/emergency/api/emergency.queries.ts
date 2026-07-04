import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/platform/api/api-error";
import { emergencyService } from "./emergency.service";
import type { EmergencyListParams } from "../types/emergency.types";
import type { EmergencyNoteFormValues, EmergencyOrderFormValues, EmergencyTriageFormValues, EmergencyVisitFormValues } from "../schemas/emergency.schema";

const emergencyKeys = {
  all: ["emergency"] as const,
  dashboard: ["emergency", "dashboard"] as const,
  visits: { all: ["emergency", "visits"] as const, list: (p: EmergencyListParams) => ["emergency", "visits", p] as const },
  triage: { all: ["emergency", "triage"] as const, list: (p: EmergencyListParams) => ["emergency", "triage", p] as const },
  notes: { all: ["emergency", "notes"] as const, list: (p: EmergencyListParams) => ["emergency", "notes", p] as const },
  orders: { all: ["emergency", "orders"] as const, list: (p: EmergencyListParams) => ["emergency", "orders", p] as const },
};
export function useEmergencyDashboard() { return useQuery({ queryKey: emergencyKeys.dashboard, queryFn: emergencyService.dashboard }); }
export function useEmergencyVisits(params: EmergencyListParams) { return useQuery({ queryKey: emergencyKeys.visits.list(params), queryFn: () => emergencyService.listVisits(params) }); }
export function useEmergencyTriages(params: EmergencyListParams) { return useQuery({ queryKey: emergencyKeys.triage.list(params), queryFn: () => emergencyService.listTriages(params) }); }
export function useEmergencyNotes(params: EmergencyListParams) { return useQuery({ queryKey: emergencyKeys.notes.list(params), queryFn: () => emergencyService.listNotes(params) }); }
export function useEmergencyOrders(params: EmergencyListParams) { return useQuery({ queryKey: emergencyKeys.orders.list(params), queryFn: () => emergencyService.listOrders(params) }); }
export function useCreateEmergencyVisit() { const qc = useQueryClient(); return useMutation({ mutationFn: (payload: EmergencyVisitFormValues) => emergencyService.createVisit(payload), onSuccess: () => { qc.invalidateQueries({ queryKey: emergencyKeys.visits.all }); qc.invalidateQueries({ queryKey: emergencyKeys.dashboard }); toast.success("Emergency visit registered"); }, onError: (e) => toast.error(getApiErrorMessage(e)) }); }
export function useUpdateEmergencyVisitStatus() { const qc = useQueryClient(); return useMutation({ mutationFn: ({ id, status }: { id: string; status: string }) => emergencyService.updateVisitStatus(id, { status }), onSuccess: () => { qc.invalidateQueries({ queryKey: emergencyKeys.visits.all }); qc.invalidateQueries({ queryKey: emergencyKeys.dashboard }); toast.success("Visit status updated"); }, onError: (e) => toast.error(getApiErrorMessage(e)) }); }
export function useCreateEmergencyTriage() { const qc = useQueryClient(); return useMutation({ mutationFn: (payload: EmergencyTriageFormValues) => emergencyService.createTriage(payload), onSuccess: () => { qc.invalidateQueries({ queryKey: emergencyKeys.triage.all }); qc.invalidateQueries({ queryKey: emergencyKeys.visits.all }); qc.invalidateQueries({ queryKey: emergencyKeys.dashboard }); toast.success("Triage saved"); }, onError: (e) => toast.error(getApiErrorMessage(e)) }); }
export function useCreateEmergencyNote() { const qc = useQueryClient(); return useMutation({ mutationFn: (payload: EmergencyNoteFormValues) => emergencyService.createNote(payload), onSuccess: () => { qc.invalidateQueries({ queryKey: emergencyKeys.notes.all }); toast.success("ER note saved"); }, onError: (e) => toast.error(getApiErrorMessage(e)) }); }
export function useCreateEmergencyOrder() { const qc = useQueryClient(); return useMutation({ mutationFn: (payload: EmergencyOrderFormValues) => emergencyService.createOrder(payload), onSuccess: () => { qc.invalidateQueries({ queryKey: emergencyKeys.orders.all }); qc.invalidateQueries({ queryKey: emergencyKeys.dashboard }); toast.success("ER order created"); }, onError: (e) => toast.error(getApiErrorMessage(e)) }); }
export function useUpdateEmergencyOrderStatus() { const qc = useQueryClient(); return useMutation({ mutationFn: ({ id, status }: { id: string; status: string }) => emergencyService.updateOrderStatus(id, status), onSuccess: () => { qc.invalidateQueries({ queryKey: emergencyKeys.orders.all }); qc.invalidateQueries({ queryKey: emergencyKeys.dashboard }); toast.success("Order status updated"); }, onError: (e) => toast.error(getApiErrorMessage(e)) }); }
