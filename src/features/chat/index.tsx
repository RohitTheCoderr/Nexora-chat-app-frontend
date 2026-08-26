import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AppLayout } from "@/components/common/app-layout.tsx";
import { useAuth } from "@/features/sign-in/store/authStore.ts";
import { ConversationList } from "./components/conversation-list.tsx";
import { ChatWindow } from "./components/chat-window.tsx";
import {
  createChatSocket,
  joinConversation,
  markSocketMessagesRead,
  sendSocketMessage,
} from "./apis/socket.ts";
import type { Socket } from "socket.io-client";
import DefaultChatWindow from "./components/default-chat-window.tsx";
import { getConversations } from "./apis/conversations/index.ts";
import { getMessages } from "./apis/messages/index.ts";
import { sendMessage } from "./apis/send-message/index.ts";
import type { ChatMessage } from "./apis/messages/types.ts";

const getId = (user: { userId?: string; _id?: string }) =>
  user.userId ?? user._id ?? "";

function ChatPage() {
  const { conversationId: requestedId } = useParams<{
    conversationId?: string;
  }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { token, userData } = useAuth();
  const [search, setSearch] = useState("");
  const socketRef = useRef<Socket | null>(null);

  const { data: conversations, isLoading: isConversationsLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
  });
  console.log("conversations rohit", conversations);
  const conversationData = conversations?.data?.Conversations ?? [];

  const activeConversation = useMemo(
    () =>
      conversationData?.find(
        (conversation) =>
          conversation.conversationId === requestedId ||
          getId(conversation.friend) === requestedId,
      ),
    [conversationData, requestedId],
  );

  const activeConversationId = activeConversation?.conversationId;
  const { data: messages, isLoading: isMessageLoading } = useQuery({
    queryKey: ["messages", activeConversationId],
    queryFn: () => getMessages(activeConversationId!),
    enabled: Boolean(activeConversationId),
  });

  console.log("messages", messages?.data);

  const httpSend = useMutation({
    mutationFn: (text: string) => sendMessage(activeConversationId!, text),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["messages", activeConversationId],
      });
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });

  useEffect(() => {
    if (requestedId && conversationData && !activeConversation)
      navigate("/", { replace: true });
  }, [activeConversation, conversationData, navigate, requestedId]);

  useEffect(() => {
    if (!token || !activeConversationId) return;
    const socket = createChatSocket(token);
    joinConversation(socket, activeConversationId);
    const receiveMessage = (message: ChatMessage) => {
      queryClient.setQueryData<ChatMessage[]>(
        ["messages", activeConversationId],
        (current = []) =>
          current.some((item) => item._id === message._id)
            ? current
            : [...current, message],
      );
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      markSocketMessagesRead(socket, activeConversationId);
    };
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
      )
        return;
      queryClient.setQueryData<ChatMessage[]>(
        ["messages", activeConversationId],
        (current = []) =>
          current.map((message) => {
            const senderId = getId(
              typeof message.sender === "string"
                ? { userId: message.sender }
                : message.sender,
            );
            if (senderId !== userData?.userId) return message;
            const readBy = message.readBy ?? [];
            return readBy.some(
              (reader) =>
                (typeof reader === "string"
                  ? reader
                  : (reader.userId ?? reader._id)) === userId,
            )
              ? message
              : { ...message, readBy: [...readBy, userId] };
          }),
      );
    };
    socketRef.current = socket;
    socket.on("receive_message", receiveMessage);
    socket.on("messages_read", messagesRead);
    socket.on("connect_error", () =>
      queryClient.invalidateQueries({
        queryKey: ["messages", activeConversationId],
      }),
    );
    markSocketMessagesRead(socket, activeConversationId);
    return () => {
      socket.off("receive_message", receiveMessage);
      socket.off("messages_read", messagesRead);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [activeConversationId, queryClient, token, userData?.userId]);

  const handleSend = (text: string) => {
    if (!activeConversationId || !token) return;
    const socket = socketRef.current;
    if (socket?.connected) {
      sendSocketMessage(socket, activeConversationId, text);
    } else {
      httpSend.mutate(text);
    }
  };
  return (
    <AppLayout
      title="Chats"
      subtitle="Stay connected and continue your conversations"
      padded={false}
      mobileChat={Boolean(activeConversation)}
    >
      <div className="flex h-[calc(100vh)] md:h-[calc(100vh-4rem)] min-h-130 bg-canvas-glow">
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
