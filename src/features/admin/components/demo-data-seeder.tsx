"use client";

import { useState } from "react";
import { DatabaseZap, Loader2, Sparkles } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { queryKeys } from "@/platform/api/query-keys";
import { getApiErrorMessage } from "@/platform/api/api-error";
import { adminService } from "../api/admin.service";

export function DemoDataSeeder() {
  const queryClient = useQueryClient();
  const [isSeeding, setIsSeeding] = useState(false);

  async function refreshAdminQueries() {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.all }),
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.settings }),
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.departments.all }),
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.wards.all }),
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.beds.all }),
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.doctors.all }),
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.users.all }),
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.roles.all }),
      queryClient.invalidateQueries({ queryKey: queryKeys.hr.employees.all }),
    ]);
  }

  async function seedDemoData() {
    const confirmed = window.confirm(
      "Generate backend enterprise demo data? This will create/update hospital settings, departments, wards, beds, employees, doctors, users, roles, and permissions."
    );

    if (!confirmed) return;

    setIsSeeding(true);

    try {
      const result = await adminService.generateDemoData();

      await refreshAdminQueries();

      toast.success(result.message || "Enterprise demo data generated successfully", {
        description: `Departments: ${result.counts.departments}, Wards: ${result.counts.wards}, Beds: ${result.counts.beds}, Employees: ${result.counts.employees}, Doctors: ${result.counts.doctors}, Users: ${result.counts.users}`,
      });
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setIsSeeding(false);
    }
  }

  return (
    <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-emerald-50 p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
            <DatabaseZap className="h-6 w-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-bold text-slate-950">Development Demo Data</h3>
              <Badge variant="outline" className="rounded-full border-blue-200 bg-white text-blue-700">
                Backend Seeder
              </Badge>
            </div>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">
              Generate realistic backend data for the Administration foundation: hospital settings, departments,
              wards, beds, employees, doctors, users, roles, and permissions.
            </p>
          </div>
        </div>

        <Button
          type="button"
          onClick={seedDemoData}
          disabled={isSeeding}
          className="h-11 rounded-xl bg-blue-600 px-5 font-semibold text-white hover:bg-blue-700"
        >
          {isSeeding ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Enterprise Demo Data
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
