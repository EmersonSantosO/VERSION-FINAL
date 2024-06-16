import React, { useState } from "react";
import { Box, Button, Heading, useColorModeValue } from "@chakra-ui/react";
import VentaForm from "./VentaForm";
import VentaList from "./VentaList";
import theme from "../theme";

const Ventas = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const bgColor = useColorModeValue(
    theme.colors.background.light,
    theme.colors.background.dark
  );
  const textColor = useColorModeValue(
    theme.colors.text.light,
    theme.colors.text.dark
  );

  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => setIsFormOpen(false);

  return (
    <Box p="8" bg={bgColor} color={textColor}>
      <Heading as="h1" size="xl" mb="8">
        Gestión de Ventas
      </Heading>
      <Button colorScheme="blue" onClick={handleOpenForm} mb="8">
        Nueva Venta
      </Button>
      <VentaForm isOpen={isFormOpen} onClose={handleCloseForm} />
      <VentaList />
    </Box>
  );
};

export default Ventas;
