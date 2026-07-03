// src/features/finance/schemas/finance.schema.ts

import { z } from "zod";

const emptyStringToNull = (value: unknown) => value === "" ? null : value;

export const accountFormSchema = z.object({
  code: z.string().min(1, "Account code is required"),
  name: z.string().min(2, "Account name is required"),
  account_type: z.enum(["asset", "liability", "equity", "income", "expense"]),
  parent_id: z.preprocess(emptyStringToNull, z.string().nullable().optional()),
  description: z.preprocess(emptyStringToNull, z.string().nullable().optional()),
  is_active: z.boolean().default(true),
});

export const costCenterFormSchema = z.object({
  code: z.string().min(1, "Cost center code is required"),
  name: z.string().min(2, "Cost center name is required"),
  department_id: z.preprocess(emptyStringToNull, z.string().nullable().optional()),
  description: z.preprocess(emptyStringToNull, z.string().nullable().optional()),
  is_active: z.boolean().default(true),
});

export const journalEntryLineSchema = z.object({
  account_id: z.string().min(1, "Account is required"),
  cost_center_id: z.preprocess(emptyStringToNull, z.string().nullable().optional()),
  description: z.preprocess(emptyStringToNull, z.string().nullable().optional()),
  debit: z.coerce.number().min(0).default(0),
  credit: z.coerce.number().min(0).default(0),
}).superRefine((line, ctx) => {
  if (line.debit === 0 && line.credit === 0) {
    ctx.addIssue({ code: "custom", message: "Debit or credit is required", path: ["debit"] });
  }
  if (line.debit > 0 && line.credit > 0) {
    ctx.addIssue({ code: "custom", message: "Use either debit or credit, not both", path: ["debit"] });
  }
});

export const journalEntryFormSchema = z.object({
  entry_date: z.string().min(1, "Entry date is required"),
  reference: z.preprocess(emptyStringToNull, z.string().nullable().optional()),
  description: z.preprocess(emptyStringToNull, z.string().nullable().optional()),
  status: z.enum(["draft", "posted", "cancelled"]).default("posted"),
  lines: z.array(journalEntryLineSchema).min(2, "At least two journal lines are required"),
}).superRefine((entry, ctx) => {
  const debit = entry.lines.reduce((sum, line) => sum + Number(line.debit || 0), 0);
  const credit = entry.lines.reduce((sum, line) => sum + Number(line.credit || 0), 0);

  if (Number(debit.toFixed(2)) !== Number(credit.toFixed(2))) {
    ctx.addIssue({
      code: "custom",
      message: "Total debit and credit must be equal",
      path: ["lines"],
    });
  }
});

export type AccountFormInput = z.input<typeof accountFormSchema>;
export type AccountFormValues = z.output<typeof accountFormSchema>;

export type CostCenterFormInput = z.input<typeof costCenterFormSchema>;
export type CostCenterFormValues = z.output<typeof costCenterFormSchema>;

export type JournalEntryFormInput = z.input<typeof journalEntryFormSchema>;
export type JournalEntryFormValues = z.output<typeof journalEntryFormSchema>;

export const voucherFormSchema = z.object({
  voucher_type: z.enum(["receipt", "payment", "contra", "journal"]),
  voucher_date: z.string().min(1, "Date is required"),
  account_id: z.string().min(1, "Account is required"),
  amount: z.coerce.number().positive("Amount must be positive"),
  reference_number: z.preprocess(emptyStringToNull, z.string().nullable().optional()),
  narration: z.preprocess(emptyStringToNull, z.string().nullable().optional()),
});

export type VoucherFormInput = z.input<typeof voucherFormSchema>;
export type VoucherFormValues = z.output<typeof voucherFormSchema>;
