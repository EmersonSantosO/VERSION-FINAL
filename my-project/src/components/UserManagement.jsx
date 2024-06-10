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
  const { users, fetchUsers, isLoading } = useStore();
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
      await axios.delete(`/api/usuarios/${userId}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      fetchUsers(); // Actualiza la lista después de eliminar
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

  // Mostrar mensaje si el usuario no es administrador
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
              <UserRow key={user.id} user={user} onDelete={handleDelete} />
            ))}
          </Tbody>
        </Table>
      )}
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

export default UserManagement;
