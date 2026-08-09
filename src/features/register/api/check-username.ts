import api from "@/shared/utils/axios.ts";
import { ENDPOINT } from "@/shared/utils/endpoints.ts";

export interface CheckUsernameResponse {
  available: boolean;
}

export const checkUsername = async (
  username: string,
): Promise<ApiResponse<CheckUsernameResponse>> => {
  const response = await api.get<ApiResponse<CheckUsernameResponse>>(
    `${ENDPOINT.CHECK_USERNAME}`,
    {
      params: {
        username,
      },
    },
  );

  return response.data;
};
