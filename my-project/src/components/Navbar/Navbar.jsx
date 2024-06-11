import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Spacer,
  useColorModeValue,
  useColorMode,
  Heading,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import useStore from "../../store";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const location = useLocation();

  const bgColor = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const buttonBg = useColorModeValue("blue.500", "blue.300");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const [isAdmin, setIsAdmin] = useState(false);
  const [isStaff, setIsStaff] = useState(false);

  // Decodifica el token JWT dentro de un useEffect
  useEffect(() => {
    if (user && user.token) {
      const tokenToDecode = user.token.startsWith("Bearer ")
        ? user.token.split(" ")[1]
        : user.token;
      const decodedToken = jwtDecode(tokenToDecode);
      setIsAdmin(decodedToken.is_superuser);
      setIsStaff(decodedToken.is_staff);
    }
  }, [user]);

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
        <Heading as="h3" size="md" fontWeight="bold">
          <Link to="/">Aplicación Bazar</Link>
        </Heading>
      </Flex>
      <Spacer />

      {user && (
        <Flex alignItems="center">
          {/* Opciones para administradores */}
          {isAdmin && (
            <>
              <Button
                as={Link}
                to="/admin"
                mx="2"
                colorScheme="teal"
                variant="solid"
                size="sm"
              >
                Administración (Django)
              </Button>
              <Button
                as={Link}
                to="/usuarios"
                mx="2"
                colorScheme="teal"
                variant="solid"
                size="sm"
              >
                Gestionar Usuarios
              </Button>
            </>
          )}

          {/* Opciones para administradores y staff */}
          {(isAdmin || isStaff) && (
            <Button
              as={Link}
              to="/productos/nuevo"
              mx="2"
              colorScheme="teal"
              variant="solid"
              size="sm"
            >
              Crear Producto
            </Button>
          )}

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
        </Flex>
      )}

      {/* Mostrar botón de inicio de sesión solo si el usuario no está autenticado y no está en la página de inicio de sesión */}
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

      {/* Botón para cambiar el modo de color */}
      <Button onClick={toggleColorMode} ml="4" variant="ghost">
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </Button>
    </Flex>
  );
};

export default Navbar;
