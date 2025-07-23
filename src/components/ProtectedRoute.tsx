// components/ProtectedRoute.tsx

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
  allowedRoles
}: {
  children: JSX.Element;
  allowedRoles: number[];
}) => {
  const userRole = Number(localStorage.getItem("role"));

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/login" />;
  }

  
  return children;
};

export default ProtectedRoute;
