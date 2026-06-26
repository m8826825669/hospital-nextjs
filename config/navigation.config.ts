import {
  Activity,
  Bed,
  CalendarDays,
  CreditCard,
  FlaskConical,
  LayoutDashboard,
  Palette,
  Pill,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";

export const navigationGroups = [
  {
    label: "Workspace",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        permission: "dashboard:view",
      },
    ],
  },
  {
    label: "Clinical",
    items: [
      {
        title: "Patients",
        href: "/patients",
        icon: Users,
        permission: "patients:view",
      },
      {
        title: "Appointments",
        href: "/appointments",
        icon: CalendarDays,
        permission: "appointments:view",
      },
      {
        title: "OPD",
        href: "/opd",
        icon: Stethoscope,
        permission: "opd:view",
      },
      {
        title: "IPD",
        href: "/ipd",
        icon: Bed,
        permission: "ipd:view",
      },
      {
        title: "OT",
        href: "/ot",
        icon: Activity,
        permission: "ot:view",
      },
    ],
  },
  {
    label: "Diagnostics",
    items: [
      {
        title: "Laboratory",
        href: "/lis",
        icon: FlaskConical,
        permission: "lis:view",
      },
    ],
  },
  {
    label: "Financial",
    items: [
      {
        title: "Billing",
        href: "/billing",
        icon: CreditCard,
        permission: "billing:view",
      },
      {
        title: "Pharmacy",
        href: "/pharmacy",
        icon: Pill,
        permission: "pharmacy:view",
      },
      {
        title: "Insurance",
        href: "/insurance",
        icon: ShieldCheck,
        permission: "insurance:view",
      },
    ],
  },
  {
    label: "Design System",
    items: [
      {
        title: "Overview",
        href: "/design-system",
        icon: Palette,
        permission: "admin:view",
      },
      {
        title: "Forms",
        href: "/design-system/forms",
        icon: Palette,
        permission: "admin:view",
      },
      {
        title: "Overlays",
        href: "/design-system/overlays",
        icon: Palette,
        permission: "admin:view",
      },
    ],
  },
];