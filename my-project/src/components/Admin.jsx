import React, { useEffect, useContext } from "react";
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
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useStore } from "../store";
import theme from "../theme"; // Importa tu tema de colores

const Admin = () => {
  const { token } = useContext(AuthContext);
  const { users, setUsers } = useStore();
  const { register, handleSubmit, reset } = useForm();
  const toast = useToast();

  // Colores adaptativos al tema
  const bgColor = useColorModeValue(
    theme.colors.background.light,
    theme.colors.background.dark
  );
  const textColor = useColorModeValue(
    theme.colors.text.light,
    theme.colors.text.dark
  );
  const buttonBg = useColorModeValue(
    theme.colors.brand.light,
    theme.colors.brand.dark
  );
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

      <Box
        mb="8"
        p="6"
        borderWidth="1px"
        borderRadius="md"
        bg={useColorModeValue("white", "gray.700")}
      >
        <Heading as="h3" size="lg" mb="4">
          Crear Nuevo Usuario
        </Heading>
        <form onSubmit={handleSubmit(handleCreateUser)}>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Nombre:</FormLabel>
              <Input
                {...register("nombre")}
                placeholder="Nombre"
                bg={inputBg}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email:</FormLabel>
              <Input {...register("email")} placeholder="Email" bg={inputBg} />
            </FormControl>
            <FormControl>
              <FormLabel>Contraseña:</FormLabel>
              <Input
                {...register("password")}
                type="password"
                placeholder="Contraseña"
                bg={inputBg}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Rol:</FormLabel>
              <Select
                {...register("rol")}
                placeholder="Selecciona un rol"
                bg={inputBg}
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
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Email</Th>
              <Th>Rol</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>{user.nombre}</Td>
                <Td>{user.email}</Td>
                <Td>{user.rol}</Td>
                <Td>
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    aria-label="Eliminar usuario"
                    onClick={() => handleDeleteUser(user.id)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Admin;
