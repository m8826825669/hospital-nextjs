import type { ReactNode } from "react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type EntityPageProps = {
  children: ReactNode;
  className?: string;
};

export function EntityPage({ children, className }: EntityPageProps) {
  return <div className={cx("space-y-5", className)}>{children}</div>;
}

type EntityHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  status?: ReactNode;
  actions?: ReactNode;
  className?: string;
};

export function EntityHeader({
  eyebrow,
  title,
  description,
  icon,
  status,
  actions,
  className,
}: EntityHeaderProps) {
  return (
    <div
      className={cx(
        "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm",
        "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between",
        className,
      )}
    >
      <div className="flex min-w-0 items-start gap-4">
        {icon ? (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-700">
            {icon}
          </div>
        ) : null}
        <div className="min-w-0 space-y-1">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {eyebrow}
            </p>
          ) : null}
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-slate-950">{title}</h2>
            {status}
          </div>
          {description ? (
            <p className="max-w-3xl text-sm leading-6 text-slate-600">{description}</p>
          ) : null}
        </div>
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function EntitySection({ children, className }: EntityPageProps) {
  return (
    <section className={cx("rounded-2xl border border-slate-200 bg-white shadow-sm", className)}>
      {children}
    </section>
  );
}

export function EntitySectionHeader({
  title,
  description,
  actions,
  className,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <div className="space-y-1">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">{title}</h3>
        {description ? <p className="text-sm text-slate-600">{description}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function EntitySectionBody({ children, className }: EntityPageProps) {
  return <div className={cx("p-5", className)}>{children}</div>;
}
