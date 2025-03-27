import { Navigate, useLocation } from "react-router";
import { useUser } from "../../context/UserContext";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useUser();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    // Redirect to home page if user is already authenticated
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
