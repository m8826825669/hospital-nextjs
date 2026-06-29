// src/shared/components/enterprise/forms/date-field.tsx

"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {  FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormField } from "@/components/ui/form";
import { FormFieldWrapper } from "./form-field-wrapper";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
}

export function DateField<T extends FieldValues>({
  form,
  name,
  label,
  placeholder = "Pick a date",
  description,
  disabled,
}: DateFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormFieldWrapper label={label} description={description}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                disabled={disabled}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !field.value && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value ? format(field.value, "PPP") : placeholder}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={field.value as Date | undefined}
                onSelect={(date) => field.onChange(date)}
              />
            </PopoverContent>
          </Popover>
        </FormFieldWrapper>
      )}
    />
  );
}