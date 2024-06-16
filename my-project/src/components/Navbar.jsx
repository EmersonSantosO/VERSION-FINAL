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

  // Llamadas a useColorModeValue fuera del condicional
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
          <Box fontWeight="bold">
            <Link to="/">Aplicación Bazar</Link>
          </Box>
        </Flex>
        <Spacer />
        <HStack display={{ base: "none", md: "flex" }}>
          {user ? (
            <>
              <Link to="/productos">
                <Button
                  mx="2"
                  variant="ghost"
                  _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
                >
                  Productos
                </Button>
              </Link>
              <Link to="/clientes">
                <Button
                  mx="2"
                  variant="ghost"
                  _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
                >
                  Clientes
                </Button>
              </Link>
              <Link to="/ventas">
                <Button
                  mx="2"
                  variant="ghost"
                  _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
                >
                  Ventas
                </Button>
              </Link>
              {user.rol === "administrador" && (
                <Link to="/usuarios">
                  <Button
                    mx="2"
                    variant="ghost"
                    _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
                  >
                    Usuarios
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
            </>
          ) : (
            location.pathname !== "/login" && (
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
              <Link to="/productos">
                <Button
                  w="full"
                  variant="ghost"
                  onClick={onToggle}
                  _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
                >
                  Productos
                </Button>
              </Link>
              <Link to="/clientes">
                <Button
                  w="full"
                  variant="ghost"
                  onClick={onToggle}
                  _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
                >
                  Clientes
                </Button>
              </Link>
              <Link to="/ventas">
                <Button
                  w="full"
                  variant="ghost"
                  onClick={onToggle}
                  _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
                >
                  Ventas
                </Button>
              </Link>
              {user.rol === "administrador" && (
                <Link to="/usuarios">
                  <Button
                    w="full"
                    variant="ghost"
                    onClick={onToggle}
                    _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
                  >
                    Usuarios
                  </Button>
                </Link>
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
              <Link to="/login">
                <Button
                  w="full"
                  colorScheme="blue"
                  bg={buttonBg}
                  onClick={onToggle}
                  _hover={{
                    bg: useColorModeValue("blue.600", "blue.200"),
                  }}
                >
                  Iniciar sesión
                </Button>
              </Link>
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
