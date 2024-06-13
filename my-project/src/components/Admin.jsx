import React, { useEffect } from "react";
import {
  Box,
  Button,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  IconButton,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import axios from "axios";
import useStore from "../store";
import theme from "../theme";

const Admin = () => {
  const token = useStore((state) => state.user?.token);
  const { users, setUsers, isLoading, fetchUsers } = useStore();
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
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/usuarios/", {
          headers: { Authorization: `Token ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        toast({
          title: "Error",
          description: "Hubo un error al obtener la lista de usuarios.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token, toast, setUsers]);

  const handleCreateUser = async (data) => {
    try {
      const response = await axios.post("/usuarios/", data, {
        headers: { Authorization: `Token ${token}` },
      });
      setUsers([...users, response.data]);
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
        title: "Error",
        description: "Hubo un error al crear el usuario.",
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
            <FormControl>
              <FormLabel htmlFor="username">Nombre de usuario:</FormLabel>
              <Input
                id="username"
                placeholder="Nombre de usuario"
                {...register("username", {
                  required: "Este campo es requerido",
                })}
                bg={inputBg}
                color={textColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email:</FormLabel>
              <Input
                id="email"
                placeholder="Email"
                {...register("email", {
                  required: "Este campo es requerido",
                })}
                bg={inputBg}
                color={textColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Contraseña:</FormLabel>
              <Input
                id="password"
                placeholder="Contraseña"
                type="password"
                {...register("password", {
                  required: "Este campo es requerido",
                })}
                bg={inputBg}
                color={textColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="rol">Rol:</FormLabel>
              <Select
                id="rol"
                placeholder="Selecciona un rol"
                {...register("rol", {
                  required: "Este campo es requerido",
                })}
                bg={inputBg}
                color={textColor}
              >
                <option value="administrador">Administrador</option>
                <option value="vendedor">Vendedor</option>
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

      {/* Lista de usuarios */}
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
                <Th>Nombre</Th>
                <Th>Apellido</Th>
                <Th>Rol</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  onDelete={handleDeleteUser}
                />
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </Box>
  );
};

// Componente para una fila de usuario
const UserRow = ({ user, onDelete }) => (
  <Tr>
    <Td>{user.id}</Td>
    <Td>{user.email}</Td>
    <Td>{user.nombre}</Td>
    <Td>{user.apellido}</Td>
    <Td>{user.rol}</Td>
    <Td>
      <Button
        leftIcon={<DeleteIcon />}
        colorScheme="red"
        variant="solid"
        onClick={() => onDelete(user.id)}
      >
        Eliminar
      </Button>
    </Td>
  </Tr>
);

export default Admin;
