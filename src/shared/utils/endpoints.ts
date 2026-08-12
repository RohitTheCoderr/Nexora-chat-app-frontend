export const ENDPOINT = {
  USER_LOGIN: "/auth/login",
  USER_REGISTER: "/auth/register",
  USER_FORGET_PASSWORD: "/auth/forget-password",
  USER_RESET_PASSWORD: "/auth/reset-password",
  CHECK_USERNAME: "/auth/check-username",

  // friends path
  GET_FRIENDS_LIST: "/friends/request/friends",
  GET_NON_FRIENDS_LIST: "/friends/request/non-friends",
  SEND_FRIENDS_REQUEST: "/friends/request/:userId",
  GET_FRIENDS_REQUESTS: "/friends/requests",
  ACCEPT_FRIENDS_REQUEST: "/friends/request/accept/:userId",
  DECLINE_FRIENDS_REQUEST: "/friends/request/decline/:userId",
  CANCLE_FRIENDS_REQUEST: "/friends/request/cancel/:userId",
};
