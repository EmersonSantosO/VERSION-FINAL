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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormErrorMessage,
} from "@chakra-ui/react";
import useStore from "../store";

const ClienteForm = ({ isOpen, onClose }) => {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors, isSubmitting } = formState;
  const toast = useToast();
  const addCliente = useStore((state) => state.addCliente);

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
          <Box p="8">
            <form onSubmit={handleSubmit(createCliente)}>
              <VStack spacing={4} align="stretch">
                <FormControl isInvalid={errors.email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    id="email"
                    placeholder="Email del cliente"
                    {...register("email", {
                      required: "Este campo es requerido",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.nombre}>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    id="nombre"
                    placeholder="Nombre del cliente"
                    {...register("nombre", {
                      required: "Este campo es requerido",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.nombre && errors.nombre.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.apellido}>
                  <FormLabel>Apellido</FormLabel>
                  <Input
                    id="apellido"
                    placeholder="Apellido del cliente"
                    {...register("apellido", {
                      required: "Este campo es requerido",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.apellido && errors.apellido.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.rut}>
                  <FormLabel>RUT</FormLabel>
                  <Input
                    id="rut"
                    placeholder="RUT del cliente"
                    {...register("rut", {
                      required: "Este campo es requerido",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.rut && errors.rut.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.telefono}>
                  <FormLabel>Teléfono</FormLabel>
                  <Input
                    id="telefono"
                    placeholder="Teléfono del cliente"
                    {...register("telefono", {
                      required: "Este campo es requerido",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.telefono && errors.telefono.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.direccion}>
                  <FormLabel>Dirección</FormLabel>
                  <Input
                    id="direccion"
                    placeholder="Dirección del cliente"
                    {...register("direccion", {
                      required: "Este campo es requerido",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.direccion && errors.direccion.message}
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

export default ClienteForm;
