import type { UserData } from "@/features/sign-in/api/type";
import type { MessageType } from "../messages/types.ts";

export type lastMessage = {
  _id: string;
  messageType: MessageType;
  text: string;
  createdAt: string;
};

export type Conversation = {
  conversationId: string;
  friend: UserData;
  lastMessage?: lastMessage | null;
  lastMessageAt?: string | null;
  unreadCount: number;
};

export type paginationData = {
  page: string | number;
  size: string | number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type ConversationRes = {
  Conversations: Conversation[];
  pagination: paginationData;
};
