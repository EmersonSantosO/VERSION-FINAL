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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import useStore from "../store";

const VentaForm = ({ isOpen, onClose }) => {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors, isSubmitting } = formState;
  const toast = useToast();
  const addVenta = useStore((state) => state.addVenta);

  const createVenta = (data) => {
    addVenta(data);
    toast({
      title: "Venta creada",
      description: "La venta se ha creado correctamente.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Nueva Venta</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box p="8">
            <form onSubmit={handleSubmit(createVenta)}>
              <VStack spacing={4} align="stretch">
                <FormControl isInvalid={errors.producto}>
                  <FormLabel htmlFor="producto">Producto</FormLabel>
                  <Select
                    id="producto"
                    placeholder="Selecciona un producto"
                    {...register("producto", {
                      required: "Este campo es requerido",
                    })}
                  >
                    {/* Agrega tus opciones de productos aquí */}
                  </Select>
                  <FormErrorMessage>
                    {errors.producto && errors.producto.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.cantidad}>
                  <FormLabel htmlFor="cantidad">Cantidad</FormLabel>
                  <Input
                    id="cantidad"
                    type="number"
                    {...register("cantidad", {
                      required: "Este campo es requerido",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.cantidad && errors.cantidad.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.total}>
                  <FormLabel htmlFor="total">Total</FormLabel>
                  <Input
                    id="total"
                    type="number"
                    {...register("total", {
                      required: "Este campo es requerido",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.total && errors.total.message}
                  </FormErrorMessage>
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
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default VentaForm;
