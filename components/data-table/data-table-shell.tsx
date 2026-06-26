import type { ReactNode } from "react";

type DataTableShellProps = {
  toolbar?: ReactNode;
  table: ReactNode;
  pagination?: ReactNode;
};

export function DataTableShell({
  toolbar,
  table,
  pagination,
}: DataTableShellProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
      {toolbar && <div className="border-b p-4">{toolbar}</div>}
      {table}
      {pagination}
    </div>
  );
}