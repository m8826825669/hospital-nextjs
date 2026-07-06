import type { ReactNode } from "react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export type EntityStatItem = {
  label: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  tone?: "default" | "success" | "warning" | "danger" | "info";
};

const toneClasses: Record<NonNullable<EntityStatItem["tone"]>, string> = {
  default: "text-slate-700 bg-slate-50 border-slate-200",
  success: "text-emerald-700 bg-emerald-50 border-emerald-200",
  warning: "text-amber-700 bg-amber-50 border-amber-200",
  danger: "text-rose-700 bg-rose-50 border-rose-200",
  info: "text-blue-700 bg-blue-50 border-blue-200",
};

export function EntityStats({ items, className }: { items: EntityStatItem[]; className?: string }) {
  return (
    <div className={cx("grid gap-4 sm:grid-cols-2 xl:grid-cols-4", className)}>
      {items.map((item) => (
        <EntityStatCard key={item.label} {...item} />
      ))}
    </div>
  );
}

export function EntityStatCard({
  label,
  value,
  description,
  icon,
  tone = "default",
}: EntityStatItem) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
        {icon ? (
          <div className={cx("flex h-8 w-8 items-center justify-center rounded-xl border", toneClasses[tone])}>
            {icon}
          </div>
        ) : null}
      </div>
      <div className="mt-3 text-2xl font-bold tracking-tight text-slate-950">{value}</div>
      {description ? <p className="mt-1 text-sm text-slate-600">{description}</p> : null}
    </div>
  );
}
