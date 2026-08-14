import type { friendRequestStatus } from "../../non-friends/api/type.ts";

export type Friends = {
  userId: string;
  name: string;
  username: string;
  avatar: avatar;
  status: UserStatus;
  lastSeen: string | null;
  friendRequestStatus: friendRequestStatus;
  friendRequestId: string;
};

export type FriendsRes = Friends[];
