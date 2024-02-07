/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/UserContext";
import { useContext } from "react";

const PrivetRouter = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user?.email && !isLoading) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivetRouter;
