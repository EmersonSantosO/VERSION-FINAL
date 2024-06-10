import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import useStore from "../store";
import Login from "./Login";
import Home from "./Home";
import Admin from "./Admin";

const AuthNavigation = () => {
  const user = useStore((state) => state.user);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={user ? <Home /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/admin"
        element={
          user && user.rol === "administrador" ? (
            <Admin />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};

export default AuthNavigation;
