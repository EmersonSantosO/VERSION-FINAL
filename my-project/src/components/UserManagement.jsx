import React, { useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import useStore from "../store";
import theme from "../theme";

const UserManagement = () => {
  const { users, setUsers, isLoading } = useStore();
  const user = useStore((state) => state.user);
  const toast = useToast();

  const bgColor = useColorModeValue(
    theme.colors.background.light,
    theme.colors.background.dark
  );
  const textColor = useColorModeValue(
    theme.colors.text.light,
    theme.colors.text.dark
  );
  const tableColor = useColorModeValue("gray.100", "gray.700");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/usuarios/", {
          headers: { Authorization: `Token ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        toast({
          title: "Error",
          description: "Hubo un error al obtener la lista de usuarios.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    if (user?.token) {
      fetchUsers();
    }
  }, [user, toast, setUsers]);

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/usuarios/${userId}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setUsers(users.filter((u) => u.id !== userId));
      toast({
        title: "Usuario Eliminado",
        description: "El usuario se ha eliminado correctamente.",
        status: "success",
        duration: 3000,
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

  if (user?.rol !== "administrador") {
    return (
      <Box p="8" bg={bgColor} color={textColor}>
        <Heading as="h2" size="lg" mb="4">
          No tienes permisos para acceder a esta página.
        </Heading>
      </Box>
    );
  }

  return (
    <Box p="8" bg={bgColor} color={textColor}>
      <Heading as="h1" size="xl" mb="8">
        Gestión de Usuarios
      </Heading>
      {isLoading ? (
        <Spinner size="lg" />
      ) : (
        <Table variant="simple" size="sm" bg={tableColor}>
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
              <Tr key={user.id}>
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
                    onClick={() => handleDelete(user.id)}
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
  );
};

export default UserManagement;
