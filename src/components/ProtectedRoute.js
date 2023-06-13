import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { Navigate, useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ element: Component, ...props }) => {
  const context = useContext(AppContext);

  return context.isLoggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to="/sign-in" replace />
  );
};
