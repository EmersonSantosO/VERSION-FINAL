import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ChakraProvider, Spinner } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Admin from "./components/Admin";
import Home from "./components/Home";
import Login from "./components/Login";
import Productos from "./components/Productos";
import Clientes from "./components/Clientes";
import Ventas from "./components/Ventas";
import Usuarios from "./components/Usuarios";
import useStore from "./store";
import theme from "./theme";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
  const { initializeStore, isLoading } = useStore(); // Desestructuración

  useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  if (isLoading) {
    return <Spinner size="xl" />;
  }

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Navbar />
          <Routes>
            {/* Rutas protegidas */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
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
                  <Productos />
                </ProtectedRoute>
              }
            />
            <Route
              path="/clientes"
              element={
                <ProtectedRoute roles={["administrador", "vendedor"]}>
                  <Clientes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ventas"
              element={
                <ProtectedRoute roles={["administrador", "vendedor"]}>
                  <Ventas />
                </ProtectedRoute>
              }
            />
            <Route
              path="/usuarios"
              element={
                <ProtectedRoute roles={["administrador"]}>
                  <Usuarios />
                </ProtectedRoute>
              }
            />
            {/* Ruta de login */}
            <Route path="/login" element={<Login />} />
            {/* Ruta por defecto */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
