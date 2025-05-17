import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoute = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  if (loading) {
    return <p>loading...</p>;
  }

  return isAuthenticated ? <Outlet/> : <Navigate to="/login" />;
};

export default PrivateRoute;
