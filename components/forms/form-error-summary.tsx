import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type FormErrorSummaryProps = {
  title?: string;
  errors?: string[];
};

export function FormErrorSummary({
  title = "Please fix the following errors",
  errors = [],
}: FormErrorSummaryProps) {
  if (!errors.length) return null;

  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>

      <AlertDescription>
        <ul className="mt-2 list-inside list-disc space-y-1">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
}