// src/shared/components/enterprise/datatable/data-table.tsx

"use client";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Columns3 } from "lucide-react";

import type { DataTableProps } from "./data-table.types";
import { EmptyState } from "../empty-state";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SearchToolbar } from "../search-toolbar";
import { DataTableSkeleton } from "./data-table-skeleton";

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  search = "",
  searchPlaceholder = "Search...",
  enableRowSelection = false,
  enableColumnVisibility = true,
  pagination,
  sorting,
  onSearchChange,
  onPaginationChange,
  onSortingChange,
  getRowId,
  toolbarActions,
  emptyTitle,
  emptyDescription,
}: DataTableProps<TData, TValue>) {
  const [internalSorting, setInternalSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const activeSorting = sorting ?? internalSorting;

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getRowId,
    state: {
      sorting: activeSorting,
      rowSelection,
      pagination: {
        pageIndex: pagination?.pageIndex ?? 0,
        pageSize: pagination?.pageSize ?? 10,
      },
    },
    manualPagination: Boolean(pagination?.pageCount),
    pageCount: pagination?.pageCount,
    manualSorting: Boolean(onSortingChange),
    enableRowSelection,
    onRowSelectionChange: setRowSelection,
    onSortingChange: (updater) => {
      const nextSorting =
        typeof updater === "function" ? updater(activeSorting) : updater;

      if (onSortingChange) {
        onSortingChange(nextSorting);
      } else {
        setInternalSorting(nextSorting);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  function updatePageIndex(pageIndex: number) {
    if (!pagination || !onPaginationChange) return;

    onPaginationChange({
      ...pagination,
      pageIndex,
    });
  }

  function updatePageSize(pageSize: number) {
    if (!pagination || !onPaginationChange) return;

    onPaginationChange({
      ...pagination,
      pageIndex: 0,
      pageSize,
    });
  }

  const selectedCount = table.getFilteredSelectedRowModel().rows.length;

  return (
    <div className="space-y-4">
      {(onSearchChange || toolbarActions || enableColumnVisibility) && (
        <SearchToolbar
          search={search}
          placeholder={searchPlaceholder}
          onSearchChange={(value) => onSearchChange?.(value)}
          actions={
            <div className="flex items-center gap-2">
              {toolbarActions}

              {enableColumnVisibility && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Columns3 className="mr-2 h-4 w-4" />
                      Columns
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(Boolean(value))
                          }
                          className="capitalize"
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          }
        />
      )}

      {selectedCount > 0 && (
        <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
          {selectedCount} row(s) selected.
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="max-h-[650px] overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-slate-50/95 backdrop-blur">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {enableRowSelection && (
                    <TableHead className="w-12">
                      <Checkbox
                        checked={
                          table.getIsAllPageRowsSelected() ||
                          (table.getIsSomePageRowsSelected() &&
                            "indeterminate")
                        }
                        onCheckedChange={(value) =>
                          table.toggleAllPageRowsSelected(Boolean(value))
                        }
                        aria-label="Select all rows"
                      />
                    </TableHead>
                  )}

                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <DataTableSkeleton
                  columnCount={
                    table.getVisibleLeafColumns().length +
                    (enableRowSelection ? 1 : 0)
                  }
                />
              ) : table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="transition-colors hover:bg-slate-50/80"
                  >
                    {enableRowSelection && (
                      <TableCell>
                        <Checkbox
                          checked={row.getIsSelected()}
                          onCheckedChange={(value) =>
                            row.toggleSelected(Boolean(value))
                          }
                          aria-label="Select row"
                        />
                      </TableCell>
                    )}

                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={
                      table.getVisibleLeafColumns().length +
                      (enableRowSelection ? 1 : 0)
                    }
                  >
                    <EmptyState
                      title={emptyTitle}
                      description={emptyDescription}
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {pagination && (
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            {pagination.total !== undefined
              ? `${pagination.total} total records`
              : `${data.length} records`}
          </p>

          <div className="flex items-center gap-3">
            <Select
              value={String(pagination.pageSize)}
              onValueChange={(value) => updatePageSize(Number(value))}
            >
              <SelectTrigger className="w-[110px]">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="10">10 / page</SelectItem>
                <SelectItem value="20">20 / page</SelectItem>
                <SelectItem value="50">50 / page</SelectItem>
                <SelectItem value="100">100 / page</SelectItem>
              </SelectContent>
            </Select>

            <div className="text-sm text-muted-foreground">
              Page {pagination.pageIndex + 1}
              {pagination.pageCount ? ` of ${pagination.pageCount}` : ""}
            </div>

            <Button
              variant="outline"
              size="icon"
              disabled={pagination.pageIndex <= 0}
              onClick={() => updatePageIndex(pagination.pageIndex - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              disabled={
                pagination.pageCount !== undefined &&
                pagination.pageIndex >= pagination.pageCount - 1
              }
              onClick={() => updatePageIndex(pagination.pageIndex + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}