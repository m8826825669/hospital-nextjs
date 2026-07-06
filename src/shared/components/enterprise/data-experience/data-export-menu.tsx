"use client";

import { Download, FileSpreadsheet, Printer } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { DataExportColumn } from "./types";

interface DataExportMenuProps<TData extends Record<string, unknown>> {
  filename?: string;
  rows: TData[];
  columns: DataExportColumn<TData>[];
}

function getCellValue<TData extends Record<string, unknown>>(
  row: TData,
  column: DataExportColumn<TData>
) {
  const value = column.render ? column.render(row) : row[column.key as keyof TData];
  return value === null || value === undefined ? "" : String(value);
}

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function escapeCsv(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function DataExportMenu<TData extends Record<string, unknown>>({
  filename = "export",
  rows,
  columns,
}: DataExportMenuProps<TData>) {
  function exportCsv() {
    const header = columns.map((column) => escapeCsv(column.header)).join(",");
    const body = rows
      .map((row) => columns.map((column) => escapeCsv(getCellValue(row, column))).join(","))
      .join("\n");

    downloadFile(`${header}\n${body}`, `${filename}.csv`, "text/csv;charset=utf-8");
  }

  function exportExcel() {
    const table = [
      "<table>",
      `<thead><tr>${columns.map((column) => `<th>${escapeHtml(column.header)}</th>`).join("")}</tr></thead>`,
      `<tbody>${rows
        .map(
          (row) =>
            `<tr>${columns
              .map((column) => `<td>${escapeHtml(getCellValue(row, column))}</td>`)
              .join("")}</tr>`
        )
        .join("")}</tbody>`,
      "</table>",
    ].join("");

    downloadFile(table, `${filename}.xls`, "application/vnd.ms-excel;charset=utf-8");
  }

  function printData() {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const table = [
      "<html><head><title>Print</title>",
      "<style>body{font-family:Arial,sans-serif;padding:24px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ddd;padding:8px;text-align:left}th{background:#f5f5f5}</style>",
      "</head><body>",
      `<h2>${escapeHtml(filename)}</h2>`,
      "<table>",
      `<thead><tr>${columns.map((column) => `<th>${escapeHtml(column.header)}</th>`).join("")}</tr></thead>`,
      `<tbody>${rows
        .map(
          (row) =>
            `<tr>${columns
              .map((column) => `<td>${escapeHtml(getCellValue(row, column))}</td>`)
              .join("")}</tr>`
        )
        .join("")}</tbody>`,
      "</table></body></html>",
    ].join("");

    printWindow.document.write(table);
    printWindow.document.close();
    printWindow.print();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem onClick={exportCsv}>
          <Download className="mr-2 h-4 w-4" />
          CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportExcel}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Excel
        </DropdownMenuItem>
        <DropdownMenuItem onClick={printData}>
          <Printer className="mr-2 h-4 w-4" />
          Print
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
