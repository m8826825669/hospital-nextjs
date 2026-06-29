// src/features/doctors/components/doctor-departments-panel.tsx

"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { SelectField } from "@/shared/components/enterprise";
import { Form } from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import type { Doctor } from "../types/doctor.types";
import {
  useDoctorDepartments,
} from "../api/doctors.queries";
import { doctorsService } from "../api/doctors.service";
import { queryKeys } from "@/platform/api/query-keys";
import { useQueryClient } from "@tanstack/react-query";

const schema = z.object({
  department_id: z.string().min(1, "Department is required"),
});

type Values = z.infer<typeof schema>;

const departmentOptions = [
  { label: "Cardiology", value: "cardiology" },
  { label: "Orthopedics", value: "orthopedics" },
  { label: "Neurology", value: "neurology" },
  { label: "General Medicine", value: "general-medicine" },
];

export function DoctorDepartmentsPanel({ doctor }: { doctor: Doctor }) {
  const [submitting, setSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const departmentsQuery = useDoctorDepartments(doctor.id);

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      department_id: "",
    },
  });

  async function onSubmit(values: Values) {
    setSubmitting(true);

    try {
      await doctorsService.addDepartment(doctor.id, values.department_id);

      await queryClient.invalidateQueries({
        queryKey: queryKeys.doctors.departments(doctor.id),
      });

      await queryClient.invalidateQueries({
        queryKey: queryKeys.doctors.all,
      });

      toast.success("Department assigned successfully");
      form.reset();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-medium">Assigned Departments</h3>
        <p className="text-sm text-muted-foreground">
          Departments where this doctor currently practices.
        </p>
      </div>

      <div className="space-y-2">
        {departmentsQuery.isLoading ? (
          <p className="text-sm text-muted-foreground">
            Loading departments...
          </p>
        ) : departmentsQuery.data?.length ? (
          departmentsQuery.data.map((department) => (
            <div
              key={department.id}
              className="rounded-lg border bg-card px-3 py-2 text-sm"
            >
              {department.name}
            </div>
          ))
        ) : (
          <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
            No departments assigned.
          </p>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <SelectField
            form={form}
            name="department_id"
            label="Assign Department"
            placeholder="Select department"
            options={departmentOptions}
          />

          <Button disabled={submitting}>
            <Plus className="mr-2 h-4 w-4" />
            {submitting ? "Assigning..." : "Assign Department"}
          </Button>
        </form>
      </Form>
    </div>
  );
}