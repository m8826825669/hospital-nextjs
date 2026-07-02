// src/features/clinical-workflow/constants/clinical-workflow.constants.ts

import type { ClinicalWorkflowAction } from "../types/clinical-workflow.types";

export const clinicalWorkflowActions: ClinicalWorkflowAction[] = [
  {
    id: "appointment",
    label: "Book Appointment",
    description: "Schedule or review patient appointments.",
    href: "/appointments",
    module: "appointment",
  },
  {
    id: "opd",
    label: "Open OPD",
    description: "Start outpatient consultation.",
    href: "/opd",
    module: "opd",
  },
  {
    id: "emergency",
    label: "Emergency Visit",
    description: "Create ER encounter.",
    href: "/emergency",
    module: "emergency",
  },
  {
    id: "ipd",
    label: "Admit Patient",
    description: "Create IPD admission.",
    href: "/ipd",
    module: "ipd",
  },
  {
    id: "lab",
    label: "Lab Order",
    description: "Create laboratory request.",
    href: "/lis",
    module: "lab",
  },
  {
    id: "radiology",
    label: "Radiology Order",
    description: "Create imaging request.",
    href: "/radiology",
    module: "radiology",
  },
  {
    id: "pharmacy",
    label: "Pharmacy",
    description: "Dispense medicines.",
    href: "/pharmacy",
    module: "pharmacy",
  },
  {
    id: "billing",
    label: "Billing",
    description: "Create or view invoices.",
    href: "/billing",
    module: "billing",
  },
];