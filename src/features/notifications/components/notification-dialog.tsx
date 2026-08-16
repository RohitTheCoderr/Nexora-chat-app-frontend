import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import type { Notification } from "../apis/notification/type.ts";
import { UserAvatar } from "@/components/common/user-avatar.tsx";

import {
  MessageSquare,
  UserPlus,
  Users,
  Check,
  X,
  type LucideIcon,
} from "lucide-react";

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

type NotificationDialogProps = {
  notification: Notification | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleAccept: (senderId: string) => void;
  handleReject: (senderId: string) => void;
  isRejectingRequest: boolean;
  isAcceptingRequest: boolean;
};

function NotificationDialog({
  notification,
  open,
  onOpenChange,
  handleAccept,
  handleReject,
  isRejectingRequest,
  isAcceptingRequest,
}: NotificationDialogProps) {
  if (!notification) return null;

  const Icon = typeIcon[notification.messageType];

  const user = notification.sender;

  const presence = notification.sender?.status;

  const formattedTime = new Date(notification.receivingDate).toLocaleString();

  const title = notification.messageType
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-muted text-muted-foreground">
              <Icon className="h-5 w-5" />
            </span>

            <div>
              <DialogTitle>{title}</DialogTitle>

              <DialogDescription>{formattedTime}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Notification details */}
        <div className="rounded-2xl border bg-muted/30 p-4">
          {/* Sender */}
          {user && (
            <div className="flex items-center gap-3">
              <UserAvatar user={user} size="md" showPresence={presence} />

              <div className="min-w-0">
                <p className="font-medium">{user.name}</p>

                <p className="text-sm text-muted-foreground">
                  @{user.username}
                </p>
              </div>
            </div>
          )}

          {/* Message */}
          <div className="mt-5">
            <p className="text-sm leading-6">{notification.message}</p>
          </div>

          {/* Metadata */}
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <Icon className="h-3.5 w-3.5" />
            <span>{formattedTime}</span>
          </div>
        </div>

        {/* Actions */}
        {notification.messageType === "FRIEND_REQUEST" &&
          notification.friendRequestStatus === "PENDING" && (
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  if (!notification.referenceId) return;

                  handleReject(notification.referenceId);
                  onOpenChange(false);
                }}
                disabled={isRejectingRequest && isAcceptingRequest}
              >
                Reject
              </Button>

              <Button
                onClick={() => {
                  if (!notification.referenceId) return;

                  handleAccept(notification.referenceId);
                  onOpenChange(false);
                }}
                disabled={isRejectingRequest && isAcceptingRequest}
              >
                Accept
              </Button>
            </div>
          )}
      </DialogContent>
    </Dialog>
  );
}

export default NotificationDialog;
