import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Spacer,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import useStore from "../store";
import UIContext from "../context/UIContext";

const Navbar = () => {
  const user = useStore((state) => state.user);
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const logout = useStore((state) => state.logout);
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const { isNavbarUpdated } = useContext(UIContext); // Accede al contexto
  const { updateNavbar } = useContext(UIContext);
  const navbarNeedsUpdate = useStore((state) => state.navbarNeedsUpdate);

  const bgColor = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const buttonBg = useColorModeValue("blue.500", "blue.300");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    if (navbarNeedsUpdate) {
      updateNavbar();
      // Restablecer el estado para evitar actualizaciones innecesarias
      useStore.setState({ navbarNeedsUpdate: false });
    }
  }, [navbarNeedsUpdate, updateNavbar]);

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
      {user && isLoggedIn && (
        <Box>
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
          {(user.rol === "administrador" || user.rol === "vendedor") && (
            <Link to="/productos/nuevo" mx="2">
              Crear Producto
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
      )}
      {!user && !isLoggedIn && (
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
