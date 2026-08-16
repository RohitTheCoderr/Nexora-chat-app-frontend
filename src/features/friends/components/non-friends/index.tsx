import { EmptyState } from "@/components/common/empty-friend-card.tsx";
import { useQuery } from "@tanstack/react-query";
import { nonFriendsApi } from "./api/index.ts";
import { User } from "lucide-react";
import { NonFriendCard } from "./components/non-friend-card.tsx";
import {
  useAcceptFriendRequest,
  useCancelFriendRequest,
  useRejectFriendRequest,
  useSendFriendRequest,
} from "../../hooks/index.ts";

function NonFriends() {
  const { data, isPending, error } = useQuery({
    queryKey: ["non-friends"],
    queryFn: nonFriendsApi,
  });
  const nonFriends = data?.data || [];
  const {
    mutate: sendRequest,
    isPending: isSendingRequest,
    variables: sendingUserId,
  } = useSendFriendRequest();

  const { mutate: acceptRequest, isPending: isAcceptingRequest } =
    useAcceptFriendRequest();

  const { mutate: rejectRequest, isPending: isRejectingRequest } =
    useRejectFriendRequest();

  const { mutate: cancelRequest, isPending: isCancelingRequest } =
    useCancelFriendRequest();

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
