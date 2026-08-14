import api from "@/shared/utils/axios.ts";
import { ENDPOINT } from "@/shared/utils/endpoints.ts";

export const cancelRequestApi = async (
  friendRequestId: string,
): Promise<ApiResponse<null>> => {
  const response = await api.delete<ApiResponse<null>>(
    `${ENDPOINT.CANCEL_FRIENDS_REQUEST}/${friendRequestId}`,
  );
  return response.data;
};
