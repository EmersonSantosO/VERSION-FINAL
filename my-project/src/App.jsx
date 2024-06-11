import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar/Navbar";
import Admin from "./components/Admin/Admin";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import ProductForm from "./components/ProductForm/ProductForm";
import UserManagement from "./components/UserManagement/UserManagement";
import useStore from "./store";
import theme from "./theme";

// Componente para rutas protegidas
const ProtectedRoute = ({ children, roles }) => {
  const user = useStore((state) => state.user);
  // Verificar si el usuario está autenticado y si tiene el rol adecuado
  if (!user || (roles && !roles.includes(user.rol))) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const initializeStore = useStore((state) => state.initializeStore);

  useEffect(() => {
    // Inicializar el store al cargar la aplicación
    initializeStore();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Navbar /> {/* Mostrar la barra de navegación en todas las rutas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Ruta protegida para la sección de administración */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["administrador"]}>
                <Admin />
              </ProtectedRoute>
            }
          />

          {/* Ruta protegida para crear productos */}
          <Route
            path="/productos/nuevo"
            element={
              <ProtectedRoute roles={["administrador", "vendedor"]}>
                <ProductForm />
              </ProtectedRoute>
            }
          />

          {/* Ruta protegida para gestionar usuarios */}
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
