import { cn } from "@/lib/utils";

export type Presence = "online" | "offline";

type User = {
  userId?: string;
  name: string;
  username?: string;
  avatar?: {
    url?: string;
  };
  status?: Presence;
  lastSeen?: string;
};

const sizes = {
  xs: "h-8 w-8 text-[11px]",
  sm: "h-9 w-9 text-xs",
  md: "h-11 w-11 text-sm",
  lg: "h-14 w-14 text-base",
  xl: "h-24 w-24 text-2xl",
};

const dotSizes = {
  xs: "h-2.5 w-2.5",
  sm: "h-2.5 w-2.5",
  md: "h-3 w-3",
  lg: "h-3.5 w-3.5",
  xl: "h-6 w-6",
};

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

export function PresenceDot({
  presence,
  className,
}: {
  presence: Presence;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "rounded-full border-2 border-surface",
        presence === "online" && "bg-online animate-online-pulse",
        presence === "offline" && "bg-border-strong",
        className,
      )}
    />
  );
}

export function UserAvatar({
  user,
  size = "md",
  showPresence = "offline",
  className,
}: {
  user: User;
  size?: keyof typeof sizes;
  showPresence?: Presence;
  className?: string;
}) {
  return (
    <span className={cn("relative inline-block shrink-0", className)}>
      <span
        className={cn(
          "grid place-items-center overflow-hidden rounded-2xl font-semibold text-primary-foreground",
          sizes[size],
        )}
        style={{ backgroundColor: "oklch(0.585 0.093 178)" }}
        aria-hidden
      >
        {user?.avatar?.url ? (
          <img
            src={user.avatar.url}
            alt={user.name}
            className="h-full w-full object-cover"
          />
        ) : (
          initials(user.name)
        )}
      </span>
      {showPresence ? (
        <PresenceDot
          presence={showPresence}
          className={cn(
            "absolute -right-0.5 -bottom-0.5 block",
            dotSizes[size],
          )}
        />
      ) : null}
    </span>
  );
}
