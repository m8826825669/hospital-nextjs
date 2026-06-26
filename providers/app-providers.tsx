"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "./query-provider";
import { ClientToaster } from "@/components/feedback/client-toaster";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <TooltipProvider>
        {children}
        <ClientToaster />
      </TooltipProvider>
    </QueryProvider>
  );
}