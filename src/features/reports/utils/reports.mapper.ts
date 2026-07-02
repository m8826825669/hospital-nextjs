// src/features/reports/utils/reports.mapper.ts

import type { RunReportPayload } from "../types/reports.types";
import type { RunReportFormValues } from "../schemas/reports.schema";

function emptyToUndefined(value?: string | null) {
  return value && value.trim() !== "" ? value : undefined;
}

export function runReportFormToPayload(
  values: RunReportFormValues
): RunReportPayload {
  return {
    report_id: values.report_id,
    format: values.format,
    date_from: emptyToUndefined(values.date_from),
    date_to: emptyToUndefined(values.date_to),
    patient_id: emptyToUndefined(values.patient_id),
    doctor_id: emptyToUndefined(values.doctor_id),
    department_id: emptyToUndefined(values.department_id),
    module: emptyToUndefined(values.module),
  };
}