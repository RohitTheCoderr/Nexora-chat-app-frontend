import { ENDPOINT } from "@/shared/utils/endpoints.ts";
import api from "@/shared/utils/axios.ts";

export const readNotificationApi = async (
  notificationId: string,
): Promise<ApiResponse<null>> => {
  const response = await api.patch<ApiResponse<null>>(
    `${ENDPOINT.MARKED_READ_NOTIFICATIONS_BY_ID}/${notificationId}`,
  );

  return response.data;
};
