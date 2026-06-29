// src/shared/components/enterprise/forms/textarea-field.tsx

import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/ui/form";
import { FormFieldWrapper } from "./form-field-wrapper";

interface TextareaFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
}

export function TextareaField<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  description,
  disabled,
}: TextareaFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormFieldWrapper label={label} description={description}>
          <Textarea
            {...field}
            placeholder={placeholder}
            disabled={disabled}
          />
        </FormFieldWrapper>
      )}
    />
  );
}