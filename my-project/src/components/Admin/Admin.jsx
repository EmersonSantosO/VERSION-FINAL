// src/components/Admin/Admin.jsx
import React, { useEffect } from "react";
import {
  Box,
  Button,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  useToast,
  Select,
  Input,
  FormErrorMessage,
  useColorModeValue,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import axios from "axios";
import useStore from "../../store";
import DataList from "../DataList/DataList";
import theme from "../../theme";

const Admin = () => {
  const token = useStore((state) => state.user?.token);
  const { users, setUsers, isLoading } = useStore();
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const toast = useToast();

  // Chakra UI Color Mode
  const bgColor = useColorModeValue(
    theme.colors.background.light,
    theme.colors.background.dark
  );
  const textColor = useColorModeValue(
    theme.colors.text.light,
    theme.colors.text.dark
  );
  const buttonBg = useColorModeValue("brand.500", "brand.200");
  const inputBg = useColorModeValue("gray.100", "gray.700");

  useEffect(() => {
    // Obtener la lista de usuarios al cargar el componente
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/usuarios/");
        // Actualizar el estado con la lista de usuarios
        if (Array.isArray(response.data.results)) {
          setUsers(response.data.results);
        } else {
          console.error(
            "La respuesta de usuarios no es un array:",
            response.data
          );
          setUsers([]);
        }
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        toast({
          title: "Error",
          description: "Hubo un error al obtener la lista de usuarios.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setUsers([]);
      }
    };

    // Solo obtener usuarios si el usuario está autenticado
    if (token) {
      fetchUsers();
    }
  }, [token, toast, setUsers]);

  const handleCreateUser = async (data) => {
    try {
      // Crear nuevo usuario
      const response = await axios.post("/usuarios/", data);
      setUsers([...users, response.data]); // Actualizar la lista de usuarios en el estado
      toast({
        title: "Usuario Creado",
        description: "El usuario se ha creado correctamente.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      reset(); // Reiniciar el formulario
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      if (error.response && error.response.status === 401) {
        toast({
          title: "Error de autorización",
          description: "No tienes permisos para crear usuarios.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "Hubo un error al crear el usuario.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      // Eliminar usuario
      await axios.delete(`/usuarios/${userId}/`);
      // Actualizar la lista de usuarios en el estado
      setUsers(users.filter((user) => user.id !== userId));
      toast({
        title: "Usuario Eliminado",
        description: "El usuario se ha eliminado correctamente.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      toast({
        title: "Error",
        description: "Hubo un error al eliminar el usuario.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Configuración de columnas para DataList
  const columns = [
    { key: "id", header: "ID" },
    { key: "email", header: "Email" },
    { key: "nombre", header: "Nombre" },
    { key: "apellido", header: "Apellido" },
    { key: "rol", header: "Rol" },
  ];

  // Configuración de acciones para DataList
  const actions = [
    {
      key: "delete",
      label: "Eliminar",
      onClick: handleDeleteUser,
      icon: <DeleteIcon />,
    },
  ];

  return (
    <Box p="8" bg={bgColor} color={textColor}>
      <Heading as="h1" size="xl" mb="8">
        Administración
      </Heading>

      {/* Formulario para crear nuevo usuario */}
      <Box
        mb="8"
        p="6"
        borderWidth="1px"
        borderRadius="md"
        bg={useColorModeValue("white", "gray.700")}
        boxShadow="md"
      >
        <Heading as="h3" size="lg" mb="4">
          Crear Nuevo Usuario
        </Heading>
        <form onSubmit={handleSubmit(handleCreateUser)}>
          <VStack spacing={4} align="stretch">
            {/* Campos del formulario con validación */}
            <FormControl isInvalid={errors.email}>
              <FormLabel htmlFor="email" color={textColor}>
                Email:
              </FormLabel>
              <Input
                id="email"
                {...register("email", {
                  required: "Este campo es requerido",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Ingresa un email válido",
                  },
                })}
                placeholder="Correo electrónico"
                bg={inputBg}
                color={textColor}
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "outline",
                }}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            {/* ... otros campos del formulario con validación similar ... */}
            <FormControl isInvalid={errors.rol}>
              <FormLabel htmlFor="rol" color={textColor}>
                Rol:
              </FormLabel>
              <Select
                id="rol"
                {...register("rol", {
                  required: "Este campo es requerido",
                })}
                placeholder="Selecciona un rol"
                bg={inputBg}
                color={textColor}
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "outline",
                }}
              >
                <option value="vendedor">Vendedor</option>
                <option value="administrador">Administrador</option>
              </Select>
              <FormErrorMessage>
                {errors.rol && errors.rol.message}
              </FormErrorMessage>
            </FormControl>

            <Button
              leftIcon={<AddIcon />}
              colorScheme="brand"
              type="submit"
              bg={buttonBg}
              _hover={{ bg: useColorModeValue("brand.600", "brand.300") }}
              isLoading={isLoading}
            >
              Crear Usuario
            </Button>
          </VStack>
        </form>
      </Box>

      {/* Lista de usuarios usando DataList */}
      <DataList
        data={users}
        columns={columns}
        isLoading={isLoading}
        actions={actions}
      />
    </Box>
  );
};

export default Admin;
