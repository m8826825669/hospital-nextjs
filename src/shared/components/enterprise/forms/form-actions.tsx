// src/shared/components/enterprise/forms/form-actions.tsx

import { Button } from "@/components/ui/button";

interface FormActionsProps {
  submitText?: string;
  cancelText?: string;
  isSubmitting?: boolean;
  onCancel?: () => void;
}

export function FormActions({
  submitText = "Save",
  cancelText = "Cancel",
  isSubmitting = false,
  onCancel,
}: FormActionsProps) {
  return (
    <div className="flex justify-end gap-2 border-t pt-4">
      {onCancel && (
        <Button type="button" variant="outline" onClick={onCancel}>
          {cancelText}
        </Button>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : submitText}
      </Button>
    </div>
  );
}