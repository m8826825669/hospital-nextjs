import { Bell, CheckSquare, Mail, Megaphone, Siren } from "lucide-react";
import { StatCard } from "@/shared/components/enterprise";
import type { NotificationDashboard } from "../types/notification.types";

interface Props {
  dashboard?: NotificationDashboard;
}

export function NotificationKpiCards({ dashboard }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      <StatCard title="Unread" value={dashboard?.unread_notifications ?? 0} icon={<Bell className="h-5 w-5" />} description="Notifications" />
      <StatCard title="Tasks" value={dashboard?.pending_tasks ?? 0} icon={<CheckSquare className="h-5 w-5" />} description="Pending work" />
      <StatCard title="Messages" value={dashboard?.unread_messages ?? 0} icon={<Mail className="h-5 w-5" />} description="Unread inbox" />
      <StatCard title="Announcements" value={dashboard?.active_announcements ?? 0} icon={<Megaphone className="h-5 w-5" />} description="Active broadcasts" />
      <StatCard title="Critical" value={dashboard?.critical_alerts ?? 0} icon={<Siren className="h-5 w-5" />} description="Needs attention" />
    </div>
  );
}
