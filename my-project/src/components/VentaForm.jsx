// src/components/VentaForm.jsx
import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import useStore from "../store";
import theme from "../theme";

const VentaForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const toast = useToast();
  const addVenta = useStore((state) => state.addVenta); // Método para añadir ventas

  const bgColor = useColorModeValue(
    theme.colors.background.light,
    theme.colors.background.dark
  );
  const textColor = useColorModeValue(
    theme.colors.text.light,
    theme.colors.text.dark
  );

  const onSubmit = (data) => {
    addVenta(data);
    toast({
      title: "Venta registrada",
      description: "La venta ha sido registrada correctamente.",
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
          <FormControl isInvalid={errors.producto}>
            <FormLabel htmlFor="producto">Producto</FormLabel>
            <Input
              id="producto"
              placeholder="Producto"
              {...register("producto", { required: "Este campo es requerido" })}
            />
          </FormControl>
          <FormControl isInvalid={errors.cliente}>
            <FormLabel htmlFor="cliente">Cliente</FormLabel>
            <Input
              id="cliente"
              placeholder="Cliente"
              {...register("cliente", { required: "Este campo es requerido" })}
            />
          </FormControl>
          <FormControl isInvalid={errors.cantidad}>
            <FormLabel htmlFor="cantidad">Cantidad</FormLabel>
            <Input
              id="cantidad"
              type="number"
              placeholder="Cantidad"
              {...register("cantidad", { required: "Este campo es requerido" })}
            />
          </FormControl>
          <FormControl isInvalid={errors.total}>
            <FormLabel htmlFor="total">Total</FormLabel>
            <Input
              id="total"
              type="number"
              placeholder="Total"
              {...register("total", { required: "Este campo es requerido" })}
            />
          </FormControl>
          <Button colorScheme="blue" type="submit" isLoading={isSubmitting}>
            Registrar Venta
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default VentaForm;
