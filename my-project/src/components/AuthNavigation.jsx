// AuthNavigation.jsx - Simplificado
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
  const { user } = useStore((state) => ({ user: state.user }));

  const isAllowed = (allowedRoles) => user && allowedRoles.includes(user.rol);

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
          isAllowed(["administrador"]) ? (
            <Admin />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/productos"
        element={
          isAllowed(["administrador", "vendedor"]) ? (
            <Productos />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/clientes"
        element={
          isAllowed(["administrador", "vendedor"]) ? (
            <Clientes />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/ventas"
        element={
          isAllowed(["administrador", "vendedor"]) ? (
            <Ventas />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/usuarios"
        element={
          isAllowed(["administrador"]) ? (
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
