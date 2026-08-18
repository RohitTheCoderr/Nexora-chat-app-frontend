import api from "@/shared/utils/axios.ts";
import { ENDPOINT } from "@/shared/utils/endpoints.ts";
// import type { createProfileReq } from "./type.ts";

export const createProfileApi = async (
  payload: FormData,
): Promise<ApiResponse<null>> => {
  const response = await api.post<ApiResponse<null>>(
    ENDPOINT.UPDATE_PROFILE,
    payload,
  );

  return response.data;
};
