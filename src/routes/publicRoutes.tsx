import { type FC, type ReactNode } from "react";
import { Navigate } from "react-router";
import { ROUTES } from "./config.ts";

type PublicRouteProps = {
  children: ReactNode;
};

const PublicRoute: FC<PublicRouteProps> = ({ children }) => {
  const isAuthenticated = false;

  return isAuthenticated ? (
    <Navigate to={ROUTES.HOME} replace />
  ) : (
    <>{children}</>
  );
};

export default PublicRoute;
