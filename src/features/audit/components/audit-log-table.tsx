import type { AuditLog } from "../types/audit.types";

interface AuditLogTableProps {
  logs: AuditLog[];
}

export function AuditLogTable({ logs }: AuditLogTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
          <tr>
            <th className="px-4 py-3">Time</th>
            <th className="px-4 py-3">Module</th>
            <th className="px-4 py-3">Action</th>
            <th className="px-4 py-3">Entity</th>
            <th className="px-4 py-3">Risk</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-t">
              <td className="px-4 py-3 text-muted-foreground">{new Date(log.created_at).toLocaleString()}</td>
              <td className="px-4 py-3 font-medium">{log.module}</td>
              <td className="px-4 py-3">{log.action}</td>
              <td className="px-4 py-3">{log.entity_type ?? "-"}</td>
              <td className="px-4 py-3">{log.risk_level}</td>
              <td className="px-4 py-3">{log.success ? "Success" : "Failed"}</td>
            </tr>
          ))}
          {logs.length === 0 && (
            <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No audit logs found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
