"use client";

import { AxiosError } from "axios";
import { ArrowRight, Building2, Clock3, Coins, MapPinned, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ErrorState } from "@/shared/components/enterprise";
import {
  useHospitalSettings,
  useUpdateHospitalSettings,
} from "../api/admin.queries";
import { HospitalSettingsForm } from "./hospital-settings-form";
import { DemoDataSeeder } from "./demo-data-seeder";
import type { HospitalSettingFormValues } from "../schemas/admin.schema";

function valueOrFallback(value: string | null | undefined, fallback: string) {
  return value && value.trim().length > 0 ? value : fallback;
}

export function SettingsTab() {
  const settingsQuery = useHospitalSettings();
  const updateSettings = useUpdateHospitalSettings();

  async function handleSettingsSubmit(values: HospitalSettingFormValues) {
    await updateSettings.mutateAsync(values);
  }

  const isMissingSettings =
    settingsQuery.error instanceof AxiosError &&
    settingsQuery.error.response?.status === 404;

  const shouldShowForm = !settingsQuery.isError || isMissingSettings;
  const settings = settingsQuery.data;

  if (!shouldShowForm) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <ErrorState
          title="Could not load settings"
          description="Please check whether the backend is running at NEXT_PUBLIC_API_BASE_URL and whether /api/v1/admin/settings exists."
          onRetry={() => settingsQuery.refetch()}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <DemoDataSeeder />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-0 lg:grid-cols-[1fr_260px]">
          <div className="grid gap-5 p-5 sm:grid-cols-2 xl:grid-cols-5">
            <div className="space-y-1 border-slate-200 xl:border-r xl:pr-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Hospital Name
              </p>
              <p className="text-sm font-semibold text-slate-950">
                {valueOrFallback(settings?.hospital_name, "Not Configured")}
              </p>
              {!settings?.hospital_name ? (
                <Button variant="link" className="h-auto p-0 text-blue-700">
                  Setup Now <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              ) : null}
            </div>

            <div className="space-y-1 border-slate-200 xl:border-r xl:px-5">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <MapPinned className="h-3.5 w-3.5" /> Timezone
              </p>
              <p className="text-sm font-semibold text-slate-950">
                {valueOrFallback(settings?.timezone, "Asia/Kolkata")}
              </p>
            </div>

            <div className="space-y-1 border-slate-200 xl:border-r xl:px-5">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <Coins className="h-3.5 w-3.5" /> Currency
              </p>
              <p className="text-sm font-semibold text-slate-950">
                {valueOrFallback(settings?.currency, "INR")}
              </p>
            </div>

            <div className="space-y-1 border-slate-200 xl:border-r xl:px-5">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <Clock3 className="h-3.5 w-3.5" /> Date Format
              </p>
              <p className="text-sm font-semibold text-slate-950">DD-MM-YYYY</p>
            </div>

            <div className="space-y-1 xl:pl-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </p>
              <Badge className="rounded-full border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                <span className="mr-1.5 h-2 w-2 rounded-full bg-emerald-500" />
                Active
              </Badge>
            </div>
          </div>

          <div className="hidden items-end justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-5 lg:flex">
            <div className="relative h-24 w-40">
              <div className="absolute bottom-0 left-8 h-16 w-24 rounded-t-xl border border-blue-200 bg-white shadow-sm" />
              <div className="absolute bottom-0 left-14 h-20 w-12 rounded-t-lg border border-blue-200 bg-blue-50" />
              <div className="absolute bottom-14 left-[72px] h-4 w-4 rounded-sm bg-red-500" />
              <div className="absolute bottom-[62px] left-[66px] h-1.5 w-8 rounded bg-red-500" />
              <div className="absolute bottom-0 left-2 h-8 w-4 rounded-t-full bg-emerald-400" />
              <div className="absolute bottom-0 right-4 h-10 w-5 rounded-t-full bg-emerald-400" />
              <div className="absolute bottom-0 left-0 h-1 w-full rounded-full bg-emerald-200" />
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-100 bg-gradient-to-r from-white to-slate-50 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 ring-1 ring-blue-100">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-950">Hospital Settings</h2>
              <p className="mt-1 text-sm text-slate-600">
                Configure basic hospital identity, localization, and contact preferences.
              </p>
            </div>
          </div>

          {isMissingSettings ? (
            <Badge variant="outline" className="w-fit rounded-full border-amber-200 bg-amber-50 px-3 py-1 text-amber-800">
              <Building2 className="mr-1 h-3.5 w-3.5" />
              Profile setup required
            </Badge>
          ) : null}
        </div>

        <div className="p-5 sm:p-6">
          {isMissingSettings ? (
            <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              Hospital settings have not been created yet. Fill this form and save to initialize the hospital profile.
            </div>
          ) : null}

          <HospitalSettingsForm
            settings={settings}
            isSubmitting={updateSettings.isPending}
            onSubmit={handleSettingsSubmit}
          />
        </div>
      </div>
    </div>
  );
}
