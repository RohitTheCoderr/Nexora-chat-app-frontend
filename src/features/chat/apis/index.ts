// import api from "@/shared/utils/axios.ts";
// import type { ChatMessage, Conversation } from "./type.ts";

// export const getConversations = async () => {
//   const response = await api.get<ApiResponse<Conversation[]>>(
//     "/conversations?page=1&size=50",
//   );
//   return response.data.data ?? [];
// };

// export const getMessages = async (conversationId: string) => {
//   const response = await api.get<ApiResponse<ChatMessage[]>>(
//     `/message/${conversationId}?page=1&size=100`,
//   );
//   return (response.data.data ?? []).reverse();
// };

// export const markMessagesAsRead = (conversationId: string) =>
//   api.patch(`/message/${conversationId}/read`);

// export const sendMessage = (conversationId: string, text: string) =>
//   api.post<ApiResponse<ChatMessage>>("/message/send", {
//     conversationId,
//     text,
//   });
