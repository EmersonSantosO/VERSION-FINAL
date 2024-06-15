// src/components/Ventas.jsx
import React from "react";
import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import VentaForm from "./VentaForm";
import VentaList from "./VentaList";
import theme from "../theme";

const Ventas = () => {
  return (
    <Box
      p="8"
      bg={useColorModeValue(
        theme.colors.background.light,
        theme.colors.background.dark
      )}
      color={useColorModeValue(theme.colors.text.light, theme.colors.text.dark)}
    >
      <Heading as="h1" size="xl" mb="8">
        Gestión de Ventas
      </Heading>
      <VentaForm />
      <VentaList />
    </Box>
  );
};

export default Ventas;
