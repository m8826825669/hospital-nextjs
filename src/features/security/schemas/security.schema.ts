// src/features/security/schemas/security.schema.ts

import { z } from "zod";

export const securityUserFormSchema = z.object({
  full_name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  status: z.enum(["active", "inactive", "locked"]),
  is_active: z.boolean().default(true),
  mfa_enabled: z.boolean().default(false),
});

export const roleFormSchema = z.object({
  name: z.string().min(2, "Role name is required"),
  code: z.string().min(1, "Role code is required"),
  description: z.string().optional(),
  is_active: z.boolean().default(true),
});

export const passwordPolicyFormSchema = z.object({
  min_length: z.coerce.number().min(6),
  require_uppercase: z.boolean().default(true),
  require_lowercase: z.boolean().default(true),
  require_number: z.boolean().default(true),
  require_symbol: z.boolean().default(false),
  password_expiry_days: z.coerce.number().min(0),
  lock_after_failed_attempts: z.coerce.number().min(0),
});

export type SecurityUserFormInput = z.input<typeof securityUserFormSchema>;
export type SecurityUserFormValues = z.output<typeof securityUserFormSchema>;

export type RoleFormInput = z.input<typeof roleFormSchema>;
export type RoleFormValues = z.output<typeof roleFormSchema>;

export type PasswordPolicyFormInput = z.input<typeof passwordPolicyFormSchema>;
export type PasswordPolicyFormValues = z.output<typeof passwordPolicyFormSchema>;