// src/shared/components/enterprise/workspace/entity-workspace-tabs.tsx

"use client";

import { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface EntityWorkspaceTab {
  value: string;
  label: string;
  content: ReactNode;
}

interface EntityWorkspaceTabsProps {
  defaultValue: string;
  tabs: EntityWorkspaceTab[];
}

export function EntityWorkspaceTabs({
  defaultValue,
  tabs,
}: EntityWorkspaceTabsProps) {
  return (
    <Tabs defaultValue={defaultValue}>
      <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-4">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}