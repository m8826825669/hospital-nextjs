// src/shared/components/enterprise/forms/enterprise-form.tsx

import type { ReactNode } from "react";
import { AlertCircle, CheckCircle2, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/shared/lib/utils";

type IconComponent = LucideIcon;

interface EnterpriseFormShellProps {
  children: ReactNode;
  className?: string;
  density?: "comfortable" | "compact";
}

export function EnterpriseFormShell({
  children,
  className,
  density = "comfortable",
}: EnterpriseFormShellProps) {
  return (
    <div
      className={cn(
        "space-y-5 pb-24",
        density === "compact" && "space-y-4 pb-20",
        className
      )}
    >
      {children}
    </div>
  );
}

interface EnterpriseFormHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  icon?: IconComponent;
  aside?: ReactNode;
}

export function EnterpriseFormHero({
  eyebrow = "Enterprise Form",
  title,
  description,
  icon: Icon,
  aside,
}: EnterpriseFormHeroProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 shadow-sm">
      <div className="grid gap-6 p-6 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-center">
        <div className="flex items-start gap-4">
          {Icon ? (
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-lg shadow-blue-100">
              <Icon className="h-7 w-7" />
            </div>
          ) : null}
          <div className="min-w-0">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {eyebrow}
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
              {title}
            </h2>
            {description ? (
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                {description}
              </p>
            ) : null}
          </div>
        </div>
        {aside ? (
          <div className="rounded-2xl border border-white/80 bg-white/85 p-4 shadow-sm">
            {aside}
          </div>
        ) : null}
      </div>
    </div>
  );
}

interface EnterpriseFormSectionProps {
  children: ReactNode;
  title: string;
  description?: string;
  step?: string;
  icon?: IconComponent;
  className?: string;
}

export function EnterpriseFormSection({
  children,
  title,
  description,
  step,
  icon: Icon,
  className,
}: EnterpriseFormSectionProps) {
  return (
    <section
      className={cn(
        "rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md",
        className
      )}
    >
      <div className="mb-5 flex items-start gap-3">
        {step ? (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-sm font-bold text-blue-700">
            {step}
          </div>
        ) : null}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {Icon ? <Icon className="h-4 w-4 text-blue-600" /> : null}
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              {title}
            </h3>
          </div>
          {description ? (
            <p className="mt-1 text-sm leading-6 text-slate-500">
              {description}
            </p>
          ) : null}
        </div>
      </div>
      {children}
    </section>
  );
}

interface EnterpriseFormGridProps {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export function EnterpriseFormGrid({
  children,
  columns = 2,
  className,
}: EnterpriseFormGridProps) {
  const columnClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 lg:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
  }[columns];

  return <div className={cn("grid gap-5", columnClass, className)}>{children}</div>;
}

interface EnterpriseReadonlyFieldProps {
  label: string;
  value: ReactNode;
  icon?: IconComponent;
  description?: string;
  className?: string;
}

export function EnterpriseReadonlyField({
  label,
  value,
  icon: Icon,
  description,
  className,
}: EnterpriseReadonlyFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium text-slate-900">{label}</label>
      <div className="flex min-h-11 items-center rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-600">
        {Icon ? <Icon className="mr-2 h-4 w-4 text-slate-400" /> : null}
        {value}
      </div>
      {description ? <p className="text-xs leading-5 text-slate-500">{description}</p> : null}
    </div>
  );
}

interface EnterpriseFormNoticeProps {
  children: ReactNode;
  tone?: "info" | "warning" | "success";
  className?: string;
}

export function EnterpriseFormNotice({
  children,
  tone = "info",
  className,
}: EnterpriseFormNoticeProps) {
  const toneClass = {
    info: "border-blue-200 bg-blue-50 text-blue-900",
    warning: "border-amber-200 bg-amber-50 text-amber-900",
    success: "border-emerald-200 bg-emerald-50 text-emerald-900",
  }[tone];
  const Icon = tone === "warning" ? AlertCircle : CheckCircle2;

  return (
    <div className={cn("flex items-start gap-3 rounded-2xl border p-4 text-sm", toneClass, className)}>
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <div className="leading-6">{children}</div>
    </div>
  );
}

interface EnterpriseFormActionsProps {
  submitText?: string;
  cancelText?: string;
  resetText?: string;
  hint?: string;
  isSubmitting?: boolean;
  submitDisabled?: boolean;
  onCancel?: () => void;
  onReset?: () => void;
}

export function EnterpriseFormActions({
  submitText = "Save",
  cancelText = "Cancel",
  resetText = "Reset",
  hint = "Changes are applied immediately after save.",
  isSubmitting = false,
  submitDisabled = false,
  onCancel,
  onReset,
}: EnterpriseFormActionsProps) {
  return (
    <div className="sticky bottom-0 -mx-6 mt-auto border-t border-slate-200 bg-white/95 px-6 py-4 shadow-[0_-10px_30px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          {hint}
        </div>
        <div className="flex justify-end gap-2">
          {onReset ? (
            <Button type="button" variant="outline" onClick={onReset} disabled={isSubmitting} className="h-11 rounded-xl px-5">
              {resetText}
            </Button>
          ) : null}
          {onCancel ? (
            <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting} className="h-11 rounded-xl px-5">
              {cancelText}
            </Button>
          ) : null}
          <Button type="submit" disabled={isSubmitting || submitDisabled} className="h-11 rounded-xl px-6 shadow-lg shadow-blue-100">
            {isSubmitting ? "Saving..." : submitText}
          </Button>
        </div>
      </div>
    </div>
  );
}
