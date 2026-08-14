import { EmptyState } from "@/components/common/empty-friend-card.tsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { nonFriendsApi } from "./api/index.ts";
import { User } from "lucide-react";
import { NonFriendCard } from "./components/non-friend-card.tsx";
import { sendRequestApi } from "../../apis/send-request/index.ts";
import { toast } from "sonner";
import { acceptRequestApi } from "../../apis/accept-request/index.ts";
import { rejectRequestApi } from "../../apis/reject-request/index.ts";
import { cancelRequestApi } from "../../apis/cancel-request/index.ts";
import { useState } from "react";

function NonFriends() {
  const queryClient = useQueryClient();
  const [sendingUserId, setSendingUserId] = useState<string | null>(null);

  const { data, isPending, error } = useQuery({
    queryKey: ["non-friends"],
    queryFn: nonFriendsApi,
  });
  const nonFriends = data?.data || [];

  const { mutate: sendRequest, isPending: isSendingRequest } = useMutation({
    // mutationFn: (userId: string) => sendRequestApi(userId),
    mutationFn: (userId: string) => {
      setSendingUserId(userId);
      return sendRequestApi(userId);
    },

    onSuccess: (response) => {
      toast.success(response.message);
      // Refetch non-friends API
      queryClient.invalidateQueries({
        queryKey: ["non-friends"],
      });
    },

    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  const { mutate: acceptRequest, isPending: isAcceptingRequest } = useMutation({
    mutationFn: (friendRequestId: string) => acceptRequestApi(friendRequestId),

    onSuccess: (response) => {
      toast.success(response.message);
      // Refetch non-friends API
      queryClient.invalidateQueries({
        queryKey: ["non-friends"],
      });
    },

    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });
  const { mutate: rejectRequest, isPending: isRejectingRequest } = useMutation({
    mutationFn: (friendRequestId: string) => rejectRequestApi(friendRequestId),

    onSuccess: (response) => {
      toast.success(response.message);
      // Refetch non-friends API
      queryClient.invalidateQueries({
        queryKey: ["non-friends"],
      });
    },

    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });
  const { mutate: cancelRequest, isPending: isCancelingRequest } = useMutation({
    mutationFn: (friendRequestId: string) => cancelRequestApi(friendRequestId),

    onSuccess: (response) => {
      toast.success(response.message);
      // Refetch non-friends API
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong.</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-3">
      {nonFriends.length > 0 ? (
        nonFriends.map((user) => (
          // <FriendCard key={user.userId} user={user} variant="user" />
          <NonFriendCard
            key={user.userId}
            user={user}
            handleSendRequest={sendRequest}
            handleAcceptRequest={acceptRequest}
            handleRejectRequest={rejectRequest}
            handleCancelRequest={cancelRequest}
            isSendingRequest={isSendingRequest && sendingUserId === user.userId}
            isAcceptingRequest={isAcceptingRequest}
            isRejectingRequest={isRejectingRequest}
            isCancelingRequest={isCancelingRequest}
          />
        ))
      ) : (
        <EmptyState
          icon={User}
          title="No people found"
          description="Search for people and send your friend request."
        />
      )}
    </div>
  );
}

export default NonFriends;
