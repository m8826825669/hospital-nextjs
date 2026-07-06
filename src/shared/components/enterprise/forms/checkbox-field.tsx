// src/shared/components/enterprise/forms/checkbox-field.tsx

import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface CheckboxFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label: string;
  disabled?: boolean;
}

export function CheckboxField<T extends FieldValues>({
  form,
  name,
  label,
  disabled,
}: CheckboxFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-center gap-3 space-y-0 rounded-lg border p-3">
          <Checkbox
            checked={field.value ?? false}
            disabled={disabled}
            onCheckedChange={field.onChange}
          />

          <FormLabel className="font-normal">{label}</FormLabel>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}