import api from "@/shared/utils/axios.ts";
import { ENDPOINT } from "@/shared/utils/endpoints.ts";
import type { nonFriendsRes } from "./type.ts";

export const nonFriendsApi = async (): Promise<ApiResponse<nonFriendsRes>> => {
  const response = await api.get<ApiResponse<nonFriendsRes>>(
    ENDPOINT.GET_NON_FRIENDS_LIST,
  );
  return response.data;
};
