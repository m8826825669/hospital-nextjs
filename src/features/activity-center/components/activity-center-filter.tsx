// src/features/activity-center/components/activity-center-filters.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  moduleOptions,
  notificationPriorityOptions,
  taskStatusOptions,
} from "../constants/activity-center.constants";

interface ActivityCenterFiltersProps {
  module: string;
  priority: string;
  status?: string;
  date: string;
  onModuleChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onStatusChange?: (value: string) => void;
  onDateChange: (value: string) => void;
  onReset: () => void;
}

export function ActivityCenterFilters({
  module,
  priority,
  status,
  date,
  onModuleChange,
  onPriorityChange,
  onStatusChange,
  onDateChange,
  onReset,
}: ActivityCenterFiltersProps) {
  return (
    <div className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-5">
      <select
        className="h-10 rounded-md border bg-background px-3 text-sm"
        value={module}
        onChange={(event) => onModuleChange(event.target.value)}
      >
        <option value="">All Modules</option>
        {moduleOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        className="h-10 rounded-md border bg-background px-3 text-sm"
        value={priority}
        onChange={(event) => onPriorityChange(event.target.value)}
      >
        <option value="">All Priority</option>
        {notificationPriorityOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {onStatusChange && (
        <select
          className="h-10 rounded-md border bg-background px-3 text-sm"
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
        >
          <option value="">All Status</option>
          {taskStatusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}

      <Input
        type="date"
        value={date}
        onChange={(event) => onDateChange(event.target.value)}
      />

      <Button variant="outline" onClick={onReset}>
        Reset
      </Button>
    </div>
  );
}