import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { AxiosError } from "axios";
import { cancelRequestApi } from "../apis/cancel-request/index.ts";

export const useCancelFriendRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (friendRequestId: string) => cancelRequestApi(friendRequestId),

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
