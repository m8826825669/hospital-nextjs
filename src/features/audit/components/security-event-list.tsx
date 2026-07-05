import type { SecurityEvent } from "../types/audit.types";

interface SecurityEventListProps {
  events: SecurityEvent[];
}

export function SecurityEventList({ events }: SecurityEventListProps) {
  return (
    <div className="space-y-3">
      {events.map((event) => (
        <div key={event.id} className="rounded-xl border bg-card p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-medium">{event.title}</p>
              <p className="text-sm text-muted-foreground">{event.event_type} · {event.message ?? "No details"}</p>
            </div>
            <span className="rounded-full border px-2 py-1 text-xs uppercase">{event.severity}</span>
          </div>
        </div>
      ))}
      {events.length === 0 && <div className="rounded-xl border bg-card p-8 text-center text-sm text-muted-foreground">No security events.</div>}
    </div>
  );
}
