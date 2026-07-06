import type {
  BedFormValues,
  DepartmentFormValues,
  WardFormValues,
} from "../schemas/admin.schema";
import type { Bed, Department, Ward } from "../types/admin.types";

export function departmentToFormValues(
  department: Department
): Partial<DepartmentFormValues> {
  return {
    name: department.name,
    code: department.code ?? "",
    description: department.description ?? "",
    is_active: department.is_active,
  };
}

export function wardToFormValues(ward: Ward): Partial<WardFormValues> {
  return {
    name: ward.name,
    ward_type: ward.ward_type ?? "General Ward",
    floor: ward.floor ?? "",
    active: ward.active ?? ward.is_active ?? true,
  };
}

export function bedToFormValues(bed: Bed): Partial<BedFormValues> {
  return {
    ward_id: bed.ward_id,
    bed_number: bed.bed_number,
    bed_type: bed.bed_type ?? "GENERAL",
    status: bed.status,
    active: bed.active ?? bed.is_active ?? true,
  };
}
