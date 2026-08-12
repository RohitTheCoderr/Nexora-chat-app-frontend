import { EmptyState } from "@/components/common/empty-friend-card.tsx";
import { FriendCard } from "../friend-card.tsx";
import { useQuery } from "@tanstack/react-query";
import { nonFriendsApi } from "./api/index.ts";
import { User } from "lucide-react";

function NonFriends() {
  const { data, isPending, error } = useQuery({
    queryKey: ["non-friends"],
    queryFn: nonFriendsApi,
  });
  const nonFriends = data?.data || [];

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
          <FriendCard key={user.userId} user={user} variant="user" />
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
