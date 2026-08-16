import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { sendRequestApi } from "../apis/send-request/index.ts";
import type { AxiosError } from "axios";

export const useSendFriendRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => sendRequestApi(userId),

    onSuccess: (response) => {
      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: ["non-friends"],
      });

      queryClient.invalidateQueries({
        queryKey: ["sent-friend-requests"],
      });
    },

    onError: (error: AxiosError<ApiResponse<null>>) => {
      toast.error(error.response?.data?.message ?? error.message);
    },
  });
};
