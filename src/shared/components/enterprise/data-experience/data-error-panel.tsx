import { AlertTriangle, RefreshCcw } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface DataErrorPanelProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function DataErrorPanel({
  title = "Unable to load records",
  description = "The system could not load this data. Check your connection or try again.",
  onRetry,
}: DataErrorPanelProps) {
  return (
    <Alert variant="destructive" className="rounded-2xl">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="mt-2 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <span>{description}</span>
        {onRetry && (
          <Button type="button" variant="outline" size="sm" className="gap-2 bg-background" onClick={onRetry}>
            <RefreshCcw className="h-4 w-4" />
            Retry
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}
