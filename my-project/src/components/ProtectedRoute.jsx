import React from "react";
import { Navigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import useStore from "../store";

const ProtectedRoute = ({ children, roles }) => {
  const user = useStore((state) => state.user);
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const isLoading = useStore((state) => state.isLoading);

  if (isLoading) {
    return <Spinner size="xl" />;
  }

  if (!isLoggedIn || (roles && !roles.includes(user?.rol))) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
