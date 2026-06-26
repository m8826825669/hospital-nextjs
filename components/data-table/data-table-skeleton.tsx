import { Skeleton } from "@/components/ui/skeleton";

type DataTableSkeletonProps = {
  rows?: number;
  columns?: number;
};

export function DataTableSkeleton({
  rows = 8,
  columns = 6,
}: DataTableSkeletonProps) {
  return (
    <div className="space-y-3 p-4">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid gap-3" style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}>
          {Array.from({ length: columns }).map((__, columnIndex) => (
            <Skeleton key={columnIndex} className="h-5 w-full" />
          ))}
        </div>
      ))}
    </div>
  );
}