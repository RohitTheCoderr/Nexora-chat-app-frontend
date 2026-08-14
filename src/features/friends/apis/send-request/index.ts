import api from "@/shared/utils/axios.ts";
import { ENDPOINT } from "@/shared/utils/endpoints.ts";

export const sendRequestApi = async (
  userId: string,
): Promise<ApiResponse<null>> => {
  const response = await api.post<ApiResponse<null>>(
    `${ENDPOINT.SEND_FRIENDS_REQUEST}/${userId}`,
  );
  return response.data;
};
