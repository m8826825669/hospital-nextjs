// src/shared/components/enterprise/forms/file-upload-field.tsx

import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form";
import { FormFieldWrapper } from "./form-field-wrapper";

interface FileUploadFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label?: string;
  description?: string;
  accept?: string;
  disabled?: boolean;
}

export function FileUploadField<T extends FieldValues>({
  form,
  name,
  label,
  description,
  accept,
  disabled,
}: FileUploadFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { onChange, ...field } }) => (
        <FormFieldWrapper label={label} description={description}>
          <div className="rounded-lg border border-dashed p-4">
            <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Upload className="h-4 w-4" />
              Upload file
            </div>

            <Input
              {...field}
              type="file"
              accept={accept}
              disabled={disabled}
              onChange={(event) => {
                const file = event.target.files?.[0];
                onChange(file);
              }}
            />
          </div>
        </FormFieldWrapper>
      )}
    />
  );
}