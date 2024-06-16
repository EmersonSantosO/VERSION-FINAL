import React, { useState } from "react";
import { Box, Button, Heading, useColorModeValue } from "@chakra-ui/react";
import ClienteForm from "./ClienteForm";
import ClienteList from "./ClienteList";
import useStore from "../store";
import theme from "../theme";

const Clientes = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const clientes = useStore((state) => state.clientes); // Obtener los clientes del estado local
  const addCliente = useStore((state) => state.addCliente);
  const deleteCliente = useStore((state) => state.deleteCliente);

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
        Gestión de Clientes
      </Heading>
      <Button colorScheme="blue" onClick={handleOpenForm} mb="8">
        Nuevo Cliente
      </Button>
      <ClienteForm isOpen={isFormOpen} onClose={handleCloseForm} />
      <ClienteList clientes={clientes} deleteCliente={deleteCliente} />
    </Box>
  );
};

export default Clientes;
