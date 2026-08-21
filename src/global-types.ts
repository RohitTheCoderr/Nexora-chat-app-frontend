
declare global {
  interface ApiResponse<T> {
    success: boolean;
    message: string | null;
    data: T | null;
  }

  type UserRole = "USER" | "ADMIN" | "SUPER_ADMIN";
  type NotificationMessageType =
    | "FRIEND_REQUEST"
    | "FRIEND_REQUEST_SENT"
    | "FRIEND_REQUEST_REJECTED"
    | "FRIEND_REQUEST_CANCELLED"
    | "FRIEND_REQUEST_ACCEPTED"
    | "FRIEND_REQUEST_DELETED"
    | "FRIEND_REQUEST_DECLINED"
    | "NEW_MESSAGE"
    | "MESSAGE_REACTION"
    | "MENTION";
  type UserStatus = "online" | "offline";
  type avatar = { url: string; publicId?: String };

  interface AllUserData {
    userId: string;
    name: string;
    username: string;
    email: string;
    role: UserRole;
    bio?: string;
    avatar?: avatar | null;
    status?: UserStatus | null;
    lastSeen?: null;
    phone?: string | null;
    isVerified?: boolean;
    isActive?: boolean;
  }

  interface NotificationCount {
    count: number;
  }
}
