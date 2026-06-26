"use client";

import { useState } from "react";
import {
  Activity,
  CalendarDays,
  CreditCard,
  FileText,
  FlaskConical,
  Pill,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { SectionCard } from "@/components/common/section-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PatientResponse } from "../types/patient.types";
import { PatientTimeline } from "@/components/timeline/patient-timeline";
import { getMockPatientTimeline } from "../utils/patient-timeline.mock";

type PatientProfileTabsProps = {
  patient: PatientResponse;
};

const tabs = [
  { id: "overview", label: "Overview", icon: UserRound },
  { id: "visits", label: "Visits", icon: Activity },
  { id: "appointments", label: "Appointments", icon: CalendarDays },
  { id: "prescriptions", label: "Prescriptions", icon: Pill },
  { id: "lab", label: "Lab", icon: FlaskConical },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "insurance", label: "Insurance", icon: ShieldCheck },
  { id: "documents", label: "Documents", icon: FileText },
];

export function PatientProfileTabs({ patient }: PatientProfileTabsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="w-full space-y-4">
      <div className="rounded-xl border bg-background p-2 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "inline-flex items-center rounded-lg px-3 py-2 text-sm transition",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === "overview" && <PatientOverview patient={patient} />}

      {activeTab !== "overview" && (
        <SectionCard title={tabs.find((tab) => tab.id === activeTab)?.label || ""}>
          <p className="text-sm text-muted-foreground">
            {tabs.find((tab) => tab.id === activeTab)?.label} data will appear here.
          </p>
        </SectionCard>
      )}
    </div>
  );
}

function PatientOverview({ patient }: { patient: PatientResponse }) {
  const timelineItems = getMockPatientTimeline(patient);
  return (
    <div className="space-y-4">
      <SectionCard
        title="Patient Summary"
        description="Administrative and clinical overview."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <InfoBox label="Patient Code" value={patient.patient_code || "-"} />
          <InfoBox label="Email" value={patient.email || "-"} />
          <InfoBox label="Mobile" value={patient.mobile || "-"} />
          <InfoBox label="Alternate Mobile" value={patient.alternate_mobile || "-"} />
          <InfoBox label="Gender" value={patient.gender || "-"} />
          <InfoBox label="Blood Group" value={patient.blood_group || "-"} />
          <InfoBox label="Registered" value={patient.created_at || "-"} />
        </div>
      </SectionCard>

      <SectionCard title="Address">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <InfoBox label="Address Line 1" value={patient.address?.address_line1 || "-"} />
          <InfoBox label="Address Line 2" value={patient.address?.address_line2 || "-"} />
          <InfoBox label="City" value={patient.address?.city || "-"} />
          <InfoBox label="State" value={patient.address?.state || "-"} />
          <InfoBox label="Country" value={patient.address?.country || "-"} />
          <InfoBox label="Pincode" value={patient.address?.pincode || "-"} />
        </div>
      </SectionCard>

      <SectionCard title="Emergency Contact">
        <div className="grid gap-4 md:grid-cols-3">
          <InfoBox label="Name" value={patient.emergency_contact?.name || "-"} />
          <InfoBox label="Relation" value={patient.emergency_contact?.relation || "-"} />
          <InfoBox label="Phone" value={patient.emergency_contact?.phone || "-"} />
        </div>
      </SectionCard>

      <SectionCard
        title="Clinical Snapshot"
        description="High-level patient clinical indicators."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <InfoBox label="Allergies" value="None recorded" />
          <InfoBox label="Open Appointments" value="0" />
          <InfoBox label="Outstanding Bills" value="₹0" />
          <InfoBox label="Pending Lab Reports" value="0" />
        </div>
      </SectionCard>
      <SectionCard
          title="Patient Timeline"
          description="Chronological view of patient activity across hospital workflows."
        >
          <PatientTimeline items={timelineItems} />
        </SectionCard>
    </div>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-muted/20 p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 break-words text-sm font-medium">{value}</p>
    </div>
  );
}