// src/shared/components/enterprise/datatable/data-table.types.ts

import type { ColumnDef, SortingState } from "@tanstack/react-table";

export interface DataTablePagination {
  pageIndex: number;
  pageSize: number;
  pageCount?: number;
  total?: number;
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

  isLoading?: boolean;
  search?: string;
  searchPlaceholder?: string;

  enableRowSelection?: boolean;
  enableColumnVisibility?: boolean;

  pagination?: DataTablePagination;
  sorting?: SortingState;

  onSearchChange?: (value: string) => void;
  onPaginationChange?: (pagination: DataTablePagination) => void;
  onSortingChange?: (sorting: SortingState) => void;

  getRowId?: (row: TData) => string;

  toolbarActions?: React.ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
}