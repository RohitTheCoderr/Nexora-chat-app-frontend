import { ArrowLeft, MessageCircle, User2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { AppLayout } from "@/components/common/app-layout";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/common/user-avatar";
import { getUserProfileApi } from "./api/index.ts";

export default function UserProfilePage() {
  const navigate = useNavigate();
  const { userId } = useParams();

  console.log("userId", userId);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["Friend-profile", userId],
    queryFn: () => getUserProfileApi(userId!),
    enabled: Boolean(userId),
  });

  const user = data?.data;

  if (isLoading) {
    return (
      <AppLayout title="Profile">
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-sm text-muted-foreground">Loading profile...</p>
        </div>
      </AppLayout>
    );
  }

  if (isError || !user) {
    return (
      <AppLayout title="Profile">
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
          <User2 className="h-10 w-10 text-muted-foreground" />

          <p className="text-sm font-medium">User not found</p>

          <Button onClick={() => navigate(-1)}>Go back</Button>
        </div>
      </AppLayout>
    );
  }

  const avatarUser = {
    userId: user.userId,
    name: user.name,
    username: user.username,
    avatar: user.avatar,
    status: user.status,
  };

  return (
    <AppLayout title="User Profile" subtitle={`@${user.username}`}>
      <div className="mx-auto w-full max-w-3xl">
        {/* Back */}
        <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-soft">
          {/* Banner */}
          <div className="h-32 bg-primary/10 md:h-44" />

          {/* Profile header */}
          <div className="px-6 pb-6">
            <div className="-mt-12 flex flex-col items-center text-center">
              <div className="rounded-full border-4 border-surface">
                <UserAvatar user={avatarUser} size="xl" showPresence={false} />
              </div>

              <h1 className="mt-3 text-xl font-bold">{user.name}</h1>

              <p className="text-sm text-muted-foreground">@{user.username}</p>

              <p className="mt-2 text-xs text-muted-foreground">
                {user.status === "online" ? "● Online" : "Offline"}
              </p>
            </div>

            {/* Bio */}
            {user.bio ? (
              <div className="mt-6 text-center">
                <p className="text-sm leading-6 text-muted-foreground">
                  {user.bio}
                </p>
              </div>
            ) : null}

            {/* Message */}
            <Button
              className="mt-6 w-full"
              onClick={() => navigate(`/chat/${user.userId}`)}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Message
            </Button>
          </div>
        </div>

        {/* About */}
        <div className="mt-5 rounded-3xl border border-border bg-surface p-6">
          <h2 className="text-base font-semibold">About</h2>

          <div className="mt-5 space-y-5">
            <div>
              <p className="text-xs text-muted-foreground">Name</p>
              <p className="mt-1 text-sm font-medium">{user.name}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Username</p>
              <p className="mt-1 text-sm font-medium">@{user.username}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="mt-1 text-sm font-medium">{user.email}</p>
            </div>{" "}
            <div>
              <p className="text-xs text-muted-foreground">Mobile No</p>
              <p className="mt-1 text-sm font-medium">
                {user.phone || "Not avaiable"}
              </p>
            </div>{" "}
            <div>
              <p className="text-xs text-muted-foreground">Joining date</p>
              <p className="mt-1 text-sm font-medium">{user.createdAt}</p>
            </div>
            {user.bio ? (
              <div>
                <p className="text-xs text-muted-foreground">Bio</p>
                <p className="mt-1 text-sm font-medium">{user.bio}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
