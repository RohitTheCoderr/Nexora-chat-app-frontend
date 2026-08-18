import api from "@/shared/utils/axios.ts";
import { ENDPOINT } from "@/shared/utils/endpoints.ts";
import type { ProfileRes } from "./type.ts";

export const getProfileApi = async (): Promise<ApiResponse<ProfileRes>> => {
  const response = await api.get<ApiResponse<ProfileRes>>(ENDPOINT.GET_PROFILE);

  return response.data;
};
