export type Friends = {
  userId: string;
  name: string;
  username: string;
  avatar: avatar;
  status: UserStatus;
  lastSeen: string | null;
};

export type FriendsRes = Friends[];
