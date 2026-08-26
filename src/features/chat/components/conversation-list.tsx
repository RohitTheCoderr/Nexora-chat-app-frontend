import { MessageCircle, Search, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { UserAvatar } from "@/components/common/user-avatar.tsx";
import type { Conversation } from "../apis/conversations/type";

const formatTime = (value?: string | null) =>
  value
    ? new Intl.DateTimeFormat(undefined, {
        hour: "numeric",
        minute: "2-digit",
      }).format(new Date(value))
    : "";

type ConversationListProps = {
  conversations: Conversation[];
  activeConversationId?: string;
  search: string;
  isLoading: boolean;
  onSearchChange: (value: string) => void;
};

export function ConversationList({
  conversations,
  activeConversationId,
  search,
  isLoading,
  onSearchChange,
}: ConversationListProps) {
  const filtered = conversations.filter((conversation) =>
    `${conversation.friend.name} ${conversation.friend.username ?? ""}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <aside className="flex w-full shrink-0 flex-col border-r border-border bg-surface/90 md:w-[320px]">
      <div className="border-b border-border px-4 py-2">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold">Messages</p>
            <p className="text-xs text-muted-foreground">
              {conversations.length} conversation
            </p>
          </div>
          <Button variant="ghost" size="icon" aria-label="Find friends" asChild>
            <Link to="/friends">
              <Users className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <label className="relative block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search your friend"
            className="h-10 rounded-xl bg-muted/60 pl-9"
          />
        </label>
      </div>
      <div className="nx-scroll flex-1 overflow-y-auto p-2">
        {isLoading ? (
          <p className="p-4 text-sm text-muted-foreground">
            Loading conversations...
          </p>
        ) : null}
        {!isLoading && !filtered.length ? (
          <div className="flex h-full flex-col items-center justify-center px-6 text-center">
            <MessageCircle className="mb-3 h-8 w-8 text-primary" />
            <p className="text-sm font-semibold">No conversations yet</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Add a friend to start a private conversation.
            </p>
          </div>
        ) : null}
        {filtered.map((conversation) => {
          const friend = conversation.friend;
          return (
            <Link
              key={conversation.conversationId}
              to={`/chats/${conversation.conversationId}`}
              className={`flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-muted ${activeConversationId === conversation.conversationId ? "bg-primary-soft" : ""}`}
            >
              <UserAvatar
                user={{
                  ...friend,
                  userId: friend._id,
                  avatar: friend.avatar ?? undefined,
                  status: friend.status ?? undefined,
                  lastSeen: friend.lastSeen ?? undefined,
                }}
                size="sm"
                showPresence={false}
              />
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-semibold">
                    {friend.name}
                  </span>
                  {conversation.lastMessageAt ? (
                    <span className="shrink-0 text-[10px] text-muted-foreground">
                      {formatTime(conversation.lastMessageAt)}
                    </span>
                  ) : null}
                </span>
                <span className="mt-1 block truncate text-xs text-muted-foreground">
                  {conversation.lastMessage?.text ?? "No messages yet"}
                </span>
              </span>
              {conversation.unreadCount > 0 ? (
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                  {conversation.unreadCount}
                </span>
              ) : null}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
