import { type FC, type ReactNode } from "react";
import { Navigate } from "react-router";
import { ROUTES } from "./config.ts";

type UserRouteProps = {
  children: ReactNode;
};

const UserRoute: FC<UserRouteProps> = ({ children }) => {
  const isAuthenticated = false;

  return isAuthenticated ? (
    <Navigate to={ROUTES.LOGIN} replace />
  ) : (
    <>{children}</>
  );
};

export default UserRoute;
