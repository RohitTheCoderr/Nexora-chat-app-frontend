declare global {
  type FriendProfile = {
    userId: string;
    name: string;
    username: string;
    avatar?: {
      url?: string;
    };
    bio?: string;
    email: string;
    phone?: string;
    status: UserStatus;
    lastSeen?: string;
    createdAt: string;
    isVerified: boolean;
    friendsCount: number;
  };

  type FriendProfileRes = FriendProfile;
}
