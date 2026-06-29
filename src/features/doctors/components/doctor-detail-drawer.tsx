// src/features/doctors/components/doctor-detail-drawer.tsx

"use client";

import { Mail, Stethoscope, IndianRupee, Building2 } from "lucide-react";
import { EntityDrawer, StatusBadge } from "@/shared/components/enterprise";
import type { Doctor } from "../types/doctor.types";
import { Separator } from "@/components/ui/separator";
import { DoctorDepartmentsPanel } from "./doctor-departments-panel";
import { DoctorSchedulesPanel } from "./doctor-schedules-panel";
import { DoctorAvailabilityPanel } from "./doctor-availability-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DoctorDetailDrawerProps {
  open: boolean;
  doctor: Doctor | null;
  onOpenChange: (open: boolean) => void;
}

export function DoctorDetailDrawer({
  open,
  doctor,
  onOpenChange,
}: DoctorDetailDrawerProps) {
  return (
    <EntityDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={doctor?.full_name || "Doctor Profile"}
      description="Doctor profile, departments, schedule, and availability."
    >
      {!doctor ? null : (
        <div className="space-y-6">
          <div className="rounded-xl border bg-muted/30 p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{doctor.full_name}</h3>
                <p className="text-sm text-muted-foreground">
                  Reg No: {doctor.registration_number}
                </p>
              </div>

              <StatusBadge
                label={doctor.is_active ? "Active" : "Inactive"}
                variant={doctor.is_active ? "success" : "muted"}
              />
            </div>

            <div className="grid gap-4 text-sm">
              <InfoItem icon={<Mail />} label="Email" value={doctor.email} />
              <InfoItem
                icon={<Stethoscope />}
                label="Specialization"
                value={doctor.specialization}
              />
              <InfoItem
                icon={<Building2 />}
                label="Departments"
                value={
                  doctor.department_names?.length
                    ? doctor.department_names.join(", ")
                    : "-"
                }
              />
              <InfoItem
                icon={<IndianRupee />}
                label="Consultation Fee"
                value={
                  doctor.consultation_fee
                    ? `₹${doctor.consultation_fee}`
                    : "-"
                }
              />
            </div>
          </div>

          <Separator />

          <Tabs defaultValue="departments">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="departments">Departments</TabsTrigger>
              <TabsTrigger value="schedules">Schedules</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
            </TabsList>

            <TabsContent value="departments" className="mt-4">
              <DoctorDepartmentsPanel doctor={doctor} />
            </TabsContent>

            <TabsContent value="schedules" className="mt-4">
              <DoctorSchedulesPanel doctor={doctor} />
            </TabsContent>

            <TabsContent value="availability" className="mt-4">
              <DoctorAvailabilityPanel doctor={doctor} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </EntityDrawer>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-muted-foreground [&_svg]:h-4 [&_svg]:w-4">
        {icon}
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}