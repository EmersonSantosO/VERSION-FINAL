// src/App.jsx
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ChakraProvider, Spinner } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Admin from "./components/Admin";
import Home from "./components/Home";
import Login from "./components/Login";
import Productos from "./components/Productos";
import Clientes from "./components/Clientes";
import Ventas from "./components/Ventas";
import useStore from "./store";
import theme from "./theme";
import ProtectedRoute from "./components/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  const initializeStore = useStore((state) => state.initializeStore);
  const isLoading = useStore((state) => state.isLoading);

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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
