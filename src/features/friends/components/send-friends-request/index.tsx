import { EmptyState } from "@/components/common/empty-friend-card.tsx";
import { FriendCard } from "../friend-card.tsx";
import { useQuery } from "@tanstack/react-query";
import { User } from "lucide-react";
import Loader from "@/components/common/loader.tsx";
import { SendedFriendsRequestListApi } from "./api/index.ts";

function SendedFriendsRequest() {
  const { data, isPending, error } = useQuery({
    queryKey: ["send-friend-request-List"],
    queryFn: SendedFriendsRequestListApi,
  });
  const requestFriends = data?.data || [];

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
          <FriendCard key={user.userId} user={user} variant="sent" />
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
