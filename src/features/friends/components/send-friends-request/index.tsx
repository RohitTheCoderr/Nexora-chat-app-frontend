import { EmptyState } from "@/components/common/empty-friend-card.tsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "lucide-react";
import Loader from "@/components/common/loader.tsx";
import { SendedFriendsRequestListApi } from "./api/index.ts";
import { SendFriendCard } from "./components/send-friend-card.tsx";
import { cancelRequestApi } from "../../apis/cancel-request/index.ts";
import { toast } from "sonner";
import { useState } from "react";

function SendedFriendsRequest() {
  const queryClient = useQueryClient();
  const [actionRequestId, setActionRequestId] = useState<string | null>(null);

  const { data, isPending, error } = useQuery({
    queryKey: ["sent-friend-requests"],
    queryFn: SendedFriendsRequestListApi,
  });
  const requestFriends = data?.data || [];

  const { mutate: cancelRequest, isPending: isCancelingRequest } = useMutation({
    mutationFn: (friendRequestId: string) => {
      setActionRequestId(friendRequestId);
      return cancelRequestApi(friendRequestId);
    },

    onSuccess: (response) => {
      toast.success(response.message);
      // Refetch send-friend-request-List API
      queryClient.invalidateQueries({
        queryKey: ["sent-friend-requests"],
      });

      queryClient.invalidateQueries({
        queryKey: ["non-friends"],
      });
    },

    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  if (isPending) {
    return <Loader />;
  }

  if (error) {
    return <div>Something went wrong.</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-3">
      {requestFriends.length > 0 ? (
        requestFriends.map((user) => (
          <SendFriendCard
            key={user.userId}
            user={user}
            handleCancelRequest={(userId) => cancelRequest(userId)}
            isCancelingRequest={
              isCancelingRequest && actionRequestId === user.friendRequestId
            }
          />
        ))
      ) : (
        <EmptyState
          icon={User}
          title="No Request Friend found"
          description="Search for people and send your friend request."
        />
      )}
    </div>
  );
}

export default SendedFriendsRequest;
