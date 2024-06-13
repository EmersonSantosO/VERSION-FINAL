import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Flex,
  useColorModeValue,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useStore from "../store";
import theme from "../theme";

const MotionBox = motion(Box);

const Login = () => {
  const login = useStore((state) => state.login);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate(); // Añadido aquí
  const [showPassword, setShowPassword] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  const formBackground = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const inputBackground = useColorModeValue("gray.100", "gray.600");
  const buttonBackground = useColorModeValue("blue.500", "blue.300");

  const onSubmit = async (data) => {
    try {
      await login(data.username, data.password, toast, navigate); // Añadido navigate aquí
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      toast({
        title: "Error",
        description: "Credenciales inválidas. Por favor, inténtalo de nuevo.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
      bg={useColorModeValue("gray.100", "gray.900")}
    >
      <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        p="8"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="lg"
        bg={formBackground}
        width="400px"
      >
        <Heading as="h1" size="lg" textAlign="center" mb="6" color={textColor}>
          Iniciar Sesión
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel htmlFor="username" color={textColor}>
                Nombre de usuario:
              </FormLabel>
              <Input
                id="username"
                {...register("username")}
                placeholder="Nombre de usuario"
                bg={inputBackground}
                color={textColor}
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "outline",
                }}
                transition="all 0.2s ease-in-out"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password" color={textColor}>
                Contraseña:
              </FormLabel>
              <Input
                id="password"
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                bg={inputBackground}
                color={textColor}
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "outline",
                }}
                transition="all 0.2s ease-in-out"
              />
              <Button
                type="button"
                mt="2"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                color={textColor}
                variant="link"
              >
                {showPassword ? "Ocultar" : "Mostrar"} contraseña
              </Button>
            </FormControl>
            <Button
              colorScheme="blue"
              type="submit"
              bg={buttonBackground}
              _hover={{
                bg: useColorModeValue("blue.600", "blue.200"),
              }}
              transition="all 0.2s ease-in-out"
            >
              Iniciar Sesión
            </Button>
          </VStack>
        </form>

        <Button
          onClick={toggleColorMode}
          position="absolute"
          top="2"
          right="2"
          variant="ghost"
        >
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </MotionBox>
    </Flex>
  );
};

export default Login;
