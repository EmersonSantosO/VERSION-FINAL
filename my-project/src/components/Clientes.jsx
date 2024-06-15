// src/components/Clientes.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import ClienteForm from "./ClienteForm";
import ClienteList from "./ClienteList";
import theme from "../theme";

const Clientes = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Box p="8" bg={bgColor} color={textColor}>
      <Heading as="h1" size="xl" mb="8">
        Gestión de Clientes
      </Heading>
      <Button onClick={onOpen} colorScheme="blue" mb="4">
        Nuevo Cliente
      </Button>
      <ClienteForm isOpen={isOpen} onClose={onClose} />
      <ClienteList />
    </Box>
  );
};

export default Clientes;
