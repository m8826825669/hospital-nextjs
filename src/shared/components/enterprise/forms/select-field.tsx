import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { FormField } from "@/components/ui/form";
import { FormFieldWrapper } from "./form-field-wrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  options: SelectOption[];
  disabled?: boolean;
  valueType?: "string" | "number";
}

export function SelectField<T extends FieldValues>({
  form,
  name,
  label,
  placeholder = "Select option",
  description,
  options,
  disabled,
  valueType = "string",
}: SelectFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormFieldWrapper label={label} description={description}>
          <Select
            value={field.value === undefined ? "" : String(field.value)}
            onValueChange={(value) => {
              field.onChange(valueType === "number" ? Number(value) : value);
            }}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormFieldWrapper>
      )}
    />
  );
}