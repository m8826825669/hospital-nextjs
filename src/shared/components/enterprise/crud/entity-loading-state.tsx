function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function EntityTableSkeleton({ rows = 6, className }: { rows?: number; className?: string }) {
  return (
    <div className={cx("rounded-2xl border border-slate-200 bg-white shadow-sm", className)}>
      <div className="grid grid-cols-4 gap-4 border-b border-slate-100 bg-slate-50 px-4 py-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-4 rounded-full bg-slate-200" />
        ))}
      </div>
      <div className="divide-y divide-slate-100">
        {Array.from({ length: rows }).map((_, row) => (
          <div key={row} className="grid grid-cols-4 gap-4 px-4 py-4">
            {Array.from({ length: 4 }).map((__, column) => (
              <div key={column} className="h-4 rounded-full bg-slate-100" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function EntityCardSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="h-4 w-24 rounded-full bg-slate-100" />
          <div className="mt-4 h-8 w-16 rounded-full bg-slate-200" />
          <div className="mt-3 h-4 w-32 rounded-full bg-slate-100" />
        </div>
      ))}
    </div>
  );
}
