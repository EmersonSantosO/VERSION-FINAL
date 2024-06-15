// src/components/ClienteForm.jsx
import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import useStore from "../store";
import theme from "../theme";

const ClienteForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const toast = useToast();
  const addCliente = useStore((state) => state.addCliente); // Método para añadir clientes

  const bgColor = useColorModeValue(
    theme.colors.background.light,
    theme.colors.background.dark
  );
  const textColor = useColorModeValue(
    theme.colors.text.light,
    theme.colors.text.dark
  );

  const onSubmit = (data) => {
    addCliente(data);
    toast({
      title: "Cliente registrado",
      description: "El cliente ha sido registrado correctamente.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    reset();
  };

  return (
    <Box p="8" bg={bgColor} color={textColor}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="stretch">
          <FormControl isInvalid={errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              placeholder="Email"
              {...register("email", { required: "Este campo es requerido" })}
            />
          </FormControl>
          <FormControl isInvalid={errors.nombre}>
            <FormLabel htmlFor="nombre">Nombre</FormLabel>
            <Input id="nombre" placeholder="Nombre" {...register("nombre")} />
          </FormControl>
          <FormControl isInvalid={errors.apellido}>
            <FormLabel htmlFor="apellido">Apellido</FormLabel>
            <Input
              id="apellido"
              placeholder="Apellido"
              {...register("apellido")}
            />
          </FormControl>
          <FormControl isInvalid={errors.rut}>
            <FormLabel htmlFor="rut">RUT</FormLabel>
            <Input id="rut" placeholder="RUT" {...register("rut")} />
          </FormControl>
          <FormControl isInvalid={errors.telefono}>
            <FormLabel htmlFor="telefono">Teléfono</FormLabel>
            <Input
              id="telefono"
              placeholder="Teléfono"
              {...register("telefono")}
            />
          </FormControl>
          <FormControl isInvalid={errors.direccion}>
            <FormLabel htmlFor="direccion">Dirección</FormLabel>
            <Input
              id="direccion"
              placeholder="Dirección"
              {...register("direccion")}
            />
          </FormControl>
          <Button colorScheme="blue" type="submit" isLoading={isSubmitting}>
            Registrar Cliente
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default ClienteForm;
