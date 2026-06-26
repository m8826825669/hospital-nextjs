import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type WizardStep = {
  id: string;
  title: string;
  description?: string;
};

type WizardStepperProps = {
  steps: WizardStep[];
  currentStep: number;
};

export function WizardStepper({ steps, currentStep }: WizardStepperProps) {
  return (
    <div className="rounded-xl border bg-background p-4 shadow-sm">
      <div className="grid gap-3 md:grid-cols-4">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const active = stepNumber === currentStep;
          const completed = stepNumber < currentStep;

          return (
            <div
              key={step.id}
              className={cn(
                "flex gap-3 rounded-lg p-3 transition",
                active && "bg-muted",
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-medium",
                  completed && "bg-primary text-primary-foreground",
                  active && "border-primary",
                )}
              >
                {completed ? <Check className="h-4 w-4" /> : stepNumber}
              </div>

              <div>
                <p className="text-sm font-medium">{step.title}</p>
                {step.description && (
                  <p className="text-xs text-muted-foreground">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}