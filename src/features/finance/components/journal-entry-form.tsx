// src/features/finance/components/journal-entry-form.tsx

"use client";

import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  CurrencyField,
  FormActions,
  SelectField,
  TextareaField,
  TextField,
} from "@/shared/components/enterprise";
import { journalStatusOptions } from "../constants/finance.constants";
import type { CostCenter, FinanceAccount } from "../types/finance.types";
import {
  journalEntryFormSchema,
  type JournalEntryFormInput,
  type JournalEntryFormValues,
} from "../schemas/finance.schema";

interface JournalEntryFormProps {
  accounts?: FinanceAccount[];
  costCenters?: CostCenter[];
  isSubmitting?: boolean;
  onSubmit: (values: JournalEntryFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

const blankLine = () => ({
  account_id: "",
  cost_center_id: "",
  description: "",
  debit: 0,
  credit: 0,
});

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

export function JournalEntryForm({
  accounts = [],
  costCenters = [],
  isSubmitting,
  onSubmit,
  onCancel,
}: JournalEntryFormProps) {
  const today = new Date().toISOString().slice(0, 10);

  const form = useForm<JournalEntryFormInput>({
    resolver: zodResolver(journalEntryFormSchema),
    defaultValues: {
      entry_date: today,
      reference: "",
      description: "",
      status: "posted",
      lines: [blankLine(), blankLine()],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "lines",
  });

  const lines = useWatch({ control: form.control, name: "lines" });

  const totalDebit = lines.reduce((sum, line) => sum + Number(line.debit || 0), 0);
  const totalCredit = lines.reduce((sum, line) => sum + Number(line.credit || 0), 0);
  const totals = {
    totalDebit,
    totalCredit,
    difference: Number((totalDebit - totalCredit).toFixed(2)),
  };

  const accountOptions = accounts.map((account) => ({
    label: `${account.code} - ${account.name}`,
    value: account.id,
  }));

  const costCenterOptions = costCenters.map((costCenter) => ({
    label: `${costCenter.code} - ${costCenter.name}`,
    value: costCenter.id,
  }));

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => onSubmit(journalEntryFormSchema.parse(values)))}
        className="flex h-full flex-col"
      >
        <div className="flex-1 space-y-6 overflow-y-auto px-1 pb-6">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold">Journal Header</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <TextField form={form} name="entry_date" label="Entry Date" type="date" />
              <TextField form={form} name="reference" label="Reference" />
              <SelectField form={form} name="status" label="Status" options={journalStatusOptions} />
            </div>
            <div className="mt-4">
              <TextareaField form={form} name="description" label="Description" />
            </div>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold">Journal Lines</h3>
                <p className="text-xs text-muted-foreground">
                  Debit and credit totals must be equal before posting.
                </p>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={() => append(blankLine())}>
                <Plus className="mr-2 h-4 w-4" />
                Add Line
              </Button>
            </div>

            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full min-w-[980px] text-sm">
                <thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2">Account</th>
                    <th className="px-3 py-2">Cost Center</th>
                    <th className="px-3 py-2">Description</th>
                    <th className="px-3 py-2">Debit</th>
                    <th className="px-3 py-2">Credit</th>
                    <th className="px-3 py-2" />
                  </tr>
                </thead>
                <tbody>
                  {fields.map((field, index) => (
                    <tr key={field.id} className="border-t align-top">
                      <td className="px-3 py-2">
                        <SelectField
                          form={form}
                          name={`lines.${index}.account_id`}
                          label=""
                          placeholder="Select account"
                          options={accountOptions}
                        />
                      </td>
                      <td className="px-3 py-2">
                        <SelectField
                          form={form}
                          name={`lines.${index}.cost_center_id`}
                          label=""
                          placeholder="Cost center"
                          options={[{ label: "No Cost Center", value: "" }, ...costCenterOptions]}
                        />
                      </td>
                      <td className="px-3 py-2">
                        <TextField form={form} name={`lines.${index}.description`} label="" />
                      </td>
                      <td className="px-3 py-2">
                        <CurrencyField form={form} name={`lines.${index}.debit`} label="" />
                      </td>
                      <td className="px-3 py-2">
                        <CurrencyField form={form} name={`lines.${index}.credit`} label="" />
                      </td>
                      <td className="px-3 py-2 text-right">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          disabled={fields.length <= 2}
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <h3 className="mb-2 text-sm font-semibold">Posting Rules</h3>
              <p className="text-sm text-muted-foreground">
                Every journal entry requires at least two lines. A line can contain either debit or credit, not both.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <h3 className="mb-4 text-sm font-semibold">Journal Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Debit</span>
                  <span>{formatCurrency(totals.totalDebit)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Credit</span>
                  <span>{formatCurrency(totals.totalCredit)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Difference</span>
                    <span className={totals.difference === 0 ? "text-emerald-600" : "text-destructive"}>
                      {formatCurrency(Math.abs(totals.difference))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 -mx-6 flex items-center justify-end gap-3 border-t bg-background px-6 py-4">
          <FormActions submitText="Save Journal Entry" isSubmitting={isSubmitting} onCancel={onCancel} />
        </div>
      </form>
    </Form>
  );
}
