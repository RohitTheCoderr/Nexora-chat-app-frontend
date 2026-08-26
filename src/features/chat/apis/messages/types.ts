import type { UserData } from "@/features/sign-in/api/type";

export type MessageType = "TEXT" | "IMAGE" | "FILE";

export type ReadByUser =
  | string
  | {
      _id?: string;
      userId?: string;
    };

export type ChatMessage = {
  _id: string;
  conversation: string;
  sender: UserData;
  text: string;
  messageType: MessageType;
  readBy: ReadByUser[];
  createdAt: string;
  updatedAt: string;
  __v?: number;
};

export type ChatMessageRes = ChatMessage[];
