import Link from "next/link";
import { AlertTriangle, CheckCircle2, ClipboardCheck, ExternalLink, ShieldCheck } from "lucide-react";

import { EnterpriseHeaderBadge, EnterprisePage, EnterprisePageBody, EnterprisePageHeader, EnterprisePageSection } from "@/shared/layout";
import { acceptanceMetrics, acceptanceScenarios } from "../constants/acceptance.constants";
import type { AcceptanceStatus } from "../types/acceptance.types";

function statusClasses(status: AcceptanceStatus) {
  if (status === "ready") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (status === "blocked") {
    return "border-rose-200 bg-rose-50 text-rose-700";
  }

  return "border-amber-200 bg-amber-50 text-amber-700";
}

function statusLabel(status: AcceptanceStatus) {
  if (status === "ready") return "Ready";
  if (status === "blocked") return "Blocked";
  return "Review";
}

function priorityClasses(priority: string) {
  if (priority === "Critical") return "border-rose-200 bg-rose-50 text-rose-700";
  if (priority === "High") return "border-amber-200 bg-amber-50 text-amber-700";
  return "border-slate-200 bg-slate-50 text-slate-700";
}

export function AcceptanceDashboard() {
  return (
    <EnterprisePage>
      <EnterprisePageHeader
        eyebrow="Sprint A2.8"
        title="Enterprise Acceptance & Workflow Validation"
        description="A GUI-only acceptance dashboard for confirming that the HMS foundation is ready before Phase B patient journey development begins."
        meta={
          <>
            <EnterpriseHeaderBadge>
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Stable platform baseline
            </EnterpriseHeaderBadge>
            <EnterpriseHeaderBadge>
              <ClipboardCheck className="h-4 w-4 text-blue-600" />
              No Swagger required
            </EnterpriseHeaderBadge>
          </>
        }
        actions={
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            Open Administration
            <ExternalLink className="h-4 w-4" />
          </Link>
        }
      />

      <EnterprisePageBody>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {acceptanceMetrics.map((metric) => (
            <EnterprisePageSection key={metric.label} className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{metric.label}</p>
              <p className="mt-3 text-2xl font-bold tracking-tight text-slate-950">{metric.value}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{metric.helper}</p>
            </EnterprisePageSection>
          ))}
        </div>

        <EnterprisePageSection className="overflow-hidden">
          <div className="border-b border-slate-200 bg-slate-50/80 p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Acceptance rule</p>
                <h2 className="mt-2 text-lg font-semibold text-slate-950">Everything must be tested through the GUI</h2>
                <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">
                  A2.8 is successful only when hospital setup, workforce setup, access setup, and readiness checks can be completed without Swagger, Postman, SQL scripts, or direct database edits.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700">
                <AlertTriangle className="h-4 w-4" />
                Phase B gate
              </div>
            </div>
          </div>

          <div className="divide-y divide-slate-200">
            {acceptanceScenarios.map((scenario) => (
              <section key={scenario.id} className="p-5">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-semibold text-slate-950">{scenario.title}</h3>
                      <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${priorityClasses(scenario.priority)}`}>
                        {scenario.priority}
                      </span>
                    </div>
                    <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">{scenario.description}</p>
                    <p className="mt-2 text-sm font-medium text-slate-700">Outcome: {scenario.outcome}</p>
                  </div>
                </div>

                <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
                  <div className="grid grid-cols-12 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    <div className="col-span-12 md:col-span-4">Validation step</div>
                    <div className="hidden md:col-span-2 md:block">Owner</div>
                    <div className="hidden md:col-span-2 md:block">Module</div>
                    <div className="hidden md:col-span-3 md:block">Expected result</div>
                    <div className="hidden text-right md:col-span-1 md:block">Status</div>
                  </div>

                  <div className="divide-y divide-slate-200 bg-white">
                    {scenario.steps.map((step) => (
                      <div key={step.id} className="grid grid-cols-12 gap-3 px-4 py-4 text-sm">
                        <div className="col-span-12 md:col-span-4">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                            <div>
                              <p className="font-semibold text-slate-900">{step.title}</p>
                              {step.route ? (
                                <Link href={step.route} className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-blue-700 hover:text-blue-800">
                                  Open {step.module}
                                  <ExternalLink className="h-3 w-3" />
                                </Link>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className="col-span-6 text-slate-600 md:col-span-2">{step.owner}</div>
                        <div className="col-span-6 font-medium text-slate-700 md:col-span-2">{step.module}</div>
                        <div className="col-span-12 text-slate-600 md:col-span-3">{step.expectedResult}</div>
                        <div className="col-span-12 md:col-span-1 md:text-right">
                          <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClasses(step.status)}`}>
                            {statusLabel(step.status)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </EnterprisePageSection>
      </EnterprisePageBody>
    </EnterprisePage>
  );
}
