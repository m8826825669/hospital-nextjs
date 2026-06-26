"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function GlobalSearch() {
  return (
    <div className="relative hidden w-full max-w-xl md:block">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />

      <Input
        className="h-9 pl-9 pr-16"
        placeholder="Search patients, appointments, invoices..."
      />

      <div className="absolute right-2 top-1.5 rounded-md border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
        Ctrl K
      </div>
    </div>
  );
}