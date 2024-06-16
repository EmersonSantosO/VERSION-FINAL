import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  VStack,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import theme from "../theme";
import { formatRut } from "../utils/formatRut";
import InputComponent from "./common/InputComponent";
import SelectComponent from "./common/SelectComponent";
import useStore from "../store";

const UserForm = ({ user, onClose }) => {
  const { register, handleSubmit, reset, formState, setValue } = useForm();
  const { errors, isSubmitting } = formState;
  const [rut, setRut] = useState(user?.rut || "");
  const toast = useToast();
  const fetchUsers = useStore((state) => state.fetchUsers);

  useEffect(() => {
    if (user) {
      setValue("email", user.email);
      setValue("nombre", user.nombre);
      setValue("apellido", user.apellido);
      setValue("telefono", user.telefono);
      setValue("jornada", user.jornada);
      setValue("rol", user.rol);
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      const userData = { ...data, rut };
      if (user) {
        await axios.put(`/usuarios/${user.id}/`, userData);
        toast({
          title: "Usuario actualizado",
          description: "El usuario se ha actualizado correctamente.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        await axios.post("/usuarios/", userData);
        toast({
          title: "Usuario creado",
          description: "El usuario se ha creado correctamente.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
      reset();
      setRut("");
      fetchUsers();
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un error al crear/actualizar el usuario.",
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
          {!user && (
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
          )}
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
            {user ? "Guardar Cambios" : "Crear Usuario"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default UserForm;
