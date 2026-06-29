// src/shared/components/enterprise/forms/currency-field.tsx

import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form";
import { FormFieldWrapper } from "./form-field-wrapper";

interface CurrencyFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
}

export function CurrencyField<T extends FieldValues>({
  form,
  name,
  label,
  placeholder = "0.00",
  description,
  disabled,
}: CurrencyFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormFieldWrapper label={label} description={description}>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-sm text-muted-foreground">
              ₹
            </span>

            <Input
              type="number"
              min={0}
              step="0.01"
              className="pl-8"
              placeholder={placeholder}
              disabled={disabled}
              value={field.value ?? ""}
              onChange={(event) =>
                field.onChange(
                  event.target.value === ""
                    ? undefined
                    : Number(event.target.value)
                )
              }
            />
          </div>
        </FormFieldWrapper>
      )}
    />
  );
}