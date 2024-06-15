// src/components/ClienteForm.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useColorModeValue,
  useToast,
  FormErrorMessage,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import useStore from "../store";
import theme from "../theme";

const ClienteForm = ({ isOpen, onClose }) => {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors, isSubmitting } = formState;
  const toast = useToast();
  const addCliente = useStore((state) => state.addCliente);

  const bgColor = useColorModeValue(
    theme.colors.background.light,
    theme.colors.background.dark
  );
  const textColor = useColorModeValue(
    theme.colors.text.light,
    theme.colors.text.dark
  );
  const buttonBg = useColorModeValue("brand.500", "brand.200");

  const createCliente = async (data) => {
    try {
      addCliente(data);
      toast({
        title: "Cliente creado",
        description: "El cliente se ha creado correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      reset();
      onClose(); // Cierra el modal al guardar el cliente
    } catch (error) {
      console.error("Error al crear el cliente:", error);
      toast({
        title: "Error",
        description: "Hubo un error al crear el cliente.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Nuevo Cliente</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box p="8" bg={bgColor} color={textColor}>
            <form onSubmit={handleSubmit(createCliente)}>
              <VStack spacing={4} align="stretch">
                <InputComponent
                  label="Email"
                  id="email"
                  placeholder="Email del cliente"
                  error={errors.email}
                  register={register("email", {
                    required: "Este campo es requerido",
                  })}
                />
                <InputComponent
                  label="Nombre"
                  id="nombre"
                  placeholder="Nombre del cliente"
                  error={errors.nombre}
                  register={register("nombre")}
                />
                <InputComponent
                  label="Apellido"
                  id="apellido"
                  placeholder="Apellido del cliente"
                  error={errors.apellido}
                  register={register("apellido")}
                />
                <InputComponent
                  label="RUT"
                  id="rut"
                  placeholder="RUT del cliente"
                  error={errors.rut}
                  register={register("rut")}
                />
                <InputComponent
                  label="Teléfono"
                  id="telefono"
                  placeholder="Teléfono del cliente"
                  error={errors.telefono}
                  register={register("telefono")}
                />
                <InputComponent
                  label="Dirección"
                  id="direccion"
                  placeholder="Dirección del cliente"
                  error={errors.direccion}
                  register={register("direccion")}
                />
                <Button
                  colorScheme="blue"
                  type="submit"
                  bg={buttonBg}
                  _hover={{ bg: useColorModeValue("brand.600", "brand.300") }}
                  isLoading={isSubmitting}
                >
                  Guardar
                </Button>
              </VStack>
            </form>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const InputComponent = ({
  label,
  id,
  placeholder,
  error,
  register,
  ...rest
}) => (
  <FormControl isInvalid={error}>
    <FormLabel htmlFor={id}>{label}:</FormLabel>
    <Input id={id} placeholder={placeholder} {...register} {...rest} />
    <FormErrorMessage>{error && error.message}</FormErrorMessage>
  </FormControl>
);

export default ClienteForm;
