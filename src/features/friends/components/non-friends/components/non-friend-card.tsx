import { UserAvatar } from "@/components/common/user-avatar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";
import type { friendRequestStatus } from "../api/type.ts";

type User = {
  userId: string;
  name: string;
  username: string;
  avatar?: avatar;
  status?: UserStatus;
  lastSeen?: string | null;
  friendRequestStatus: friendRequestStatus;
  friendRequestId: string;
};

type UserCardProps = {
  user: User;
  handleSendRequest: (userId: string) => void;
  handleAcceptRequest: (friendRequestId: string) => void;
  handleRejectRequest: (friendRequestId: string) => void;
  handleCancelRequest: (friendRequestId: string) => void;

  isSendingRequest: boolean;
  isAcceptingRequest: boolean;
  isRejectingRequest: boolean;
  isCancelingRequest: boolean;
};

export function NonFriendCard({
  user,
  handleSendRequest,
  handleAcceptRequest,
  handleRejectRequest,
  handleCancelRequest,
  isSendingRequest,
  isAcceptingRequest,
  isRejectingRequest,
  isCancelingRequest,
}: UserCardProps) {
  const avatarUser = {
    userId: user.userId,
    name: user.name,
    username: user.username,
    avatar: user.avatar,
    status: user.status,
  };

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-surface p-2 sm:p-4 shadow-soft transition-shadow hover:shadow-raised">
      {/* Avatar */}
      <UserAvatar user={avatarUser} size="md" showPresence={false} />

      {/* User info */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{user.name}</p>

        <p className="truncate text-xs text-muted-foreground">
          @{user.username}
        </p>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 gap-2">
        {user.friendRequestStatus === "NONE" && (
          <Button
            className="cursor-pointer"
            disabled={isSendingRequest}
            onClick={() => handleSendRequest(user.userId)}
          >
            {isSendingRequest ? "Sending..." : "Add Friend"}
          </Button>
        )}

        {user.friendRequestStatus === "PENDING_SENT" && (
          <div className="flex gap-2">
            <Button disabled>Pending</Button>

            <Button
              className="cursor-pointer"
              variant="outline"
              disabled={isCancelingRequest}
              onClick={() => handleCancelRequest(user.friendRequestId)}
            >
              {isCancelingRequest ? "Canceling..." : "Cancel"}
            </Button>
          </div>
        )}

        {user.friendRequestStatus === "PENDING_RECEIVED" && (
          <div className="flex gap-2">
            <Button
              className="cursor-pointer"
              disabled={isAcceptingRequest}
              onClick={() => handleAcceptRequest(user.friendRequestId)}
            >
              {isAcceptingRequest ? "Accepting..." : "Accept"}
            </Button>

            <Button
              className="cursor-pointer"
              variant="outline"
              disabled={isRejectingRequest}
              onClick={() => handleRejectRequest(user.friendRequestId)}
            >
              {isRejectingRequest ? "Rejecting..." : "Reject"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
