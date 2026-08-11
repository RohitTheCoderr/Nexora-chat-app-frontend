export type LoginReq = {
  username?: string;
  email?: string;
  password: string;
};

export type UserData = {
  userId: string;
  name: string;
  username: string;
  email: string;
  role: UserRole;
  avatar: string | null;
};

export type LoginRes = {
  userData: UserData;
  token: string;
};
