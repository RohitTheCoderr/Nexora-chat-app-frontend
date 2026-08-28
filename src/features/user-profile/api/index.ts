import api from "@/shared/utils/axios.ts";
import { ENDPOINT } from "@/shared/utils/endpoints.ts";

export const getUserProfileApi = async (
  userId: string,
): Promise<ApiResponse<FriendProfileRes>> => {
  const response = await api.get<ApiResponse<FriendProfileRes>>(
    `${ENDPOINT.GET_FRIEND_PROFILE}/${userId}`,
  );

  return response.data;
};
