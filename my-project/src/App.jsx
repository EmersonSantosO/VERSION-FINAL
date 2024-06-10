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
import ProductForm from "./components/ProductForm";
import UserManagement from "./components/UserManagement";
import useStore from "./store";

// Componente para rutas protegidas
const ProtectedRoute = ({ children, roles }) => {
  const user = useStore((state) => state.user);
  if (!user || (roles && !roles.includes(user.rol))) {
    return <Navigate to="/login" replace />; // Usar 'replace' para evitar duplicados en el historial
  }
  return children;
};

function App() {
  const initializeStore = useStore((state) => state.initializeStore);

  useEffect(() => {
    initializeStore();
  }, []);

  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
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
            path="/productos/nuevo"
            element={
              <ProtectedRoute roles={["administrador", "vendedor"]}>
                <ProductForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/usuarios"
            element={
              <ProtectedRoute roles={["administrador"]}>
                <UserManagement />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
