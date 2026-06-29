// src/shared/components/enterprise/forms/form-field-wrapper.tsx

import { ReactNode } from "react";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface FormFieldWrapperProps {
  label?: string;
  description?: string;
  children: ReactNode;
}

export function FormFieldWrapper({
  label,
  description,
  children,
}: FormFieldWrapperProps) {
  return (
    <FormItem>
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>{children}</FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
}