import { UserAvatar } from "@/components/common/user-avatar.tsx";
import { cn } from "@/lib/utils.ts";
import { MessageSquare, UserPlus, Users, type LucideIcon } from "lucide-react";
import type { Notification } from "../apis/notification/type.ts";

const typeIcon: Record<NotificationMessageType, LucideIcon> = {
  FRIEND_REQUEST: UserPlus,
  FRIEND_REQUEST_SENT: UserPlus,
  FRIEND_REQUEST_REJECTED: Users,
  FRIEND_REQUEST_CANCELLED: Users,
  FRIEND_REQUEST_ACCEPTED: Users,
  FRIEND_REQUEST_DELETED: Users,
  FRIEND_REQUEST_DECLINED: Users,
  NEW_MESSAGE: MessageSquare,
  MESSAGE_REACTION: MessageSquare,
  MENTION: MessageSquare,
};

type NotificationProps = {
  item: Notification;
  onClick: () => void;
};

function NotificationRow({ item, onClick }: NotificationProps) {
  const Icon = typeIcon[item.messageType];

  const formattedTime = new Date(item.receivingDate).toLocaleString();

  return (
    <div
      onClick={onClick}
      className={cn(
        "group flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-colors hover:bg-muted/50",
        item.isRead
          ? "border-primary/25 bg-primary-soft/60"
          : "border-border bg-surface",
      )}
    >
      {/* Notification icon */}
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-muted text-muted-foreground">
        <Icon className="h-4 w-4" />
      </span>

      {/* Preview */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          {!item.isRead && (
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          )}

          <p className="truncate text-sm font-medium">
            {item.messageType.replaceAll("_", " ")}
          </p>
        </div>

        {/* Short / suspense preview */}
        <p className="mt-1 truncate text-sm text-muted-foreground">
          Something happened on Nexora...
        </p>

        <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Icon className="h-3 w-3" />
          {formattedTime}
        </p>
      </div>

      {/* Optional arrow */}
      <span className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
        →
      </span>
    </div>
  );
}

export default NotificationRow;
