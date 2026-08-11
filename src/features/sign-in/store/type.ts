export type UserRole = "USER" | "ADMIN" | "SUPER_ADMIN";

export type UserData = {
  userId: string;
  name: string;
  username: string;
  email: string;
  role: UserRole;
  avatar: string | null;
};
