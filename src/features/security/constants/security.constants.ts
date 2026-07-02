// src/features/security/constants/security.constants.ts

export const userStatusOptions = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Locked", value: "locked" },
];

export const sessionStatusOptions = [
  { label: "Active", value: "active" },
  { label: "Expired", value: "expired" },
  { label: "Revoked", value: "revoked" },
];

export const securityModuleOptions = [
  { label: "Users", value: "users" },
  { label: "Roles", value: "roles" },
  { label: "Permissions", value: "permissions" },
  { label: "Patients", value: "patients" },
  { label: "Appointments", value: "appointments" },
  { label: "Billing", value: "billing" },
  { label: "Finance", value: "finance" },
  { label: "Admin", value: "admin" },
];