type avatar = {
  url: string;
  publiId?: string;
};

export type nonFriends = {
  userId: string;
  name: string;
  username: string;
  avatar: avatar;
  status: "offline" | "online";
  lastSeen: string | null;
};

export type nonFriendsRes = nonFriends[];
