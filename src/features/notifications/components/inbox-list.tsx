import { SectionCard } from "@/shared/components/enterprise";
import type { CommunicationMessage } from "../types/notification.types";
import { NotificationStatusBadge } from "./notification-badges";

export function InboxList({ messages }: { messages: CommunicationMessage[] }) {
  return (
    <SectionCard title="Inbox" description="Internal communication inbox.">
      <div className="divide-y">
        {messages.length === 0 ? <div className="p-6 text-sm text-muted-foreground">No messages.</div> : null}
        {messages.map((message) => (
          <div key={message.id} className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-medium">{message.subject}</p>
              <NotificationStatusBadge status={message.status} />
            </div>
            <p className="text-sm text-muted-foreground">{message.body}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
