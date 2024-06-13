// src/App.jsx
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Admin from "./components/Admin";
import Home from "./components/Home";
import Login from "./components/Login";
import useStore from "./store";
import theme from "./theme";

const ProtectedRoute = ({ children, roles }) => {
  const user = useStore((state) => state.user);
  if (!user || (roles && !roles.includes(user.rol))) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const initializeStore = useStore((state) => state.initializeStore);

  useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["administrador"]}>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/productos"
            element={
              <ProtectedRoute roles={["administrador", "vendedor"]}>
                <Home /> {/* Reutilizando el componente Home para Productos */}
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
