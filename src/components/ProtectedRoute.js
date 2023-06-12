import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ element: Component, ...props }) => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  return context.loggedIn ? (
    <Component {...props} />
  ) : (
    navigate("/sign-up", { replace: true })
  );
};
