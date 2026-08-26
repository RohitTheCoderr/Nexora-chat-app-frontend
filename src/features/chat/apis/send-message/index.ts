import api from "@/shared/utils/axios";
import type { ChatMessageRes } from "../messages/types";

export const sendMessage = (conversationId: string, text: string) =>
    api.post<ApiResponse<ChatMessageRes>>("/message/send", {
        conversationId,
        text,
    });