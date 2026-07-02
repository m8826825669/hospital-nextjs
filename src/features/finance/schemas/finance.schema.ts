// src/features/finance/schemas/finance.schema.ts

import { z } from "zod";

export const accountFormSchema = z.object({
  code: z.string().min(1, "Account code is required"),
  name: z.string().min(2, "Account name is required"),
  type: z.enum(["asset", "liability", "equity", "income", "expense"]),
  parent_id: z.string().optional(),
  is_active: z.boolean().default(true),
});

export const voucherFormSchema = z.object({
  voucher_type: z.enum(["receipt", "payment", "journal"]),
  voucher_date: z.string().min(1, "Voucher date is required"),
  account_id: z.string().min(1, "Account is required"),
  amount: z.coerce.number().min(1, "Amount is required"),
  reference_number: z.string().optional(),
  narration: z.string().optional(),
});

export type AccountFormInput = z.input<typeof accountFormSchema>;
export type AccountFormValues = z.output<typeof accountFormSchema>;

export type VoucherFormInput = z.input<typeof voucherFormSchema>;
export type VoucherFormValues = z.output<typeof voucherFormSchema>;