import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Admin from "./components/Admin";
import Home from "./components/Home";
import Login from "./components/Login";
import ProductForm from "./components/ProductForm";
import UserManagement from "./components/UserManagement";

const ProtectedRoute = ({ children, roles }) => {
  const { user } = React.useContext(AuthContext);

  if (!user || (roles && !roles.includes(user.rol))) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
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
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
