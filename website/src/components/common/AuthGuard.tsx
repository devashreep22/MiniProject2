import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import LoadingSpinner from "@/components/common/LoadingSpinner";

interface AuthGuardProps {
  roles?: Array<"buyer" | "farmer" | "admin">;
  redirectTo?: string;
}

const AuthGuard = ({ roles, redirectTo = "/auth" }: AuthGuardProps) => {
  const { user, token, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthenticated = Boolean(user && token);

  // Default home path based on role
  const homePath = useMemo(() => {
    const role = user?.role;
    if (role === "admin") return "/admin";
    if (role === "farmer") return "/farmer";
    if (role === "buyer") return "/buyer";
    return "/";
  }, [user?.role]);

  // Redirect authenticated users away from /auth routes
  useEffect(() => {
    if (isAuthenticated && location.pathname.startsWith("/auth")) {
      navigate(homePath, { replace: true });
    }
  }, [isAuthenticated, location.pathname, navigate, homePath]);

  // Unauthorized check: user has role but not in allowed roles
  const unauthorized = Boolean(roles && user?.role && !roles.includes(user.role));

  // Redirect if role is not authorized
  useEffect(() => {
    if (unauthorized) {
      navigate(homePath, { replace: true });
    }
  }, [unauthorized, navigate, homePath]);

  // Loading state
  if (loading) return <LoadingSpinner />;

  // If not authenticated → go to login
  if (!isAuthenticated) return <Navigate to={redirectTo} replace />;

  // If unauthorized → bounce to role home
  if (unauthorized) return <Navigate to={homePath} replace />;

  return <Outlet />;
};

export default AuthGuard;
