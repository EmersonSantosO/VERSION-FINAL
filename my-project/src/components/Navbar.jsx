import React, { useContext } from "react";
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Button,
  useColorMode,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { logout, user } = useContext(AuthContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box bg={colorMode === "light" ? "white" : "gray.800"} px={4} py={2}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Heading
          as="h1"
          size="lg"
          color={colorMode === "light" ? "gray.800" : "white"}
        >
          <Link to="/home">Tu App</Link>
        </Heading>
        <Flex alignItems={"center"}>
          <IconButton
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            mr={4}
          />
          {user && (
            <>
              <Button colorScheme="brand" variant="outline" mr={4}>
                {user.nombre}
              </Button>
              <Button colorScheme="red" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
