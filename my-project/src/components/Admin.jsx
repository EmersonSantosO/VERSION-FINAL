// src/components/Admin.jsx
import React, { useEffect } from "react";
import {
  Box,
  Button,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  Select,
  IconButton,
  useColorModeValue,
  Spinner,
  Input,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import axios from "axios";
import useStore from "../store"; // Importación corregida
import theme from "../theme";

const Admin = () => {
  const token = useStore((state) => state.user?.token);
  const users = useStore((state) => state.users);
  const fetchUsers = useStore((state) => state.fetchUsers);
  const isLoading = useStore((state) => state.isLoading);
  const { register, handleSubmit, reset } = useForm();
  const toast = useToast();

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
    fetchUsers();
  }, [fetchUsers]); // Asegúrate de que fetchUsers es estable

  const handleCreateUser = async (data) => {
    try {
      const response = await axios.post("/usuarios/", data, {
        headers: { Authorization: `Token ${token}` },
      });
      fetchUsers(); // Refresca la lista de usuarios después de crear uno nuevo
      toast({
        title: "Usuario Creado",
        description: "El usuario se ha creado correctamente.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      reset();
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      toast({
        title: "Error al crear el usuario",
        description: error.response?.data?.email
          ? error.response.data.email[0]
          : "Hubo un error al crear el usuario.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/usuarios/${userId}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      fetchUsers(); // Actualiza la lista después de eliminar
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
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p="8" bg={bgColor} color={textColor}>
      <Heading as="h1" size="xl" mb="8">
        Administración
      </Heading>

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
            <FormControl>
              <FormLabel htmlFor="email">Email:</FormLabel>
              <Input
                id="email"
                placeholder="Email"
                bg={inputBg}
                {...register("email", { required: "Este campo es requerido" })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="rut">RUT:</FormLabel>
              <Input
                id="rut"
                placeholder="RUT"
                bg={inputBg}
                {...register("rut", { required: "Este campo es requerido" })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="nombre">Nombre:</FormLabel>
              <Input
                id="nombre"
                placeholder="Nombre"
                bg={inputBg}
                {...register("nombre", { required: "Este campo es requerido" })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="apellido">Apellido:</FormLabel>
              <Input
                id="apellido"
                placeholder="Apellido"
                bg={inputBg}
                {...register("apellido", {
                  required: "Este campo es requerido",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="telefono">Teléfono:</FormLabel>
              <Input
                id="telefono"
                placeholder="Teléfono"
                bg={inputBg}
                {...register("telefono", {
                  required: "Este campo es requerido",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="jornada">Jornada:</FormLabel>
              <Select
                id="jornada"
                bg={inputBg}
                {...register("jornada", {
                  required: "Este campo es requerido",
                })}
              >
                <option value="diurno">Diurno</option>
                <option value="vespertino">Vespertino</option>
                <option value="mixto">Mixto</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="rol">Rol:</FormLabel>
              <Select
                id="rol"
                bg={inputBg}
                {...register("rol", { required: "Este campo es requerido" })}
              >
                <option value="vendedor">Vendedor</option>
                <option value="administrador">Administrador</option>
              </Select>
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

      <Box>
        <Heading as="h3" size="lg" mb="4">
          Lista de Usuarios
        </Heading>
        {isLoading ? (
          <Spinner size="lg" />
        ) : (
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Email</Th>
                <Th>RUT</Th>
                <Th>Nombre</Th>
                <Th>Apellido</Th>
                <Th>Teléfono</Th>
                <Th>Jornada</Th>
                <Th>Rol</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.rut}</Td>
                  <Td>{user.nombre}</Td>
                  <Td>{user.apellido}</Td>
                  <Td>{user.telefono}</Td>
                  <Td>{user.jornada}</Td>
                  <Td>{user.rol}</Td>
                  <Td>
                    <Button
                      leftIcon={<DeleteIcon />}
                      colorScheme="red"
                      variant="solid"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Eliminar
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </Box>
  );
};

export default Admin;
