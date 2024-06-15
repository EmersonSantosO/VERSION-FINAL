// src/components/Productos.jsx
import React from "react";
import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

const Productos = () => {
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Box p="8" bg={bgColor} color={textColor}>
      <Heading as="h1" size="xl" mb="8">
        Gestión de Productos
      </Heading>
      <ProductForm />
      <ProductList />
    </Box>
  );
};

export default Productos;
