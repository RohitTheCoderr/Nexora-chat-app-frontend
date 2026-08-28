import {
  ArrowLeft,
  Check,
  CheckCheck,
  MessageCircle,
  MoreHorizontal,
  Send,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { UserAvatar } from "@/components/common/user-avatar.tsx";
import type { ChatMessage } from "../apis/messages/types";
import type { UserData } from "@/features/sign-in/api/type";

const getId = (user?: string | { userId?: string; _id?: string } | null) => {
  if (!user) return "";

  return typeof user === "string" ? user : (user.userId ?? user._id ?? "");
};
const formatTime = (value?: string | null) =>
  value
    ? new Intl.DateTimeFormat(undefined, {
        hour: "numeric",
        minute: "2-digit",
      }).format(new Date(value))
    : "";
const hasReadReceipt = (readBy: ChatMessage["readBy"], friendId: string) =>
  Boolean(
    readBy?.some((reader) =>
      typeof reader === "string"
        ? reader === friendId
        : (reader.userId ?? reader._id) === friendId,
    ),
  );

type ChatWindowProps = {
  friend: UserData;
  messages: ChatMessage[];
  currentUserId?: string;
  isLoading: boolean;
  isSending: boolean;
  onSend: (text: string) => void;
};

export function ChatWindow({
  friend,
  messages,
  currentUserId,
  isLoading,
  isSending,
  onSend,
}: ChatWindowProps) {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sortedMessages = (messages ?? [])
    .slice()
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  const avatarUser = {
    ...friend,
    userId: getId(friend),
    avatar: friend.avatar ?? undefined,
    status: friend.status ?? undefined,
    lastSeen: friend.lastSeen ?? undefined,
  };
  const handleSend = () => {
    const message = text.trim();

    if (message && !isSending) {
      onSend(message);
      setText("");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sortedMessages.length]);

  return (
    <section className="flex h-full min-h-0 min-w-0 flex-1 flex-col">
      <header className="sticky top-0 z-20  flex h-18.25 shrink-0 items-center gap-3 border-b border-border bg-surface/80 px-2 backdrop-blur md:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => navigate("/")}
          aria-label="Back to conversations"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <UserAvatar user={avatarUser} size="sm" showPresence={true} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">
            {friend.name}{" "}
            <span className="text-primary">{`(@${friend.username ?? ""})`}</span>
          </p>
          <p className="text-xs text-muted-foreground">
            {friend.status === "online"
              ? "Online"
              : `@${friend.username ?? "user"}`}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          aria-label="More conversation options"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </header>
      <div className="nx-scroll  min-h-0 flex-1 overflow-y-auto px-4 py-6 md:px-10 ">
        <div className="mx-auto flex max-w-3xl flex-col gap-3">
          {isLoading ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              Loading messages...
            </p>
          ) : null}
          {!isLoading && !messages.length ? (
            <div className="py-16 text-center">
              <MessageCircle className="mx-auto mb-3 h-9 w-9 text-primary" />
              <p className="text-sm font-semibold">Start the conversation</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Send a message to {friend.name.split(" ")[0]}.
              </p>
            </div>
          ) : null}
          {sortedMessages.map((message) => {
            const mine = getId(message.sender) === currentUserId;
            return (
              <div
                key={message._id}
                className={`flex ${mine ? "justify-end" : "justify-start"}`}
              >
                <div className="max-w-[min(80%,560px)]">
                  {/* Message bubble */}
                  <div
                    className={`rounded-3xl px-4 py-1 text-sm leading-6 ${
                      mine
                        ? "rounded-br-md bg-bubble-out text-bubble-out-foreground"
                        : "rounded-bl-md bg-bubble-in text-bubble-in-foreground"
                    }`}
                  >
                    <p className="whitespace-pre-wrap wrap-break-word">
                      {message.text}
                    </p>
                  </div>

                  {/* Time + read receipt outside bubble */}
                  <div
                    className={`mt-1 flex items-center gap-1 text-[10px] text-muted-foreground ${
                      mine ? "justify-end" : "justify-start"
                    }`}
                  >
                    <span>{formatTime(message.createdAt)}</span>

                    {mine &&
                      (hasReadReceipt(message.readBy, getId(friend)) ? (
                        <CheckCheck className="h-3 w-3" />
                      ) : (
                        <Check className="h-3 w-3" />
                      ))}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} aria-hidden="true" />
        </div>
      </div>
      <div className="shrink-0 border-t border-border bg-surface/90 p-3 md:p-4">
        <div className="mx-auto flex max-w-3xl items-end gap-2">
          <Input
            value={text}
            onChange={(event) => setText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSend();
              }
            }}
            placeholder={`Message ${friend.name.split(" ")[0]}`}
            className="h-11 rounded-xl bg-muted/60 px-4"
            maxLength={5000}
          />
          <Button
            onClick={handleSend}
            disabled={!text.trim() || isSending}
            size="icon-lg"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
