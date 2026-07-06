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

// export const navigationItems = [
//   { title: "Dashboard", href: "/dashboard" },
//   { title: "Doctors", href: "/doctors" },
//   { title: "Patients", href: "/patients" },
//   { title: "Appointments", href: "/appointments" },
//   { title: "OPD", href: "/opd" },
//   { title: "Emergency", href: "/emergency" },
//   { title: "IPD", href: "/ipd" },
//   { title: "Nursing", href: "/nursing" },
//   { title: "OT", href: "/ot" },
//   { title: "Laboratory", href: "/lis" },
//   { title: "Radiology", href: "/radiology" },
//   { title: "Pharmacy", href: "/pharmacy" },
//   { title: "Billing", href: "/billing" },
//   { title: "Insurance", href: "/insurance" },
//   { title: "HR", href: "/hr" },
//   { title: "Finance", href: "/finance" },
//   { title: "Reports", href: "/reports" },
//   { title: "Activity Center", href: "/activity-center" },
//   { title: "Administration", href: "/admin" },
//   { title: "Security", href: "/security" },
// ]
export const navigationItems = [
  {
    title: "Inventory", 
    href: "/inventory", 
    icon: LayoutDashboard, 
    permission: "inventory.view" 
  },
  
  {
    title: "HR", 
    href: "/hr", 
    icon: Users, 
    permission: "hr.view" 
  },
  {
    title: "Finance", 
    href: "/finance", 
    icon: Receipt, 
    permission: "finance.view" 
  },
  {
    title: "Radiology", 
    href: "/radiology", 
    icon: Microscope, 
    permission: "radiology.view" 
  },

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
    title: "Emergency",
    href: "/emergency",
    icon: LayoutDashboard, // Replace with the actual icon for Emergency
    permission: "emergency.view",
  },
  {
    title: "Nursing",
    href: "/nursing",
    icon: Bed, // Replace with the actual icon for Nursing
    permission: "nursing.view",
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
  {
    title: "Patient Portal",
    href: "/patient-portal",
    icon: Users,
    permission: "patient-portal.view",
  },
  {
    title: "Doctor Portal",
    href: "/doctor-portal",
    icon: Stethoscope,
    permission: "doctor-portal.view",
  },
  {
    title: "Dental",
    href: "/dental",
    icon: Stethoscope,
    permission: "dental.view",
  },
  {
    title: "Executive",
    href: "/executive",
    icon: LayoutDashboard,
    permission: "executive.view",
  },
  {
  title: "Scheduling",
  href: "/scheduling",
  icon: CalendarDays,
  permission: "scheduling.view",
  },
  {
  title: "Documents",
  href: "/documents",
  icon: LayoutDashboard,
  permission: "documents.view",
  },
  
  {
  title: "Audit",
  href: "/audit",
  icon: LayoutDashboard,
  permission: "audit.view",
  },
  {
  title: "Administration",
  href: "/admin",
  icon: LayoutDashboard,
  permission: "admin.view",
  },
  
];