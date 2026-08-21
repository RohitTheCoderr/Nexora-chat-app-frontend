export const ENDPOINT = {
  USER_LOGIN: "/auth/login",
  USER_REGISTER: "/auth/register",
  USER_FORGET_PASSWORD: "/auth/forget-password",
  USER_RESET_PASSWORD: "/auth/reset-password",
  CHECK_USERNAME: "/auth/check-username",

  // friends path
  GET_FRIENDS_LIST: "/friends/request/friends",
  GET_NON_FRIENDS_LIST: "/friends/request/non-friends",
  SEND_FRIENDS_REQUEST: "/friends/request",
  GET_FRIENDS_REQUESTS: "/friends/requests",
  GET_SENDED_FRIENDS_REQUESTS: "/friends/sended/requests",
  ACCEPT_FRIENDS_REQUEST: "/friends/request/accept",
  DECLINE_FRIENDS_REQUEST: "/friends/request/decline",
  CANCEL_FRIENDS_REQUEST: "/friends/request/cancel",

  // notifications
  GET_ALL_NOTIFICATIONS: "/notifications",
  GET_UNREAD_NOTIFICATIONS_BY_TYPE: "/notifications/unread",
  GET_UNREAD_NOTIFICATIONS_COUNT_BY_TYPE: "/notifications/unread-count",
  MARKED_READ_NOTIFICATIONS_BY_ID: "/notifications/read",
  MARKED_ALL_READ_NOTIFICATIONS_BY_TYPE: "/notifications/all-read",

  //  profile
  GET_PROFILE: "users/me",
  CREATE_PROFILE: "/users/create-profile", //post
  UPDATE_PROFILE: "/users/update-profile", // PUT
  DELETE_AVATAR: "/users/delete-avatar", // DELETE


  // session device
  SESSION:"/sessions"
};
