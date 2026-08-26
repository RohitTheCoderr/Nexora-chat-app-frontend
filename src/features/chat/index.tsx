import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Socket } from "socket.io-client";

import { AppLayout } from "@/components/common/app-layout.tsx";
import { useAuth } from "@/features/sign-in/store/authStore.ts";

import { ConversationList } from "./components/conversation-list.tsx";
import { ChatWindow } from "./components/chat-window.tsx";
import DefaultChatWindow from "./components/default-chat-window.tsx";

import {
  createChatSocket,
  joinConversation,
  markSocketMessagesRead,
  sendSocketMessage,
} from "./apis/socket.ts";

import { getConversations } from "./apis/conversations/index.ts";
import { getMessages } from "./apis/messages/index.ts";
import { sendMessage } from "./apis/send-message/index.ts";

import type { ChatMessage } from "./apis/messages/types.ts";
import type { ConversationRes } from "./apis/conversations/type.ts";

type UserLike =
  | string
  | {
      userId?: string;
      _id?: string;
    }
  | null
  | undefined;

type ApiResponse<T> = {
  success: boolean;
  message: string | null;
  data: T;
};

const getId = (user: UserLike): string => {
  if (!user) return "";
  return typeof user === "string" ? user : (user.userId ?? user._id ?? "");
};

const sortMessages = (messages: ChatMessage[]) => {
  return [...messages].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );
};

const sortConversations = <T extends { lastMessageAt?: string | null }>(
  conversations: T[],
) => {
  return [...conversations].sort(
    (a, b) =>
      new Date(b.lastMessageAt ?? 0).getTime() -
      new Date(a.lastMessageAt ?? 0).getTime(),
  );
};

function ChatPage() {
  const { conversationId: requestedId } = useParams<{
    conversationId?: string;
  }>();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { token, userData } = useAuth();

  const [search, setSearch] = useState("");

  const socketRef = useRef<Socket | null>(null);

  // ============================================================
  // CONVERSATIONS
  // ============================================================

  const { data: conversations, isLoading: isConversationsLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
  });

  const conversationData = conversations?.data?.Conversations ?? [];

  // ============================================================
  // ACTIVE CONVERSATION
  // ============================================================

  const activeConversation = useMemo(() => {
    return conversationData.find(
      (conversation) =>
        conversation.conversationId === requestedId ||
        getId(conversation.friend) === requestedId,
    );
  }, [conversationData, requestedId]);

  const activeConversationId = activeConversation?.conversationId;

  // ============================================================
  // MESSAGES
  // ============================================================

  const { data: messages, isLoading: isMessageLoading } = useQuery({
    queryKey: ["messages", activeConversationId],
    queryFn: () => getMessages(activeConversationId!),
    enabled: Boolean(activeConversationId),
    select: (response) => ({
      ...response,
      data: sortMessages(response.data ?? []),
    }),
  });

  // ============================================================
  // HTTP FALLBACK SEND
  // ============================================================

  const httpSend = useMutation({
    mutationFn: (text: string) => sendMessage(activeConversationId!, text),

    onSuccess: (response) => {
      const serverMessage = response?.data;

      if (!serverMessage || !activeConversationId) {
        return;
      }

      // Update messages cache
      queryClient.setQueryData<ApiResponse<ChatMessage[]>>(
        ["messages", activeConversationId],
        (current) => {
          const currentMessages = current?.data ?? [];

          if (
            currentMessages.some((message) => message._id === serverMessage._id)
          ) {
            return current;
          }

          return {
            ...(current ?? {
              success: true,
              message: null,
              data: [],
            }),
            data: sortMessages([...currentMessages, serverMessage]),
          };
        },
      );

      // Update conversation preview
      queryClient.setQueryData<ApiResponse<ConversationRes> | undefined>(
        ["conversations"],
        (current) => {
          if (!current) return current;

          const updated = current.data.Conversations.map((conversation) => {
            if (conversation.conversationId !== activeConversationId) {
              return conversation;
            }

            return {
              ...conversation,

              lastMessage: {
                _id: serverMessage._id,
                text: serverMessage.text,
                messageType: serverMessage.messageType,
                createdAt: serverMessage.createdAt,
              },

              lastMessageAt: serverMessage.createdAt,
            };
          });

          return {
            ...current,

            data: {
              ...current.data,
              Conversations: sortConversations(updated),
            },
          };
        },
      );
      // Ensure any other listeners/refetches see the update
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });
    },

    onError: (error) => {
      console.error("HTTP message send failed:", error);
    },
  });

  // ============================================================
  // INVALID CONVERSATION REDIRECT
  // ============================================================

  useEffect(() => {
    if (requestedId && conversationData.length > 0 && !activeConversation) {
      navigate("/", { replace: true });
    }
  }, [activeConversation, conversationData, navigate, requestedId]);

  // ============================================================
  // SOCKET
  // ============================================================

  useEffect(() => {
    if (!token || !activeConversationId) {
      return;
    }

    const socket = createChatSocket(token);

    socketRef.current = socket;

    // ----------------------------------------------------------
    // JOIN ROOM
    // ----------------------------------------------------------

    const handleConnect = () => {
      joinConversation(socket, activeConversationId);

      // When opening a conversation, mark unread
      // messages as read.
      markSocketMessagesRead(socket, activeConversationId);
      // Also update local conversations cache to clear unread count
      queryClient.setQueryData<ApiResponse<ConversationRes> | undefined>(
        ["conversations"],
        (current) => {
          if (!current) return current;
          return {
            ...current,
            data: {
              ...current.data,
              Conversations: current.data.Conversations.map((conv) =>
                conv.conversationId === activeConversationId
                  ? { ...conv, unreadCount: 0 }
                  : conv,
              ),
            },
          };
        },
      );
    };

    // ----------------------------------------------------------
    // RECEIVE MESSAGE
    // ----------------------------------------------------------

    const receiveMessage = (message: ChatMessage) => {
      // ========================================================
      // GET CONVERSATION ID
      // ========================================================

      const conversationId = getId(message.conversation);

      if (!conversationId) {
        console.error("❌ Conversation ID missing:", message);

        return;
      }

      const isActive = activeConversationId === conversationId;
      // ========================================================
      // UPDATE MESSAGE CACHE
      // ========================================================

      queryClient.setQueryData<ApiResponse<ChatMessage[]> | undefined>(
        ["messages", conversationId],
        (current) => {
          const currentMessages = current?.data ?? [];

          // Already received from server
          if (currentMessages.some((item) => item._id === message._id)) {
            return current;
          }

          // Find optimistic local message
          const optimisticIndex = currentMessages.findIndex(
            (item) =>
              String(item._id).startsWith("local-") &&
              item.text === message.text &&
              getId(item.sender) === getId(message.sender),
          );

          let nextMessages = [...currentMessages];

          if (optimisticIndex !== -1) {
            // Replace local optimistic message
            nextMessages[optimisticIndex] = message;
          } else {
            // Add incoming message
            nextMessages.push(message);
          }

          return {
            ...(current ?? {
              success: true,
              message: null,
              data: [],
            }),

            data: sortMessages(nextMessages),
          };
        },
      );

      // ========================================================
      // UPDATE CONVERSATION LIST
      // ========================================================

      queryClient.setQueryData<ApiResponse<ConversationRes> | undefined>(
        ["conversations"],
        (current) => {
          if (!current) return current;

          const conversations = current.data.Conversations;

          const isFromMe = getId(message.sender) === userData?.userId;

          const updated = conversations.map((conversation) => {
            if (conversation.conversationId !== conversationId) {
              return conversation;
            }

            return {
              ...conversation,

              // --------------------------------------
              // Latest message preview
              // --------------------------------------

              lastMessage: {
                _id: message._id,
                text: message.text,
                messageType: message.messageType ?? "TEXT",
                createdAt: message.createdAt,
              },

              // --------------------------------------
              // Latest message time
              // --------------------------------------

              lastMessageAt: message.createdAt,

              // --------------------------------------
              // Unread count
              // --------------------------------------

              unreadCount: isFromMe
                ? (conversation.unreadCount ?? 0)
                : isActive
                  ? 0
                  : (conversation.unreadCount ?? 0) + 1,
            };
          });

          // --------------------------------------------
          // Latest conversation first
          // --------------------------------------------

          return {
            ...current,

            data: {
              ...current.data,

              Conversations: sortConversations(updated),
            },
          };
        },
      );

      // Also invalidate to ensure UI updates in all places
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });

      // ========================================================
      // MARK AS READ
      // ========================================================

      if (isActive) {
        markSocketMessagesRead(socket, conversationId);
      }
    };

    // ----------------------------------------------------------
    // MESSAGES READ
    // ----------------------------------------------------------

    const messagesRead = ({
      conversationId,
      userId,
    }: {
      conversationId: string;
      userId: string;
    }) => {
      if (
        conversationId !== activeConversationId ||
        userId === userData?.userId
      ) {
        return;
      }

      // ----------------------------------------------
      // Update message readBy
      // ----------------------------------------------

      queryClient.setQueryData<ApiResponse<ChatMessage[]> | undefined>(
        ["messages", activeConversationId],
        (current) => {
          if (!current) return current;

          const updatedMessages = current.data.map((message) => {
            const senderId = getId(message.sender);

            if (senderId !== userData?.userId) {
              return message;
            }

            const readBy = message.readBy ?? [];

            const alreadyRead = readBy.some(
              (reader) => getId(reader) === userId,
            );

            if (alreadyRead) {
              return message;
            }

            return {
              ...message,

              readBy: [...readBy, userId],
            };
          });

          return {
            ...current,
            data: updatedMessages,
          };
        },
      );

      // ----------------------------------------------
      // Clear conversation unread count
      // ----------------------------------------------

      queryClient.setQueryData<ApiResponse<ConversationRes> | undefined>(
        ["conversations"],
        (current) => {
          if (!current) return current;

          return {
            ...current,

            data: {
              ...current.data,

              Conversations: current.data.Conversations.map((conversation) =>
                conversation.conversationId === conversationId
                  ? {
                      ...conversation,
                      unreadCount: 0,
                    }
                  : conversation,
              ),
            },
          };
        },
      );
    };

    // ----------------------------------------------------------
    // CONNECT ERROR
    // ----------------------------------------------------------

    const handleConnectError = (error: Error) => {
      console.error("Socket connection error:", error);
    };

    // ----------------------------------------------------------
    // SOCKET LISTENERS
    // ----------------------------------------------------------

    socket.on("connect", handleConnect);

    socket.on("receive_message", receiveMessage);

    socket.on("messages_read", messagesRead);

    socket.on("connect_error", handleConnectError);

    // If socket is already connected
    if (socket.connected) {
      handleConnect();
    }

    // ----------------------------------------------------------
    // CLEANUP
    // ----------------------------------------------------------

    return () => {
      socket.off("connect", handleConnect);

      socket.off("receive_message", receiveMessage);

      socket.off("messages_read", messagesRead);

      socket.off("connect_error", handleConnectError);

      socket.disconnect();

      socketRef.current = null;
    };
  }, [activeConversationId, queryClient, token, userData?.userId]);

  // ============================================================
  // SEND MESSAGE
  // ============================================================

  const handleSend = (text: string) => {
    const trimmedText = text.trim();

    if (!trimmedText || !activeConversationId || !token) {
      return;
    }

    const socket = socketRef.current;

    // ==========================================================
    // SOCKET SEND
    // ==========================================================

    if (socket?.connected) {
      const tempMessage: ChatMessage = {
        _id: `local-${Date.now()}`,
        conversation: activeConversationId,
        sender: userData as any,
        text: trimmedText,
        messageType: "TEXT",
        readBy: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // --------------------------------------------------------
      // Optimistic message
      // --------------------------------------------------------

      queryClient.setQueryData<ApiResponse<ChatMessage[]> | undefined>(
        ["messages", activeConversationId],
        (current) => {
          const currentMessages = current?.data ?? [];

          return {
            ...(current ?? {
              success: true,
              message: null,
              data: [],
            }),

            data: sortMessages([...currentMessages, tempMessage]),
          };
        },
      );

      // --------------------------------------------------------
      // Optimistic conversation preview
      // --------------------------------------------------------

      queryClient.setQueryData<ApiResponse<ConversationRes> | undefined>(
        ["conversations"],
        (current) => {
          if (!current) return current;

          const updated = current.data.Conversations.map((conversation) =>
            conversation.conversationId === activeConversationId
              ? {
                  ...conversation,

                  lastMessage: {
                    _id: tempMessage._id,
                    text: tempMessage.text,
                    messageType: tempMessage.messageType,
                    createdAt: tempMessage.createdAt,
                  },

                  lastMessageAt: tempMessage.createdAt,
                  unreadCount: 0,
                }
              : conversation,
          );

          return {
            ...current,

            data: {
              ...current.data,

              Conversations: sortConversations(updated),
            },
          };
        },
      );

      // --------------------------------------------------------
      // Send through Socket.IO
      // --------------------------------------------------------

      sendSocketMessage(socket, activeConversationId, trimmedText);

      return;
    }

    // ==========================================================
    // HTTP FALLBACK
    // ==========================================================

    httpSend.mutate(trimmedText);
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <AppLayout
      title="Chats"
      subtitle="Stay connected and continue your conversations"
      padded={false}
      mobileChat={Boolean(activeConversation)}
    >
      <div className="flex h-[calc(100vh)] min-h-130 bg-canvas-glow md:h-[calc(100vh-4rem)]">
        {/* =====================================================
            CONVERSATION LIST
        ===================================================== */}

        <div
          className={
            activeConversation
              ? "hidden md:flex"
              : "flex w-full md:w-auto md:shrink-0"
          }
        >
          <ConversationList
            conversations={conversationData}
            activeConversationId={activeConversationId}
            search={search}
            isLoading={isConversationsLoading}
            onSearchChange={setSearch}
          />
        </div>

        {/* =====================================================
            CHAT WINDOW
        ===================================================== */}

        {activeConversation ? (
          <ChatWindow
            friend={activeConversation.friend}
            messages={messages?.data ?? []}
            currentUserId={userData?.userId}
            isLoading={isMessageLoading}
            isSending={httpSend.isPending}
            onSend={handleSend}
          />
        ) : (
          <DefaultChatWindow />
        )}
      </div>
    </AppLayout>
  );
}

export default ChatPage;
