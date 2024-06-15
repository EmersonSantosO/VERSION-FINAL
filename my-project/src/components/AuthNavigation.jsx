// src/components/AuthNavigation.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import useStore from "../store";
import Login from "./Login";
import Home from "./Home";
import Admin from "./Admin";
import Productos from "./Productos";
import Clientes from "./Clientes";
import Ventas from "./Ventas";
import Usuarios from "./Usuarios";

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
      <Route
        path="/productos"
        element={
          user && (user.rol === "administrador" || user.rol === "vendedor") ? (
            <Productos />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/clientes"
        element={
          user && (user.rol === "administrador" || user.rol === "vendedor") ? (
            <Clientes />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/ventas"
        element={
          user && (user.rol === "administrador" || user.rol === "vendedor") ? (
            <Ventas />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/usuarios"
        element={
          user && user.rol === "administrador" ? (
            <Usuarios />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="*"
        element={<Navigate to={user ? "/" : "/login"} replace />}
      />
    </Routes>
  );
};

export default AuthNavigation;
