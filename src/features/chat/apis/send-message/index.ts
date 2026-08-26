import api from "@/shared/utils/axios";
import type { ChatMessage } from "../messages/types";

export const sendMessage = async (
  conversationId: string,
  text: string,
): Promise<ApiResponse<ChatMessage>> => {
  const response = await api.post<ApiResponse<ChatMessage>>("/message/send", {
    conversationId,
    text,
  });

  return response.data;
};
