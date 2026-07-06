import type { ComponentType, SVGProps } from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export type EntityTabItem = {
  value: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  disabled?: boolean;
};

export function EntityTabsList({ tabs }: { tabs: EntityTabItem[] }) {
  return (
    <TabsList className="flex h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0">
      {tabs.map((tab) => {
        const Icon = tab.icon;

        return (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            disabled={tab.disabled}
            className="h-11 gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 data-[state=active]:border-blue-200 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow data-[state=active]:ring-1 data-[state=active]:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Icon className="h-4 w-4" />
            {tab.label}
          </TabsTrigger>
        );
      })}
    </TabsList>
  );
}
