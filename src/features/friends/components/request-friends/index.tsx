import { EmptyState } from "@/components/common/empty-friend-card.tsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "lucide-react";
import Loader from "@/components/common/loader.tsx";
import { RequestFriendsListApi } from "./api/index.ts";
import { FriendRequestCard } from "./components/friend-request-card.tsx";
import { acceptRequestApi } from "../../apis/accept-request/index.ts";
import { toast } from "sonner";
import { rejectRequestApi } from "../../apis/reject-request/index.ts";
import { FriendSkeleton } from "@/components/common/friend-skeleton.tsx";

function RequestFriends() {
  const queryClient = useQueryClient();
  const { data, isPending, error } = useQuery({
    queryKey: ["Request-friends-List"],
    queryFn: RequestFriendsListApi,
  });
  const requestFriends = data?.data || [];

  const { mutate: acceptRequest, isPending: isAcceptingRequest } = useMutation({
    mutationFn: (friendRequestId: string) => acceptRequestApi(friendRequestId),

    onSuccess: (response) => {
      toast.success(response.message);
      // Refetch non-friends API
      queryClient.invalidateQueries({
        queryKey: ["Request-friends-List"],
      });
      queryClient.invalidateQueries({
        queryKey: ["non-friends"],
      });
      queryClient.invalidateQueries({
        queryKey: ["friendsList"],
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

      queryClient.invalidateQueries({
        queryKey: ["Request-friends-List"],
      });
    },

    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  if (error) {
    return <div>Something went wrong.</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-3">
      {isPending ? (
        <FriendSkeleton />
      ) : requestFriends.length > 0 ? (
        requestFriends.map((user) => (
          <FriendRequestCard
            key={user.userId}
            user={user}
            handleAcceptRequest={acceptRequest}
            handleRejectRequest={rejectRequest}
            isAcceptingRequest={isAcceptingRequest}
            isRejectingRequest={isRejectingRequest}
          />
        ))
      ) : (
        <EmptyState
          icon={User}
          title="No friend request found"
          description="Search for people and send your friend request."
        />
      )}
    </div>
  );
}

export default RequestFriends;
