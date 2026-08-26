import { io, type Socket } from "socket.io-client";
import type { ChatMessage } from "./type.ts";

const getSocketOrigin = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;
  return apiUrl ? new URL(apiUrl).origin : window.location.origin;
};

export const createChatSocket = (token: string) =>
  io(getSocketOrigin(), {
    auth: { token },
    transports: ["websocket"],
    reconnection: false,
  });

export const joinConversation = (socket: Socket, conversationId: string) =>
  socket.emit("join_conversation", conversationId);

export const sendSocketMessage = (
  socket: Socket,
  conversationId: string,
  text: string,
) => socket.emit("send_message", { conversationId, text });

export const markSocketMessagesRead = (socket: Socket, conversationId: string) =>
  socket.emit("mark_as_read", conversationId);

export type ReceiveMessageHandler = (message: ChatMessage) => void;
