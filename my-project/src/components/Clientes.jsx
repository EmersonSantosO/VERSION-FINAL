// src/components/Clientes.jsx
import React from "react";
import {
  Box,
  Heading,
  useDisclosure,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
  FormErrorMessage,
} from "@chakra-ui/react";
import useStore from "../store";
import { useForm } from "react-hook-form";
import theme from "../theme";

const Clientes = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors, isSubmitting } = formState;
  const addCliente = useStore((state) => state.addCliente);

  const createCliente = async (data) => {
    try {
      addCliente(data);
      reset();
      onClose();
    } catch (error) {
      console.error("Error al agregar cliente:", error);
    }
  };

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
        Gestión de Clientes
      </Heading>
      <Button colorScheme="blue" onClick={onOpen}>
        Nuevo Cliente
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crear Nuevo Cliente</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(createCliente)}>
              <VStack spacing={4}>
                <FormControl isInvalid={errors.email}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    placeholder="Email"
                    {...register("email", {
                      required: "Este campo es requerido",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="nombre">Nombre</FormLabel>
                  <Input
                    id="nombre"
                    placeholder="Nombre"
                    {...register("nombre")}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="apellido">Apellido</FormLabel>
                  <Input
                    id="apellido"
                    placeholder="Apellido"
                    {...register("apellido")}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="rut">RUT</FormLabel>
                  <Input id="rut" placeholder="RUT" {...register("rut")} />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="telefono">Teléfono</FormLabel>
                  <Input
                    id="telefono"
                    placeholder="Teléfono"
                    {...register("telefono")}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="direccion">Dirección</FormLabel>
                  <Input
                    id="direccion"
                    placeholder="Dirección"
                    {...register("direccion")}
                  />
                </FormControl>
                <Button
                  colorScheme="blue"
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Guardar
                </Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Clientes;
