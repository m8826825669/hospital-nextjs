// src/platform/navigation/navigation.config.ts

import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Stethoscope,
  Pill,
  Receipt,
  Bed,
  Microscope,
  ShieldCheck,
  Scissors,
} from "lucide-react";

export const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    permission: "dashboard.view",
  },
  {
    title: "Doctors",
    href: "/doctors",
    icon: Stethoscope,
    permission: "doctor.view",
  },
  {
    title: "Patients",
    href: "/patients",
    icon: Users,
    permission: "patient.view",
  },
  {
    title: "Appointments",
    href: "/appointments",
    icon: CalendarDays,
    permission: "appointment.view",
  },
  {
    title: "OPD",
    href: "/opd",
    icon: Stethoscope,
    permission: "opd.view",
  },
  {
    title: "Pharmacy",
    href: "/pharmacy",
    icon: Pill,
    permission: "pharmacy.view",
  },
  {
    title: "Billing",
    href: "/billing",
    icon: Receipt,
    permission: "billing.view",
  },
  {
    title: "IPD",
    href: "/ipd",
    icon: Bed,
    permission: "ipd.view",
  },
  {
    title: "OT",
    href: "/ot",
    icon: Scissors,
    permission: "ot.view",
  },
  {
    title: "LIS",
    href: "/lis",
    icon: Microscope,
    permission: "lis.view",
  },
  {
    title: "Insurance",
    href: "/insurance",
    icon: ShieldCheck,
    permission: "insurance.view",
  },
];