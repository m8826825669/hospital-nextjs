import { cn } from "@/lib/utils";

export const ui = {
  page: {
    container: "space-y-6",
    content: "space-y-4",
  },

  card: {
    base: "rounded-xl border bg-background shadow-sm",
    hover: "rounded-xl border bg-background shadow-sm transition hover:shadow-md",
    padded: "rounded-xl border bg-background p-5 shadow-sm",
  },

  section: {
    header: "flex items-start justify-between border-b p-5",
    body: "p-5",
  },

  table: {
    wrapper: "rounded-xl border bg-background shadow-sm",
    toolbar: "border-b p-4",
  },

  form: {
    grid: "grid gap-4 md:grid-cols-2",
    row: "space-y-2",
    actions: "flex items-center justify-end gap-2 border-t pt-4",
  },

  status: {
    success: "bg-success text-success-foreground",
    warning: "bg-warning text-warning-foreground",
    info: "bg-info text-info-foreground",
    danger: "bg-destructive text-destructive-foreground",
  },

  merge: cn,
};