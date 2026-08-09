import { Suspense, type ComponentType } from "react";
import { createBrowserRouter } from "react-router-dom";
import PublicRoute from "./publicRoutes.tsx";
import Loader from "@/components/common/loader.tsx";
import RegisterPage from "@/features/register/index.tsx";
import { ROUTES } from "./config.ts";
import DocumentTitle, {
  type RouteHandle,
} from "@/components/common/document-title.tsx";
import ChatPage from "@/features/chat/index.tsx";
import UserRoute from "./userRoutes.tsx";
import Login from "@/features/sign-in/index.tsx";
import ForgetPassword from "@/features/forget-password/index.tsx";

const PublicRoutes = (Component: ComponentType) => (
  <PublicRoute>
    <DocumentTitle />
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  </PublicRoute>
);

const UserRoutes = (Component: ComponentType) => (
  <UserRoute>
    <DocumentTitle />
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  </UserRoute>
);

const router = createBrowserRouter([
  {
    path: ROUTES.REGISTER,
    element: PublicRoutes(RegisterPage),
    handle: { title: "Resiter | Nexora" } satisfies RouteHandle,
  },
  {
    path: ROUTES.LOGIN,
    element: PublicRoutes(Login),
    handle: { title: "SignIn | Nexora" } satisfies RouteHandle,
  },
  {
    path: ROUTES.FORGET_PASSWORD,
    element: PublicRoutes(ForgetPassword),
    handle: { title: "Forget password | Nexora" } satisfies RouteHandle,
  },
  {
    path: ROUTES.RESET_PASSWORD,
    element: PublicRoutes(RegisterPage),
    handle: { title: "Reset password | Nexora" } satisfies RouteHandle,
  },

  // authentication user can go on these pages
  {
    path: ROUTES.HOME,
    element: UserRoutes(ChatPage),
    handle: { title: "Welcome to Nexora chat app" },
  },
]);

export default router;
