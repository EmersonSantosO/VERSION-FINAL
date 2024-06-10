// component/Login.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import axios from "axios";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Limpia el error anterior

    try {
      const response = await axios.post(
        "http://localhost:8000/api/api-token-auth/",
        {
          username: email, // Asegúrate de que el backend espera 'username'
          password,
        }
      );

      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Token ${response.data.token}`;
    } catch (error) {
      setError("Credenciales inválidas");
      console.error("Error en el inicio de sesión:", error);
    }
  };

  return (
    <Box
      w="400px"
      mx="auto"
      mt="20"
      p="8"
      borderWidth="1px"
      borderRadius="md"
      boxShadow="sm"
    >
      <Heading as="h2" size="lg" mb="4" textAlign="center">
        Iniciar Sesión
      </Heading>
      <form onSubmit={handleLogin}>
        <VStack spacing={4} align="stretch">
          <FormControl isInvalid={!!error}>
            <FormLabel htmlFor="email">Email:</FormLabel>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu correo electrónico"
            />
          </FormControl>
          <FormControl isInvalid={!!error}>
            <FormLabel htmlFor="password">Contraseña:</FormLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tu contraseña"
            />
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
          <Button type="submit" colorScheme="brand" width="100%">
            Ingresar
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;
