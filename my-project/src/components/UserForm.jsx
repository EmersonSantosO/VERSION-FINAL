import React, { useState } from "react";
import {
  Box,
  Button,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  useToast,
  useColorModeValue,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import theme from "../theme";

const UserForm = ({ onUserCreated }) => {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors, isSubmitting } = formState;
  const [rut, setRut] = useState("");
  const toast = useToast();

  const onSubmit = async (data) => {
    try {
      const userData = { ...data, rut };
      const response = await axios.post("/usuarios/", userData);
      toast({
        title: "Usuario creado",
        description: "El usuario se ha creado correctamente.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      reset();
      onUserCreated(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un error al crear el usuario.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleRutChange = (event) => {
    const inputRut = event.target.value;
    setRut(inputRut);
  };

  const inputBg = useColorModeValue("gray.100", "gray.700");

  return (
    <Box
      p="8"
      bg={useColorModeValue("white", "gray.800")}
      boxShadow="md"
      borderRadius="md"
    >
      <Heading as="h3" size="lg" mb="4">
        Crear Nuevo Usuario
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="stretch">
          <FormControl id="email" isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              {...register("email", { required: "Este campo es requerido" })}
              bg={inputBg}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="password" isInvalid={errors.password}>
            <FormLabel>Contraseña</FormLabel>
            <Input
              type="password"
              {...register("password", { required: "Este campo es requerido" })}
              bg={inputBg}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="rut" isInvalid={errors.rut}>
            <FormLabel>RUT</FormLabel>
            <Input
              type="text"
              value={rut}
              onChange={handleRutChange}
              {...register("rut", { required: "Este campo es requerido" })}
              bg={inputBg}
            />
            <FormErrorMessage>
              {errors.rut && errors.rut.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="nombre" isInvalid={errors.nombre}>
            <FormLabel>Nombre</FormLabel>
            <Input
              type="text"
              {...register("nombre", { required: "Este campo es requerido" })}
              bg={inputBg}
            />
            <FormErrorMessage>
              {errors.nombre && errors.nombre.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="apellido" isInvalid={errors.apellido}>
            <FormLabel>Apellido</FormLabel>
            <Input
              type="text"
              {...register("apellido", { required: "Este campo es requerido" })}
              bg={inputBg}
            />
            <FormErrorMessage>
              {errors.apellido && errors.apellido.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="telefono" isInvalid={errors.telefono}>
            <FormLabel>Teléfono</FormLabel>
            <Input
              type="text"
              {...register("telefono", { required: "Este campo es requerido" })}
              bg={inputBg}
            />
            <FormErrorMessage>
              {errors.telefono && errors.telefono.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="jornada" isInvalid={errors.jornada}>
            <FormLabel>Jornada</FormLabel>
            <Input
              type="text"
              {...register("jornada", { required: "Este campo es requerido" })}
              bg={inputBg}
            />
            <FormErrorMessage>
              {errors.jornada && errors.jornada.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="rol" isInvalid={errors.rol}>
            <FormLabel>Rol</FormLabel>
            <Input
              type="text"
              {...register("rol", { required: "Este campo es requerido" })}
              bg={inputBg}
            />
            <FormErrorMessage>
              {errors.rol && errors.rol.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            colorScheme="blue"
            type="submit"
            isLoading={isSubmitting}
            width="full"
          >
            Crear Usuario
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default UserForm;
