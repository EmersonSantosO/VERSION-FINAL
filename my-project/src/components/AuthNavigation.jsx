//components/AuthNavigation.jsx
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Login from "./Login";
import Home from "./Home";
import Admin from "./Admin";

const AuthNavigation = () => {
  const { token, user, setToken } = useContext(AuthContext);

  return (
    <Routes>
      {!token ? (
        <Route path="/login" element={<Login setToken={setToken} />} />
      ) : (
        <>
          <Route path="/home" element={<Home />} />
          {user && user.rol === "administrador" ? (
            <Route path="/admin" element={<Admin />} />
          ) : (
            <Route path="/admin" element={<Navigate to="/home" />} />
          )}
        </>
      )}
      <Route path="*" element={<Navigate to={token ? "/home" : "/login"} />} />
    </Routes>
  );
};

export default AuthNavigation;
