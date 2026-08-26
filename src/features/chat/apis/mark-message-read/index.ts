import api from "@/shared/utils/axios";

export const markMessagesAsRead = (conversationId: string) =>
  api.patch(`/message/${conversationId}/read`);
