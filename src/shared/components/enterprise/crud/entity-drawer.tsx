import type { ReactNode } from "react";
import { X } from "lucide-react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type EntityDrawerProps = {
  open: boolean;
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
  width?: "md" | "lg" | "xl";
};

const widths = {
  md: "max-w-xl",
  lg: "max-w-3xl",
  xl: "max-w-5xl",
};

export function EntityDrawer({
  open,
  title,
  description,
  icon,
  children,
  footer,
  onClose,
  width = "lg",
}: EntityDrawerProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close drawer overlay"
        className="absolute inset-0 bg-slate-950/25 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <aside
        className={cx(
          "absolute right-0 top-0 flex h-full w-full flex-col overflow-hidden border-l border-slate-200 bg-white shadow-2xl",
          widths[width],
        )}
      >
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
          <div className="flex min-w-0 items-start gap-4">
            {icon ? (
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-700">
                {icon}
              </div>
            ) : null}
            <div className="min-w-0 space-y-1">
              <h2 className="text-lg font-bold tracking-tight text-slate-950">{title}</h2>
              {description ? <p className="text-sm leading-6 text-slate-600">{description}</p> : null}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
            aria-label="Close drawer"
          >
            <X className="h-4 w-4" />
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50/60 px-6 py-5">{children}</div>
        {footer ? <footer className="border-t border-slate-200 bg-white px-6 py-4">{footer}</footer> : null}
      </aside>
    </div>
  );
}
