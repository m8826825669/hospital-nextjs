// src/features/dashboard/constants/dashboard.constants.ts

export const DASHBOARD_PERMISSIONS = {
  VIEW_EXECUTIVE: "dashboard.executive.view",
  VIEW_ANALYTICS: "dashboard.analytics.view",
  GLOBAL_SEARCH: "dashboard.global_search.use",
};

export const DASHBOARD_QUICK_ACTIONS = [
  {
    id: "new-patient",
    title: "Register Patient",
    description: "Create a new patient record",
    href: "/patients",
    permission: "patients.create",
  },
  {
    id: "new-appointment",
    title: "Book Appointment",
    description: "Schedule a doctor appointment",
    href: "/appointments",
    permission: "appointments.create",
  },
  {
    id: "new-opd",
    title: "Start OPD Visit",
    description: "Create a new OPD encounter",
    href: "/opd",
    permission: "opd.create",
  },
  {
    id: "new-claim",
    title: "Insurance Claim",
    description: "Create or review insurance claim",
    href: "/insurance",
    permission: "insurance.claims.view",
  },
];