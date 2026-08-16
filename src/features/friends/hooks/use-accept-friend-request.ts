import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { acceptRequestApi } from "../apis/accept-request/index.ts";

export const useAcceptFriendRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (friendRequestId: string) => acceptRequestApi(friendRequestId),

    onSuccess: (response) => {
      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: ["non-friends"],
      });

      queryClient.invalidateQueries({
        queryKey: ["friendsList"],
      });

      queryClient.invalidateQueries({
        queryKey: ["Request-friends-List"],
      });
    },

    onError: (error: AxiosError<ApiResponse<null>>) => {
      toast.error(error.response?.data?.message ?? error.message);
    },
  });
};
