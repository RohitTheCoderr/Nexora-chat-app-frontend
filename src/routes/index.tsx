import { lazy, Suspense, type ComponentType } from "react";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import PublicRoute from "./publicRoutes.tsx";
import Loader from "@/components/common/loader.tsx";
import RegisterPage from "@/features/register/index.tsx";
import { ROUTES } from "./config.ts";
import DocumentTitle, {
  type RouteHandle,
} from "@/components/common/document-title.tsx";
import UserRoute from "./userRoutes.tsx";
import ResetPassword from "@/features/reset-password/index.tsx";
import Friends from "@/features/friends/index.tsx";
import NonFriends from "@/features/friends/components/non-friends/index.tsx";
import AllFriends from "@/features/friends/components/friends/index.tsx";
import { NotFound } from "@/components/common/not-found.tsx";
import RequestFriends from "@/features/friends/components/request-friends/index.tsx";

const ChatPage = lazy(() => import("@/features/chat/index.tsx"));
const Login = lazy(() => import("@/features/sign-in/index.tsx"));
const ForgetPassword = lazy(
  () => import("@/features/forget-password/index.tsx"),
);
const Notifications = lazy(() => import("@/features/notifications/index.tsx"));

const PublicRoutes = (Component: ComponentType) => (
  <PublicRoute>
    <DocumentTitle />
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  </PublicRoute>
);

const router = createBrowserRouter([
  {
    path: ROUTES.REGISTER,
    element: PublicRoutes(RegisterPage),
    handle: { title: "Register on Nexora" } satisfies RouteHandle,
  },
  {
    path: ROUTES.LOGIN,
    element: PublicRoutes(Login),
    handle: { title: "Sign in to Nexora" } satisfies RouteHandle,
  },
  {
    path: ROUTES.FORGET_PASSWORD,
    element: PublicRoutes(ForgetPassword),
    handle: { title: "Forget password | Nexora" } satisfies RouteHandle,
  },
  {
    path: ROUTES.RESET_PASSWORD,
    element: PublicRoutes(ResetPassword),
    handle: { title: "Reset password | Nexora" } satisfies RouteHandle,
  },

  // authentication user can go on these pages
  {
    path: ROUTES.HOME,
    element: (
      <UserRoute>
        <DocumentTitle />
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </UserRoute>
    ),
    children: [
      {
        index: true,
        element: <ChatPage />,
        handle: { title: "Welcome to Nexora chat app" },
      },
      {
        path: ROUTES.NOTIFICATIONS,
        element: <Notifications />,
        handle: { title: "Notifications | Nexora" },
      },

      {
        path: ROUTES.FRIENDS,
        element: <Friends />,
        handle: { title: "Friends · Nexora" },

        children: [
          {
            index: true,
            element: <Navigate to="all" replace />,
          },
          {
            path: ROUTES.FRIENDS_NON,
            element: <NonFriends />,
            handle: { title: "Find Friends · Nexora" },
          },
          {
            path: "all",
            element: <AllFriends />,
            handle: { title: "Friends · Nexora" },
          },
          {
            path: ROUTES.FRIENDS_REQUEST,
            element: <RequestFriends />,
            handle: { title: "Friend Requests · Nexora" },
          },
          // {
          //   path: "sent",
          //   element: <SentRequests />,
          //   handle: { title: "Sent Requests · Nexora" },
          // },
          // {
          //   path: "rejected",
          //   element: <RejectedRequests />,
          //   handle: { title: "Rejected Requests · Nexora" },
          // },
        ],
      },
    ],
  },

  // 👇 Global 404
  {
    path: "*",
    element: <NotFound />,
    handle: { title: "Page Not Found | Nexora" },
  },
]);

export default router;
