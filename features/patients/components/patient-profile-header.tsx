import {
  CalendarDays,
  Droplets,
  Edit,
  Mail,
  Phone,
  Printer,
  UserPlus,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/data-display/status-badge";
import type { PatientResponse } from "../types/patient.types";
import {
  calculateAge,
  getPatientFullName,
  getPatientInitials,
} from "../utils/patient.utils";

type PatientProfileHeaderProps = {
  patient: PatientResponse;
};

export function PatientProfileHeader({ patient }: PatientProfileHeaderProps) {
  const fullName = getPatientFullName(patient);
  const initials = getPatientInitials(patient);

  return (
    <section className="overflow-hidden rounded-2xl border bg-background shadow-sm">
      <div className="border-b bg-muted/40 p-5">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-xl font-semibold text-primary-foreground shadow-sm">
              {initials || <UserRound className="h-8 w-8" />}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-semibold tracking-tight">
                  {fullName || "Patient"}
                </h1>

                <StatusBadge status={patient.status || "active"} />
              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                {patient.patient_code || patient.id}
              </p>

              <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                {patient.mobile && (
                  <span className="inline-flex items-center gap-1 rounded-full border bg-background px-2 py-1">
                    <Phone className="h-3 w-3" />
                    {patient.mobile}
                  </span>
                )}

                {patient.email && (
                  <span className="inline-flex items-center gap-1 rounded-full border bg-background px-2 py-1">
                    <Mail className="h-3 w-3" />
                    {patient.email}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>

            <Button variant="outline" size="sm">
              <UserPlus className="mr-2 h-4 w-4" />
              Appointment
            </Button>

            <Button variant="outline" size="sm">
              Admit
            </Button>

            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        <InfoTile label="Age" value={calculateAge(patient.dob)} />
        <InfoTile label="Gender" value={patient.gender || "-"} />
        <InfoTile label="DOB" value={patient.dob || "-"} icon={CalendarDays} />
        <InfoTile label="Blood Group" value={patient.blood_group || "-"} icon={Droplets} />
        <InfoTile label="Mobile" value={patient.mobile || "-"} icon={Phone} />
      </div>
    </section>
  );
}

function InfoTile({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: React.ElementType;
}) {
  return (
    <div className="rounded-xl border bg-muted/30 p-3">
      <p className="flex items-center gap-1 text-xs text-muted-foreground">
        {Icon && <Icon className="h-3 w-3" />}
        {label}
      </p>
      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}