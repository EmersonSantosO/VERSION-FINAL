import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Spacer,
  useColorModeValue,
  useColorMode,
  Icon,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import useStore from "../store";

const Navbar = () => {
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const location = useLocation(); // Obtiene la ubicación actual

  const bgColor = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const buttonBg = useColorModeValue("blue.500", "blue.300");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Flex
      as="nav"
      p="4"
      bg={bgColor}
      color={textColor}
      alignItems="center"
      boxShadow="md"
    >
      <Flex alignItems="center">
        <Box fontWeight="bold">
          <Link to="/">Aplicación Bazar</Link>
        </Box>
      </Flex>
      <Spacer />

      {/* Menú para usuarios autenticados */}
      {user && (
        <Box>
          {/* Enlaces para administradores */}
          {user.rol === "administrador" && (
            <>
              <Link to="/admin" mx="2">
                Administración
              </Link>
              <Link to="/usuarios" mx="2">
                Gestionar Usuarios
              </Link>
            </>
          )}

          {/* Enlaces para administradores y vendedores */}
          {(user.rol === "administrador" || user.rol === "vendedor") && (
            <Link to="/productos/nuevo" mx="2">
              Crear Producto
            </Link>
          )}

          {/* Botón de cerrar sesión */}
          <Button
            onClick={handleLogout}
            colorScheme="blue"
            bg={buttonBg}
            _hover={{
              bg: useColorModeValue("blue.600", "blue.200"),
            }}
            ml="4"
          >
            Cerrar sesión
          </Button>
        </Box>
      )}

      {/* Botón de iniciar sesión para usuarios no autenticados */}
      {!user && location.pathname !== "/login" && (
        <Box>
          <Link to="/login">
            <Button
              colorScheme="blue"
              bg={buttonBg}
              _hover={{
                bg: useColorModeValue("blue.600", "blue.200"),
              }}
            >
              Iniciar sesión
            </Button>
          </Link>
        </Box>
      )}

      {/* Botón de cambio de modo de color */}
      <Button onClick={toggleColorMode} ml="4" variant="ghost">
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </Button>
    </Flex>
  );
};

export default Navbar;
