import api from "@/shared/utils/axios.ts";
import type { forgetReq } from "./type.ts";
import { ENDPOINT } from "@/shared/utils/endpoints.ts";

export const forgetPasswordApi = async (
  payload: forgetReq,
): Promise<ApiResponse<null>> => {
  const response = await api.post<ApiResponse<null>>(
    ENDPOINT.USER_FORGET_PASSWORD,
    payload,
  );

  return response.data;
};
