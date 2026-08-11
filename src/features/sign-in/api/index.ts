import api from "@/shared/utils/axios.ts";
import { ENDPOINT } from "@/shared/utils/endpoints.ts";
import type { LoginReq, LoginRes } from "./type.ts";

const loginUser = async (payload: LoginReq): Promise<ApiResponse<LoginRes>> => {
  const response = await api.post<ApiResponse<LoginRes>>(
    ENDPOINT.USER_LOGIN,
    payload,
  );

  return response.data;
};

export default loginUser;
