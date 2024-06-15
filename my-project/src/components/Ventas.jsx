// src/components/Ventas.jsx
import React from "react";
import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import VentaForm from "./VentaForm";
import VentaList from "./VentaList";

const Ventas = () => {
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Box p="8" bg={bgColor} color={textColor}>
      <Heading as="h1" size="xl" mb="8">
        Gestión de Ventas
      </Heading>
      <VentaForm />
      <VentaList />
    </Box>
  );
};

export default Ventas;
