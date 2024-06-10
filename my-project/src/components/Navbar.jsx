import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Spacer,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { colorMode, toggleColorMode } = useColorMode();

  const bgColor = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const buttonBg = useColorModeValue("blue.500", "blue.300");

  return (
    <Flex
      as="nav"
      p="4"
      bg={bgColor}
      color={textColor}
      alignItems="center"
      boxShadow="md"
    >
      <Box fontWeight="bold">
        <Link to="/">Bazar App</Link>
      </Box>
      <Spacer />
      {user ? (
        <>
          {user.rol === "administrador" && (
            <Box mx="2">
              <Link to="/admin">Administración</Link>
            </Box>
          )}
          {user.rol === "administrador" && (
            <Box mx="2">
              <Link to="/usuarios">Gestionar Usuarios</Link>
            </Box>
          )}
          {(user.rol === "administrador" || user.rol === "vendedor") && (
            <Box mx="2">
              <Link to="/productos/nuevo">Crear Producto</Link>
            </Box>
          )}
          <Box>
            <Button
              onClick={logout}
              colorScheme="blue"
              bg={buttonBg}
              _hover={{
                bg: useColorModeValue("blue.600", "blue.200"),
              }}
            >
              Cerrar sesión
            </Button>
          </Box>
        </>
      ) : (
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
      <Button onClick={toggleColorMode} ml="4" variant="ghost">
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </Button>
    </Flex>
  );
};

export default Navbar;
