import api from "../utils/axios.ts";
import { ENDPOINT } from "../utils/endpoints.ts";

export const getUnreadNotificationCount = async (): Promise<
  ApiResponse<NotificationCount>
> => {
  const response = await api.get<ApiResponse<NotificationCount>>(
    ENDPOINT.GET_UNREAD_NOTIFICATIONS_COUNT_BY_TYPE,
  );
  return response.data;
};
