type FriendRequestStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "CANCELLED"
  | "NOT_FOUND"
  | null;

export type Notification = {
  sender: {
    name: string;
    username: string;
    avatar: avatar;
    status: UserStatus;
  };
  notificationId: string;
  receivingDate: string;
  message: string;
  isRead: boolean;
  referenceId: string;
  senderId: string;
  messageType: NotificationMessageType;
  friendRequestStatus: FriendRequestStatus;
};

export type NotificationRes = Notification[];
