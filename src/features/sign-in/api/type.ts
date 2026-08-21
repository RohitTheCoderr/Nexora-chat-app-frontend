


export type LoginReq = {
  username?: string;
  email?: string;
  password: string;
};

export type UserData = {
  userId: string;
  name: string;
  username: string;
  role: UserRole;
  avatar: avatar;
  status: UserStatus;
  
  email?: string;
  phone?: string;
  bio?: string;
  isVerified?: boolean;
  isActive?: boolean;
  FriendsCount?: number;
  BlockedUsersCount?: number;
  lastSeen?: string;
};


export type LoginRes = {
  userData: UserData;
  token: string;
};
