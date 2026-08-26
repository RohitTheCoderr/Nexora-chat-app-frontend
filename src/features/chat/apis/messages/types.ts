import type { UserData } from "@/features/sign-in/api/type";

export type MessageType = "TEXT" | "IMAGE" | "FILE";

export type ChatMessage = {
    _id: string;
    conversation: string;
    sender: UserData;
    text: string;
    messageType: MessageType;
    readBy: Array<string | { _id?: string; userId?: string }>;
    createdAt: string;
    updatedAt: string;
    __v?: number;
};

export type ChatMessageRes = ChatMessage[];