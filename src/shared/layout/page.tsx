import type { ReactNode } from "react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type BaseProps = {
  children: ReactNode;
  className?: string;
};

export function EnterprisePage({ children, className }: BaseProps) {
  return (
    <main className={cx("min-h-full space-y-6 pb-10", className)}>{children}</main>
  );
}

type EnterprisePageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  meta?: ReactNode;
  className?: string;
};

export function EnterprisePageHeader({
  eyebrow,
  title,
  description,
  actions,
  meta,
  className,
}: EnterprisePageHeaderProps) {
  return (
    <header
      className={cx(
        "border-b border-slate-200 pb-5",
        "flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between",
        className,
      )}
    >
      <div className="min-w-0 space-y-2">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            {eyebrow}
          </p>
        ) : null}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-slate-950 lg:text-3xl">
            {title}
          </h1>
          {description ? (
            <p className="max-w-3xl text-sm leading-6 text-slate-600">{description}</p>
          ) : null}
        </div>
        {meta ? <div className="flex flex-wrap items-center gap-2 pt-2">{meta}</div> : null}
      </div>

      {actions ? (
        <div className="flex shrink-0 flex-wrap items-center gap-3">{actions}</div>
      ) : null}
    </header>
  );
}

export function EnterprisePageBody({ children, className }: BaseProps) {
  return <div className={cx("space-y-5", className)}>{children}</div>;
}

export function EnterprisePageSection({ children, className }: BaseProps) {
  return (
    <section
      className={cx(
        "rounded-2xl border border-slate-200 bg-white shadow-sm",
        "transition-shadow duration-200 hover:shadow-md",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function EnterprisePageToolbar({ children, className }: BaseProps) {
  return (
    <div
      className={cx(
        "rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-sm backdrop-blur",
        "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function EnterprisePageActions({ children, className }: BaseProps) {
  return <div className={cx("flex flex-wrap items-center gap-3", className)}>{children}</div>;
}

export function EnterpriseTabBar({ children, className }: BaseProps) {
  return (
    <div className={cx("rounded-2xl border border-slate-200 bg-white/85 p-3 shadow-sm backdrop-blur", className)}>
      {children}
    </div>
  );
}

export function EnterpriseHeaderBadge({ children, className }: BaseProps) {
  return (
    <div
      className={cx(
        "inline-flex h-9 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}
