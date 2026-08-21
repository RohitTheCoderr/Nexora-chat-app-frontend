import api from "@/shared/utils/axios"
import { ENDPOINT } from "@/shared/utils/endpoints"
import type { SessionRes } from "./type"

const getSessionsApi=async():Promise<ApiResponse<SessionRes>>=>{
    const response=await api.get<ApiResponse<SessionRes>>(ENDPOINT.SESSION)

    return response.data
}

const revokeSessionsApi = async (
  sessionId: string
): Promise<ApiResponse<null>> => {
  const response = await api.delete<ApiResponse<null>>(
    `${ENDPOINT.SESSION}/${sessionId}`
  );

  return response.data;
};

export { getSessionsApi, revokeSessionsApi}