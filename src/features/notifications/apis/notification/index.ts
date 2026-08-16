import { ENDPOINT } from "@/shared/utils/endpoints.ts";
import type { NotificationRes } from "./type.ts";
import api from "@/shared/utils/axios.ts";

export const NotificationsApi = async (): Promise<
  ApiResponse<NotificationRes>
> => {
  const response = await api.get<ApiResponse<NotificationRes>>(
    ENDPOINT.GET_ALL_NOTIFICATIONS,
  );

  return response.data;
};
