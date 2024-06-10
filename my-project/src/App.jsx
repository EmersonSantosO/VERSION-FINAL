import React from "react";
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
      <Router>
        <AppContent />
      </Router>
    </ChakraProvider>
  );
}

function AppContent() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);

  return (
    <>
      <Navbar key={isLoggedIn ? "logged-in" : "logged-out"} />
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
    </>
  );
}

export default App;
