import api from "@/shared/utils/axios.ts";
import { ENDPOINT } from "@/shared/utils/endpoints.ts";

export const acceptRequestApi = async (
  friendRequestId: string,
): Promise<ApiResponse<null>> => {
  const response = await api.patch<ApiResponse<null>>(
    `${ENDPOINT.ACCEPT_FRIENDS_REQUEST}/${friendRequestId}`,
  );
  return response.data;
};
