"use client";

import { useState } from "react";

import { PageHeader } from "@/components/common/page-header";
import { SectionCard } from "@/components/common/section-card";
import { AppDialog } from "@/components/overlays/app-dialog";
import { AppDrawer } from "@/components/overlays/app-drawer";
import { ConfirmDialog } from "@/components/overlays/confirm-dialog";
import { WizardStepper } from "@/components/wizard/wizard-stepper";
import { Button } from "@/components/ui/button";

const patientSteps = [
  {
    id: "basic",
    title: "Basic Info",
    description: "Identity",
  },
  {
    id: "contact",
    title: "Contact",
    description: "Address",
  },
  {
    id: "medical",
    title: "Medical",
    description: "Clinical",
  },
  {
    id: "review",
    title: "Review",
    description: "Confirm",
  },
];

export default function OverlaysPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [step, setStep] = useState(1);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dialogs, Drawers & Wizard"
        description="Reusable overlay and stepper components for enterprise workflows."
      />

      <SectionCard
        title="Overlay Components"
        description="Used for patient forms, confirmations, quick edits, and workflow panels."
      >
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>
          <Button variant="outline" onClick={() => setDrawerOpen(true)}>
            Open Drawer
          </Button>
          <Button variant="destructive" onClick={() => setConfirmOpen(true)}>
            Delete Confirmation
          </Button>
        </div>
      </SectionCard>

      <SectionCard
        title="Wizard Stepper"
        description="Used for Patient Registration and multi-step clinical workflows."
      >
        <div className="space-y-4">
          <WizardStepper steps={patientSteps} currentStep={step} />

          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={step === 1}
              onClick={() => setStep((value) => value - 1)}
            >
              Previous
            </Button>

            <Button
              disabled={step === patientSteps.length}
              onClick={() => setStep((value) => value + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </SectionCard>

      <AppDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Create Patient Note"
        description="This dialog will be reused for smaller focused workflows."
      >
        <div className="rounded-lg border p-4 text-sm text-muted-foreground">
          Dialog content goes here.
        </div>
      </AppDialog>

      <AppDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        title="Patient Quick View"
        description="Drawers are useful for side panels and quick previews."
      >
        <div className="rounded-lg border p-4 text-sm text-muted-foreground">
          Drawer content goes here.
        </div>
      </AppDrawer>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete this record?"
        description="This action cannot be undone."
        confirmText="Delete"
        destructive
        onConfirm={() => setConfirmOpen(false)}
      />
    </div>
  );
}