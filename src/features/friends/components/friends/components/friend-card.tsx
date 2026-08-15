import { cn } from "@/lib/utils.ts";
import { UserAvatar } from "../../../../../components/common/user-avatar.tsx";
import { Button } from "../../../../../components/ui/button.tsx";
import { MessageSquare, UserRoundX } from "lucide-react";
import { Link } from "react-router-dom";

type User = {
  userId: string;
  name: string;
  username: string;
  avatar?: avatar;
  status?: UserStatus;
  lastSeen?: string | null;
};

type UserCardProps = {
  user: User;
  onRemoveFriend?: (userId: string) => void;
};

export function FriendCard({ user, onRemoveFriend }: UserCardProps) {
  const avatarUser = {
    userId: user.userId,
    name: user.name,
    username: user.username,
    avatar: user.avatar,
    status: user.status,
  };

  const presence = avatarUser.status === "online";

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-surface p-2 sm:p-4 shadow-soft transition-shadow hover:shadow-raised">
      {/* Avatar */}
      <UserAvatar user={avatarUser} size="md" showPresence={presence} />

      {/* User info */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{user.name}</p>

        <p className="truncate text-xs text-muted-foreground">
          @{user.username}
        </p>

        {user.status && (
          <p
            className={cn(
              "mt-1 text-xs font-medium",
              user.status === "online"
                ? "text-success"
                : "text-muted-foreground",
            )}
          >
            {user.status === "online" ? "Online" : (user.lastSeen ?? "Offline")}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex shrink-0 gap-2">
        <div className="max-sm:flex max-sm:flex-col max-sm:gap-1.5">
          <Button size="sm" className="rounded-xl sm:h-9" asChild>
            <Link to={`/chats/${user.userId}`}>
              <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
              Message
            </Link>
          </Button>

          <Button
            size="sm"
            variant="destructive"
            className="rounded-xl sm:min-w-20 sm:h-9 text-destructive"
            disabled
            onClick={() => onRemoveFriend?.(user.userId)}
          >
            <UserRoundX className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
