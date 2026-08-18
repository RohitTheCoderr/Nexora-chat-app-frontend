export type profile = {
  name: string;
  username: string;
  role: UserRole;
  avatar: avatar;
  status: UserStatus;
  email: string;
  phone: string;
  userId: string;
  bio: string;
  isVerified: boolean;
  isActive: boolean;
  FriendsCount: number;
  BlockedUsersCount: number;
  lastSeen: string;
};

export type ProfileRes = profile;
