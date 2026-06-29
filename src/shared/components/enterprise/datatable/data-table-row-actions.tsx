// src/shared/components/enterprise/datatable/data-table-row-actions.tsx

"use client";

import { ActionMenu, type ActionMenuItem } from "../action-menu";

interface DataTableRowActionsProps<TData> {
  row: TData;
  getActions: (row: TData) => ActionMenuItem[];
}

export function DataTableRowActions<TData>({
  row,
  getActions,
}: DataTableRowActionsProps<TData>) {
  return <ActionMenu items={getActions(row)} />;
}