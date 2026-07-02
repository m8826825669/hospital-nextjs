// src/features/insurance/components/insurance-workspace-drawer.tsx

"use client";

import {
  EntityActivityList,
  EntityHeader,
  EntityInfoGrid,
  EntityMetaItem,
  EntityWorkspaceDrawer,
  EntityWorkspaceTabs,
  SectionCard,
} from "@/shared/components/enterprise";
import { IndianRupee, ShieldCheck, UserRound, Wallet } from "lucide-react";
import type { InsuranceClaim } from "../types/insurance.types";
import { InsurancePriorityBadge } from "./insurance-priority-badge";
import { InsuranceStatusBadge } from "./insurance-status-badge";
import {
  useInsuranceSettlements,
  useInsuranceTimeline,
} from "../api/insurance.queries";

interface InsuranceWorkspaceDrawerProps {
  open: boolean;
  claim: InsuranceClaim | null;
  onOpenChange: (open: boolean) => void;
}

export function InsuranceWorkspaceDrawer({
  open,
  claim,
  onOpenChange,
}: InsuranceWorkspaceDrawerProps) {
  return (
    <EntityWorkspaceDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={claim ? "Insurance Claim Workspace" : "Insurance Claim"}
      description="Claim details, patient, policy, provider, settlement, and timeline."
    >
      {!claim ? null : <InsuranceWorkspaceContent claim={claim} />}
    </EntityWorkspaceDrawer>
  );
}

function InsuranceWorkspaceContent({ claim }: { claim: InsuranceClaim }) {
  const settlementsQuery = useInsuranceSettlements(claim.id);
  const timelineQuery = useInsuranceTimeline(claim.id);

  return (
    <>
      <EntityHeader
        title={`${claim.claim_number} — ${claim.patient_name}`}
        subtitle={`${claim.provider_name} • Policy: ${
          claim.policy_number || "-"
        }`}
        status={<InsuranceStatusBadge status={claim.status} />}
        meta={
          <>
            <EntityMetaItem
              icon={<UserRound />}
              label="Patient"
              value={claim.patient_name}
            />
            <EntityMetaItem
              icon={<ShieldCheck />}
              label="Provider"
              value={claim.provider_name}
            />
            <EntityMetaItem
              icon={<IndianRupee />}
              label="Claim Amount"
              value={`₹${claim.claim_amount}`}
            />
            <EntityMetaItem
              icon={<Wallet />}
              label="Approved"
              value={
                claim.approved_amount != null
                  ? `₹${claim.approved_amount}`
                  : "-"
              }
            />
          </>
        }
      />

      <EntityWorkspaceTabs
        defaultValue="overview"
        tabs={[
          {
            value: "overview",
            label: "Overview",
            content: (
              <SectionCard title="Claim Summary">
                <div className="mb-4 flex gap-2">
                  <InsurancePriorityBadge priority={claim.priority} />
                  <InsuranceStatusBadge status={claim.status} />
                </div>

                <EntityInfoGrid
                  items={[
                    { label: "Claim Number", value: claim.claim_number },
                    { label: "Patient", value: claim.patient_name },
                    { label: "UHID", value: claim.patient_uhid },
                    { label: "Provider", value: claim.provider_name },
                    { label: "Policy Number", value: claim.policy_number },
                    { label: "Invoice Number", value: claim.invoice_number },
                    { label: "Claim Date", value: claim.claim_date },
                    { label: "Claim Amount", value: `₹${claim.claim_amount}` },
                    {
                      label: "Approved Amount",
                      value:
                        claim.approved_amount != null
                          ? `₹${claim.approved_amount}`
                          : "-",
                    },
                    {
                      label: "Settled Amount",
                      value:
                        claim.settled_amount != null
                          ? `₹${claim.settled_amount}`
                          : "-",
                    },
                    { label: "Diagnosis", value: claim.diagnosis },
                    {
                      label: "Treatment Summary",
                      value: claim.treatment_summary,
                    },
                    { label: "Remarks", value: claim.remarks },
                  ]}
                />
              </SectionCard>
            ),
          },
          {
            value: "settlements",
            label: "Settlement",
            content: (
              <SectionCard title="Settlement History">
                <EntityActivityList
                  isLoading={settlementsQuery.isLoading}
                  items={settlementsQuery.data?.map((settlement) => ({
                    id: settlement.id,
                    title: `${settlement.status} — ₹${settlement.settled_amount}`,
                    description:
                      settlement.settlement_reference ||
                      settlement.remarks ||
                      "",
                    created_at: settlement.settlement_date,
                  }))}
                  emptyTitle="No settlements"
                  emptyDescription="Claim settlement history will appear here."
                />
              </SectionCard>
            ),
          },
          {
            value: "timeline",
            label: "Timeline",
            content: (
              <SectionCard title="Claim Timeline">
                <EntityActivityList
                  isLoading={timelineQuery.isLoading}
                  items={timelineQuery.data}
                  emptyTitle="No claim activity"
                  emptyDescription="Submission, review, approval, rejection, and settlement activity will appear here."
                />
              </SectionCard>
            ),
          },
        ]}
      />
    </>
  );
}