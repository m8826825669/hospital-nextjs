// src/features/pharmacy/utils/medicine.mapper.ts

import type {
  CreateMedicinePayload,
  Medicine,
  UpdateMedicinePayload,
} from "../types/pharmacy.types";
import type { MedicineFormValues } from "../schemas/medicine.schema";

function emptyToUndefined(value?: string | null) {
  return value && value.trim() !== "" ? value : undefined;
}

export function medicineToFormValues(
  medicine: Medicine
): Partial<MedicineFormValues> {
  return {
    name: medicine.name,
    generic_name: medicine.generic_name ?? "",
    brand_name: medicine.brand_name ?? "",
    category_id: medicine.category_id ?? "",
    dosage_form: medicine.dosage_form ?? "",
    strength: medicine.strength ?? "",
    unit: medicine.unit ?? "",
    manufacturer: medicine.manufacturer ?? "",
    reorder_level: medicine.reorder_level ?? undefined,
    is_active: medicine.is_active,
  };
}

export function medicineFormToCreatePayload(
  values: MedicineFormValues
): CreateMedicinePayload {
  return {
    name: values.name,
    generic_name: emptyToUndefined(values.generic_name),
    brand_name: emptyToUndefined(values.brand_name),
    category_id: emptyToUndefined(values.category_id),
    dosage_form: emptyToUndefined(values.dosage_form),
    strength: emptyToUndefined(values.strength),
    unit: emptyToUndefined(values.unit),
    manufacturer: emptyToUndefined(values.manufacturer),
    reorder_level: values.reorder_level,
    is_active: values.is_active,
  };
}

export function medicineFormToUpdatePayload(
  values: MedicineFormValues
): UpdateMedicinePayload {
  return {
    ...medicineFormToCreatePayload(values),
  };
}