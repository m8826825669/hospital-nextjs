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
    code: ward.code ?? "",
    floor: ward.floor ?? "",
    is_active: ward.is_active,
  };
}

export function bedToFormValues(bed: Bed): Partial<BedFormValues> {
  return {
    ward_id: bed.ward_id,
    bed_number: bed.bed_number,
    bed_type: bed.bed_type ?? "",
    status: bed.status,
    is_active: bed.is_active,
  };
}
