import { Navigate, useLocation } from "react-router";
import { useUser } from "../../context/UserContext";

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useUser();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page but save the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user?.role !== "admin") {
    // Redirect to home page if user is not an admin
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
