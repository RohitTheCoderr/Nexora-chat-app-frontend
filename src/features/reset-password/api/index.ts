import api from "@/shared/utils/axios.ts";
import { ENDPOINT } from "@/shared/utils/endpoints.ts";
import type { resetReq } from "./type.ts";

export const resetPasswordApi = async ({
  token,
  payload,
}: resetReq): Promise<ApiResponse<null>> => {
  const response = await api.post<ApiResponse<null>>(
    `${ENDPOINT.USER_RESET_PASSWORD}/${token}`,
    payload,
  );

  return response.data;
};
