import api from "@/shared/utils/axios.ts";
import { ENDPOINT } from "@/shared/utils/endpoints.ts";
import type { FriendsRes } from "./type.ts";

export const RequestFriendsListApi = async (): Promise<
  ApiResponse<FriendsRes>
> => {
  const response = await api.get<ApiResponse<FriendsRes>>(
    ENDPOINT.GET_FRIENDS_REQUESTS,
  );
  return response.data;
};
