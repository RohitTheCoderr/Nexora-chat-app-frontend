import api from "@/shared/utils/axios";
import type { ChatMessageRes } from "./types";

export const getMessages = async (conversationId: string): Promise<ApiResponse<ChatMessageRes>> => {
    const response = await api.get<ApiResponse<ChatMessageRes>>(
        `/message/${conversationId}?page=1&size=100`,
    );

    console.log("response", response);

    return response.data;
};