import type { UserData } from "@/features/sign-in/api/type";

export type lastMessage = {
    _id: string;
    messageType: "TEXT" | string;
    text: string;
    createdAt: string;
}

export type Conversation = {
    conversationId: string;
    friend: UserData;
    lastMessage?: lastMessage | null;
    lastMessageAt?: string | null;
    unreadCount: number;
};

export type paginationData = {
    page: string | number
    size: string | number
    totalItems: number,
    totalPages: number,
    hasNextPage: boolean,
    hasPreviousPage: boolean
}

export type ConversationRes = {
    Conversations: Conversation[]
    pagination: paginationData
}
