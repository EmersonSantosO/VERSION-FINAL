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
  IconButton,
  Collapse,
  VStack,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import useStore from "../store";
import logo from "../assets/logo (2).svg";

const Navbar = () => {
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();
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
    <Box>
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
          <Box fontWeight="bold" cursor="pointer" onClick={() => navigate("/")}>
            Aplicación Bazar
          </Box>
        </Flex>
        <Spacer />
        <HStack display={{ base: "none", md: "flex" }}>
          {user ? (
            <>
              <Button
                mx="2"
                variant="ghost"
                onClick={() => navigate("/productos")}
                _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
              >
                Productos
              </Button>
              <Button
                mx="2"
                variant="ghost"
                onClick={() => navigate("/clientes")}
                _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
              >
                Clientes
              </Button>
              <Button
                mx="2"
                variant="ghost"
                onClick={() => navigate("/ventas")}
                _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
              >
                Ventas
              </Button>
              {user.rol === "administrador" && (
                <Button
                  mx="2"
                  variant="ghost"
                  onClick={() => navigate("/usuarios")}
                  _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
                >
                  Usuarios
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
            </>
          ) : (
            location.pathname !== "/login" && (
              <Button
                onClick={() => navigate("/login")}
                colorScheme="blue"
                bg={buttonBg}
                _hover={{
                  bg: useColorModeValue("blue.600", "blue.200"),
                }}
              >
                Iniciar sesión
              </Button>
            )
          )}
          <Button onClick={toggleColorMode} ml="4" variant="ghost">
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </HStack>
        <IconButton
          aria-label="Toggle Navigation"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ base: "flex", md: "none" }}
          onClick={onToggle}
        />
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <VStack
          bg={bgColor}
          color={textColor}
          display={{ md: "none" }}
          p={4}
          spacing={4}
        >
          {user ? (
            <>
              <Button
                w="full"
                variant="ghost"
                onClick={() => {
                  navigate("/productos");
                  onToggle();
                }}
                _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
              >
                Productos
              </Button>
              <Button
                w="full"
                variant="ghost"
                onClick={() => {
                  navigate("/clientes");
                  onToggle();
                }}
                _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
              >
                Clientes
              </Button>
              <Button
                w="full"
                variant="ghost"
                onClick={() => {
                  navigate("/ventas");
                  onToggle();
                }}
                _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
              >
                Ventas
              </Button>
              {user.rol === "administrador" && (
                <Button
                  w="full"
                  variant="ghost"
                  onClick={() => {
                    navigate("/usuarios");
                    onToggle();
                  }}
                  _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
                >
                  Usuarios
                </Button>
              )}
              <Button
                w="full"
                onClick={() => {
                  handleLogout();
                  onToggle();
                }}
                colorScheme="blue"
                bg={buttonBg}
                _hover={{
                  bg: useColorModeValue("blue.600", "blue.200"),
                }}
              >
                Cerrar sesión
              </Button>
            </>
          ) : (
            location.pathname !== "/login" && (
              <Button
                w="full"
                colorScheme="blue"
                bg={buttonBg}
                onClick={() => {
                  navigate("/login");
                  onToggle();
                }}
                _hover={{
                  bg: useColorModeValue("blue.600", "blue.200"),
                }}
              >
                Iniciar sesión
              </Button>
            )
          )}
          <Button onClick={toggleColorMode} variant="ghost">
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </VStack>
      </Collapse>
    </Box>
  );
};

export default Navbar;
