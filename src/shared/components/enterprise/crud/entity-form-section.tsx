import type { ReactNode } from "react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function EntityFormSection({
  number,
  title,
  description,
  icon,
  children,
  className,
}: {
  number?: number;
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cx("rounded-2xl border border-slate-200 bg-white shadow-sm", className)}>
      <div className="flex items-start gap-3 border-b border-slate-100 px-5 py-4">
        {number ? (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-sm font-bold text-blue-700">
            {number}
          </div>
        ) : null}
        {icon ? <div className="mt-1 text-slate-600">{icon}</div> : null}
        <div className="min-w-0 space-y-1">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-950">{title}</h3>
          {description ? <p className="text-sm leading-6 text-slate-600">{description}</p> : null}
        </div>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

export function EntityFormGrid({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("grid gap-4 md:grid-cols-2", className)}>{children}</div>;
}

export function EntityField({
  label,
  required,
  help,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  help?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-slate-900">
        {label} {required ? <span className="text-rose-500">*</span> : null}
      </span>
      {children}
      {help && !error ? <span className="block text-xs text-slate-500">{help}</span> : null}
      {error ? <span className="block text-xs font-medium text-rose-600">{error}</span> : null}
    </label>
  );
}
