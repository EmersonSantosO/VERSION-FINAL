import React, { useState, useContext } from "react";
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
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);

const Login = () => {
  const { login } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  const formBackground = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const inputBackground = useColorModeValue("gray.100", "gray.600");
  const buttonBackground = useColorModeValue("blue.500", "blue.300");

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password, toast); // Pasa toast a login
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        p="8"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        bg={formBackground}
        width="400px"
      >
        <Heading as="h1" size="lg" textAlign="center" mb="6" color={textColor}>
          Iniciar Sesión
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel htmlFor="email" color={textColor}>
                Email:
              </FormLabel>
              <Input
                id="email"
                {...register("email")}
                placeholder="Email"
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
