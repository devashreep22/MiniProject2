import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import LoadingSpinner from "@/components/common/LoadingSpinner";

interface AuthGuardProps {
  roles?: Array<"buyer" | "farmer" | "admin">;
  publicOnly?: boolean;
  redirectTo?: string;
}

const AuthGuard = ({ roles, publicOnly = false, redirectTo = "/login" }: AuthGuardProps) => {
  const { user, token, loading } = useAuth();
  const location = useLocation();

  const isAuthenticated = Boolean(user && token);

  // Role-based main page
  const roleHome = useMemo(() => {
    switch (user?.role) {
      case "admin":
        return "/admin";
      case "farmer":
        return "/farmer";
      case "buyer":
        return "/buyer";
      default:
        return "/";
    }
  }, [user?.role]);

  if (loading) return <LoadingSpinner />;

  // Redirect logged-in users away from public-only pages (login/register)
  if (publicOnly && isAuthenticated) {
    return <Navigate to={roleHome} replace />;
  }

  // Protected route → not logged in
  if (!publicOnly && !isAuthenticated) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  // Role-based authorization check
  if (roles && user?.role && !roles.includes(user.role)) {
    return <Navigate to={roleHome} replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
