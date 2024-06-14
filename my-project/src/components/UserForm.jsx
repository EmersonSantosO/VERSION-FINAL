import React, { useState } from "react";
import {
  Box,
  Button,
  VStack,
  Heading,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import theme from "../theme";
import { formatRut } from "../utils/formatRut";
import InputComponent from "./common/InputComponent";
import SelectComponent from "./common/SelectComponent";

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
      setRut(""); // Resetea el campo RUT
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
    const formattedRut = formatRut(inputRut);
    setRut(formattedRut);
  };

  const formBackground = useColorModeValue("white", "gray.700");
  const inputBg = useColorModeValue("gray.100", "gray.600");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Box
      p="8"
      bg={formBackground}
      boxShadow="md"
      borderRadius="md"
      width="400px"
      mx="auto"
    >
      <Heading as="h3" size="lg" mb="4" color={textColor}>
        Crear Nuevo Usuario
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="stretch">
          <InputComponent
            label="Email"
            id="email"
            placeholder="Email"
            error={errors.email}
            register={register("email", {
              required: "Este campo es requerido",
            })}
            bg={inputBg}
            color={textColor}
          />
          <InputComponent
            label="Contraseña"
            id="password"
            type="password"
            placeholder="Contraseña"
            error={errors.password}
            register={register("password", {
              required: "Este campo es requerido",
            })}
            bg={inputBg}
            color={textColor}
          />
          <InputComponent
            label="RUT"
            id="rut"
            type="text"
            placeholder="RUT"
            value={rut}
            onChange={handleRutChange}
            error={errors.rut}
            register={register("rut", { required: "Este campo es requerido" })}
            bg={inputBg}
            color={textColor}
          />
          <InputComponent
            label="Nombre"
            id="nombre"
            placeholder="Nombre"
            error={errors.nombre}
            register={register("nombre", {
              required: "Este campo es requerido",
            })}
            bg={inputBg}
            color={textColor}
          />
          <InputComponent
            label="Apellido"
            id="apellido"
            placeholder="Apellido"
            error={errors.apellido}
            register={register("apellido", {
              required: "Este campo es requerido",
            })}
            bg={inputBg}
            color={textColor}
          />
          <InputComponent
            label="Teléfono"
            id="telefono"
            placeholder="Teléfono"
            error={errors.telefono}
            register={register("telefono", {
              required: "Este campo es requerido",
            })}
            bg={inputBg}
            color={textColor}
          />
          <SelectComponent
            label="Jornada"
            id="jornada"
            placeholder="Selecciona una jornada"
            error={errors.jornada}
            register={register("jornada", {
              required: "Este campo es requerido",
            })}
            bg={inputBg}
            color={textColor}
          >
            <option value="diurno">Diurno</option>
            <option value="vespertino">Vespertino</option>
            <option value="mixto">Mixto</option>
          </SelectComponent>
          <SelectComponent
            label="Rol"
            id="rol"
            placeholder="Selecciona un rol"
            error={errors.rol}
            register={register("rol", { required: "Este campo es requerido" })}
            bg={inputBg}
            color={textColor}
          >
            <option value="vendedor">Vendedor</option>
            <option value="administrador">Administrador</option>
          </SelectComponent>
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
