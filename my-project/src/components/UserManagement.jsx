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
  const { users, fetchUsers, isLoading } = useStore((state) => ({
    users: state.users,
    fetchUsers: state.fetchUsers,
    isLoading: state.isLoading,
  }));
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
    if (user?.token) {
      fetchUsers();
    }
  }, [user, fetchUsers]);

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/usuarios/${userId}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      fetchUsers();
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
