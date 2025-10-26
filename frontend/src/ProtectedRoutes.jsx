import { Navigate, Outlet } from "react-router";

const useAuth = () => {
  const user = { loggedIn: localStorage.getItem("accessToken") };
  return user && user.loggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;

// https://stackoverflow.com/a/72024146