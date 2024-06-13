// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  useColorModeValue,
  useColorMode,
  Image,
  Spacer,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import useStore from "../store";
import logo from "../assets/logo (2).svg";

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
        <Image src={logo} alt="Logo" boxSize="50px" mr="2" />
        <Box fontWeight="bold">
          <Link to="/">Aplicación Bazar</Link>
        </Box>
      </Flex>
      <Spacer />

      {user ? (
        <Box>
          {user.rol === "administrador" && (
            <>
              <Link to="/admin">
                <Button
                  mx="2"
                  variant="ghost"
                  _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
                >
                  Administración
                </Button>
              </Link>
              <Link to="/usuarios">
                <Button
                  mx="2"
                  variant="ghost"
                  _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
                >
                  Gestionar Usuarios
                </Button>
              </Link>
            </>
          )}
          {(user.rol === "administrador" || user.rol === "vendedor") && (
            <Link to="/productos/nuevo">
              <Button
                mx="2"
                variant="ghost"
                _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
              >
                Crear Producto
              </Button>
            </Link>
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
        </Box>
      ) : (
        location.pathname !== "/login" && (
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
        )
      )}

      <Button onClick={toggleColorMode} ml="4" variant="ghost">
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </Button>
    </Flex>
  );
};

export default Navbar;
