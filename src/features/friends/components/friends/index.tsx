import { EmptyState } from "@/components/common/empty-friend-card.tsx";
import { FriendCard } from "./components/friend-card.tsx";
import { useQuery } from "@tanstack/react-query";
import { User } from "lucide-react";
import { FriendsListApi } from "./api/index.ts";
import { FriendSkeleton } from "@/components/common/friend-skeleton.tsx";

function Friends() {
  const { data, isPending, error } = useQuery({
    queryKey: ["friendsList"],
    queryFn: FriendsListApi,
  });
  const nonFriends = data?.data || [];

  if (error) {
    return <div>Something went wrong.</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-3">
      {isPending ? (
        <FriendSkeleton rows={3} />
      ) : nonFriends.length > 0 ? (
        nonFriends.map((user) => <FriendCard key={user.userId} user={user} />)
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

export default Friends;
