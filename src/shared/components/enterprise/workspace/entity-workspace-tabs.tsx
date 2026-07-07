// src/shared/components/enterprise/workspace/entity-workspace-tabs.tsx

"use client";

import { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/shared/lib/utils";

export interface EntityWorkspaceTab {
  value: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
  badge?: ReactNode;
}

interface EntityWorkspaceTabsProps {
  defaultValue: string;
  tabs: EntityWorkspaceTab[];
  className?: string;
}

export function EntityWorkspaceTabs({
  defaultValue,
  tabs,
  className,
}: EntityWorkspaceTabsProps) {
  return (
    <Tabs defaultValue={defaultValue} className={cn("space-y-4", className)}>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
        <TabsList className="inline-flex h-auto min-w-full justify-start gap-1 bg-transparent p-0">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="min-h-9 shrink-0 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition-all data-[state=active]:bg-slate-950 data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              <span className="flex items-center gap-2">
                {tab.icon}
                {tab.label}
                {tab.badge}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-0 outline-none">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
