import api from "@/shared/utils/axios";
import type { ConversationRes } from "./type";

export const getConversations = async (): Promise<
  ApiResponse<ConversationRes>
> => {
  const response = await api.get<ApiResponse<ConversationRes>>(
    "/conversations?page=1&size=50",
  );
  return response.data;
};
