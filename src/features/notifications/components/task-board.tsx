import { SectionCard } from "@/shared/components/enterprise";
import type { CommunicationTask } from "../types/notification.types";
import { NotificationPriorityBadge, TaskStatusBadge } from "./notification-badges";

const columns = [
  { title: "To Do", status: "todo" },
  { title: "In Progress", status: "in_progress" },
  { title: "Completed", status: "completed" },
];

interface Props {
  tasks: CommunicationTask[];
}

export function TaskBoard({ tasks }: Props) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {columns.map((column) => (
        <SectionCard key={column.status} title={column.title}>
          <div className="space-y-3">
            {tasks.filter((task) => task.status === column.status).map((task) => (
              <div key={task.id} className="rounded-lg border bg-background p-3 shadow-sm">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="text-sm font-medium">{task.title}</p>
                  <TaskStatusBadge status={task.status} />
                </div>
                <p className="line-clamp-2 text-xs text-muted-foreground">{task.description ?? "No description"}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs uppercase text-muted-foreground">{task.module}</span>
                  <NotificationPriorityBadge priority={task.priority} />
                </div>
              </div>
            ))}
            {tasks.filter((task) => task.status === column.status).length === 0 && (
              <p className="text-sm text-muted-foreground">No tasks.</p>
            )}
          </div>
        </SectionCard>
      ))}
    </div>
  );
}
