import { Navigate } from "react-router";
import useUser from "../../hooks/useUser";
import LoadingSpinner from "../shared/LoadingSpinner";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useUser();

  if (loading) {
    return <LoadingSpinner containerHeight="min-h-screen" size="large" />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
