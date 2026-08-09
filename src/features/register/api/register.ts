// import api from "@/lib/axios";
import api from "@/shared/utils/axios.ts";
import type { RegisterRequest, RegisterResponse } from "./types";
import { ENDPOINT } from "@/shared/utils/endpoints.ts";

const registerUser = async (
  payload: RegisterRequest,
): Promise<ApiResponse<RegisterResponse>> => {
  const response = await api.post<ApiResponse<RegisterResponse>>(
    `${ENDPOINT.USER_REGISTER}`,
    payload,
  );

  return response.data;
};

export default registerUser;
