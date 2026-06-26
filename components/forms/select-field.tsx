import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RequiredLabel } from "./required-label";

type SelectOption = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  options: SelectOption[];
  required?: boolean;
  disabled?: boolean;
};

export function SelectField({
  control,
  name,
  label,
  placeholder = "Select option",
  description,
  options,
  required = false,
  disabled = false,
}: SelectFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <RequiredLabel required={required}>{label}</RequiredLabel>
          </FormLabel>

          <Select
            disabled={disabled}
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {description && <FormDescription>{description}</FormDescription>}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}