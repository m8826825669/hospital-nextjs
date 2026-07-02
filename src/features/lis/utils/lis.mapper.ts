// src/features/lis/utils/lis.mapper.ts

import type {
  CreateLabSamplePayload,
  LabResultEntryPayload,
  LabSample,
  UpdateLabSamplePayload,
} from "../types/lis.types";
import type {
  LabResultEntryValues,
  LabSampleFormValues,
} from "../schemas/lis.schema";

function emptyToUndefined(value?: string | null) {
  return value && value.trim() !== "" ? value : undefined;
}

export function labSampleToFormValues(
  sample: LabSample
): Partial<LabSampleFormValues> {
  return {
    patient_id: sample.patient_id,
    doctor_id: sample.doctor_id ?? "",
    test_id: sample.test_id ?? "",
    profile_id: sample.profile_id ?? "",
    sample_type: sample.sample_type ?? "",
    priority: sample.priority,
    remarks: sample.remarks ?? "",
  };
}

export function labSampleFormToCreatePayload(
  values: LabSampleFormValues
): CreateLabSamplePayload {
  return {
    patient_id: values.patient_id,
    doctor_id: emptyToUndefined(values.doctor_id),
    test_id: emptyToUndefined(values.test_id),
    profile_id: emptyToUndefined(values.profile_id),
    sample_type: emptyToUndefined(values.sample_type),
    priority: values.priority,
    remarks: emptyToUndefined(values.remarks),
  };
}

export function labSampleFormToUpdatePayload(
  values: LabSampleFormValues
): UpdateLabSamplePayload {
  return {
    ...labSampleFormToCreatePayload(values),
  };
}

export function labResultEntryToPayload(
  values: LabResultEntryValues
): LabResultEntryPayload {
  return {
    sample_id: values.sample_id,
    results: [
      {
        test_id: values.test_id,
        result_value: emptyToUndefined(values.result_value),
        remarks: emptyToUndefined(values.remarks),
        is_abnormal: values.is_abnormal,
      },
    ],
  };
}