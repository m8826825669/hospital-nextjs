// src/features/activity-center/components/tasks-list.tsx

"use client";

import Link from "next/link";
import { CheckCircle2, ClipboardCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/shared/components/enterprise";
import type { TaskItem } from "../types/activity-center.types";
import { ActivityPriorityBadge } from "./activity-priority-badge";
import { TaskStatusBadge } from "./task-status-badge";

interface TasksListProps {
  tasks: TaskItem[];
  isLoading?: boolean;
  onComplete: (id: string) => void;
}

export function TasksList({ tasks, isLoading, onComplete }: TasksListProps) {
  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading tasks...</p>;
  }

  if (!tasks.length) {
    return (
      <EmptyState
        title="No tasks"
        description="Assigned workflow tasks will appear here."
      />
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => {
        const content = (
          <div className="rounded-xl border bg-card p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3">
                <div className="mt-1 rounded-full bg-muted p-2">
                  <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium">{task.title}</p>
                    <TaskStatusBadge status={task.status} />
                    <ActivityPriorityBadge priority={task.priority} />
                  </div>

                  {task.description && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {task.description}
                    </p>
                  )}

                  <p className="mt-2 text-xs text-muted-foreground">
                    {task.module || "System"}
                    {task.assigned_to_name ? ` • ${task.assigned_to_name}` : ""}
                    {task.due_date ? ` • Due: ${task.due_date}` : ""}
                  </p>
                </div>
              </div>

              {task.status !== "completed" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onComplete(task.id)}
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Complete
                </Button>
              )}
            </div>
          </div>
        );

        return task.action_url ? (
          <Link key={task.id} href={task.action_url}>
            {content}
          </Link>
        ) : (
          <div key={task.id}>{content}</div>
        );
      })}
    </div>
  );
}