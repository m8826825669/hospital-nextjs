// src/features/inventory/components/item-bulk-form.tsx

"use client";

import { ChangeEvent, useMemo, useState } from "react";
import { Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  inventoryItemBulkFormSchema,
  type InventoryItemBulkFormValues,
} from "../schemas/inventory.schema";

const csvHeaders = [
  "code",
  "name",
  "category",
  "unit",
  "brand",
  "generic_name",
  "description",
  "minimum_stock",
  "reorder_level",
  "maximum_stock",
  "purchase_price",
  "selling_price",
  "gst_percent",
  "hsn_code",
  "is_active",
];

function parseCsvLine(line: string) {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (const char of line) {
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  values.push(current.trim());
  return values;
}

function toBoolean(value: string) {
  return ["true", "1", "yes", "y"].includes(value.trim().toLowerCase());
}

function parseItemsCsv(csv: string): InventoryItemBulkFormValues {
  const rows = csv
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const [headerLine, ...dataRows] = rows;
  const headers = parseCsvLine(headerLine ?? "");

  const items = dataRows.map((row) => {
    const values = parseCsvLine(row);
    const record = Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));

    return {
      code: String(record.code ?? ""),
      name: String(record.name ?? ""),
      category: String(record.category ?? ""),
      unit: String(record.unit ?? ""),
      brand: String(record.brand ?? ""),
      generic_name: String(record.generic_name ?? ""),
      description: String(record.description ?? ""),
      minimum_stock: Number(record.minimum_stock ?? 0),
      reorder_level: Number(record.reorder_level ?? 0),
      maximum_stock: Number(record.maximum_stock ?? 0),
      purchase_price: Number(record.purchase_price ?? 0),
      selling_price: Number(record.selling_price ?? 0),
      gst_percent: Number(record.gst_percent ?? 0),
      hsn_code: String(record.hsn_code ?? ""),
      is_active: toBoolean(String(record.is_active ?? "true")),
    };
  });

  return inventoryItemBulkFormSchema.parse({ items });
}

interface ItemBulkFormProps {
  isSubmitting?: boolean;
  onSubmit: (values: InventoryItemBulkFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function ItemBulkForm({ isSubmitting, onSubmit, onCancel }: ItemBulkFormProps) {
  const template = useMemo(() => csvHeaders.join(","), []);
  const [csv, setCsv] = useState(template);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setCsv(await file.text());
  }

  async function handleSubmit() {
    try {
      setError(null);
      await onSubmit(parseItemsCsv(csv));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid CSV data");
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-6 overflow-y-auto px-1 pb-6">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold">Bulk Item Import</h3>
              <p className="text-xs text-muted-foreground">
                Upload or paste CSV rows using the standard inventory item template.
              </p>
            </div>
            <label className="inline-flex cursor-pointer items-center rounded-md border px-3 py-2 text-sm hover:bg-muted">
              <Upload className="mr-2 h-4 w-4" />
              Upload CSV
              <input type="file" accept=".csv,text/csv" className="hidden" onChange={handleFile} />
            </label>
          </div>

          <Textarea
            value={csv}
            onChange={(event) => setCsv(event.target.value)}
            className="min-h-[360px] font-mono text-xs"
            spellCheck={false}
          />
          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
        </div>
      </div>

      <div className="sticky bottom-0 -mx-6 flex items-center justify-end gap-3 border-t bg-background px-6 py-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="button" disabled={isSubmitting} onClick={handleSubmit}>
          {isSubmitting ? "Importing..." : "Import Items"}
        </Button>
      </div>
    </div>
  );
}
