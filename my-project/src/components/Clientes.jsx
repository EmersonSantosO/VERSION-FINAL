// src/components/Clientes.jsx
import React from "react";
import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import ClienteForm from "./ClienteForm";
import ClienteList from "./ClienteList";

const Clientes = () => {
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Box p="8" bg={bgColor} color={textColor}>
      <Heading as="h1" size="xl" mb="8">
        Gestión de Clientes
      </Heading>
      <ClienteForm />
      <ClienteList />
    </Box>
  );
};

export default Clientes;
