import { type FC, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "./config.ts";
import { useAuth } from "@/features/sign-in/store/authStore.ts";

type UserRouteProps = {
  children: ReactNode;
};

const UserRoute: FC<UserRouteProps> = ({ children }) => {
  const { token, userData } = useAuth();

  const isAuthenticated = !!token && !!userData;

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to={ROUTES.LOGIN} replace />
  );
};

export default UserRoute;
