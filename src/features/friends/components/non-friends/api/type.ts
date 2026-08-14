export type friendRequestStatus = "NONE" | "PENDING_SENT" | "PENDING_RECEIVED";

export type nonFriends = {
  userId: string;
  name: string;
  username: string;
  avatar: avatar;
  status: UserStatus;
  lastSeen: string | null;
  friendRequestStatus: friendRequestStatus;
  friendRequestId: string;
};

export type nonFriendsRes = nonFriends[];
