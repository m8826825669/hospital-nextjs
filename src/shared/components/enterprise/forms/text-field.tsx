import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form";
import { FormFieldWrapper } from "./form-field-wrapper";

interface TextFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  type?: string;
  disabled?: boolean;
}

export function TextField<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  description,
  type = "text",
  disabled,
}: TextFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormFieldWrapper label={label} description={description}>
          <Input
            name={field.name}
            ref={field.ref}
            onBlur={field.onBlur}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            value={field.value ?? ""}
            onChange={(event) => {
              if (type === "number") {
                field.onChange(
                  event.target.value === ""
                    ? undefined
                    : Number(event.target.value)
                );
              } else {
                field.onChange(event.target.value);
              }
            }}
          />
        </FormFieldWrapper>
      )}
    />
  );
}