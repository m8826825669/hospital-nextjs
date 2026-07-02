// src/features/opd/components/opd-workspace-drawer.tsx

"use client";

import {
  EntityWorkspaceDrawer,
  EntityWorkspaceTabs,
} from "@/shared/components/enterprise";
import type { OpdEncounter } from "../types/opd.types";
import { OpdHeader } from "./opd-header";
import { OpdOverviewTab } from "./opd-overview-tab";
import { OpdClinicalNotesTab } from "./opd-clinical-notes-tab";
import { OpdPrescriptionsTab } from "./opd-prescriptions-tab";
import { OpdLabOrdersTab } from "./opd-lab-orders-tab";
import { OpdTimelineTab } from "./opd-timeline-tab";

interface OpdWorkspaceDrawerProps {
  open: boolean;
  encounter: OpdEncounter | null;
  onOpenChange: (open: boolean) => void;
}

export function OpdWorkspaceDrawer({
  open,
  encounter,
  onOpenChange,
}: OpdWorkspaceDrawerProps) {
  return (
    <EntityWorkspaceDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={encounter ? "OPD Encounter Workspace" : "OPD Encounter"}
      description="Clinical notes, diagnosis, prescriptions, lab orders, and follow-up."
    >
      {!encounter ? null : (
        <>
          <OpdHeader encounter={encounter} />

          <EntityWorkspaceTabs
            defaultValue="overview"
            tabs={[
              {
                value: "overview",
                label: "Overview",
                content: <OpdOverviewTab encounter={encounter} />,
              },
              {
                value: "clinical",
                label: "Clinical",
                content: <OpdClinicalNotesTab encounter={encounter} />,
              },
              {
                value: "rx",
                label: "Rx",
                content: <OpdPrescriptionsTab encounter={encounter} />,
              },
              {
                value: "labs",
                label: "Labs",
                content: <OpdLabOrdersTab encounter={encounter} />,
              },
              {
                value: "timeline",
                label: "Timeline",
                content: <OpdTimelineTab encounter={encounter} />,
              },
            ]}
          />
        </>
      )}
    </EntityWorkspaceDrawer>
  );
}