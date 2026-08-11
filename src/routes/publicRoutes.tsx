import { type FC, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "./config.ts";
import { useAuth } from "@/features/sign-in/store/authStore.ts";

type PublicRouteProps = {
  children: ReactNode;
};

const PublicRoute: FC<PublicRouteProps> = ({ children }) => {
  const { token, userData } = useAuth();

  const isAuthenticated = !!token && !!userData;

  return isAuthenticated ? (
    <Navigate to={ROUTES.HOME} replace />
  ) : (
    <>{children}</>
  );
};

export default PublicRoute;
