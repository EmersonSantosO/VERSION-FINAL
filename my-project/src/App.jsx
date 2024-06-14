import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ChakraProvider, Spinner } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Admin from "./components/Admin";
import Home from "./components/Home";
import Login from "./components/Login";
import useStore from "./store";
import theme from "./theme";
import ProtectedRoute from "./components/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";

// Crear una instancia de QueryClient
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
                  <Home />{" "}
                  {/* Reutilizando el componente Home para Productos */}
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
