import React, { useEffect, useState } from "react";
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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { DeleteIcon, AddIcon } from "@chakra-ui/icons";
import useStore from "../store";
import theme from "../theme";
import UserForm from "./UserForm";

const Usuarios = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState(null);
  const fetchUsers = useStore((state) => state.fetchUsers);
  const users = useStore((state) => state.users);
  const isLoading = useStore((state) => state.usersLoading);
  const user = useStore((state) => state.user);
  const toast = useToast();

  useEffect(() => {
    if (user?.rol === "administrador") {
      fetchUsers();
    }
  }, [user, fetchUsers]);

  const handleDelete = async (userId) => {
    try {
      const deleteUser = useStore.getState().deleteUser;
      await deleteUser(userId);
      toast({
        title: "Usuario Eliminado",
        description: "El usuario se ha eliminado correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchUsers();
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
      <Box
        p="8"
        bg={useColorModeValue(
          theme.colors.background.light,
          theme.colors.background.dark
        )}
        color={useColorModeValue(
          theme.colors.text.light,
          theme.colors.text.dark
        )}
      >
        <Heading as="h2" size="lg" mb="4">
          No tienes permisos para acceder a esta página.
        </Heading>
      </Box>
    );
  }

  return (
    <Box
      p="8"
      bg={useColorModeValue(
        theme.colors.background.light,
        theme.colors.background.dark
      )}
      color={useColorModeValue(theme.colors.text.light, theme.colors.text.dark)}
    >
      <Heading as="h1" size="xl" mb="8">
        Gestión de Usuarios
      </Heading>
      <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={onOpen} mb="8">
        Nuevo Usuario
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setSelectedUser(null);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedUser ? "Editar Usuario" : "Nuevo Usuario"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UserForm user={selectedUser} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
      {isLoading ? (
        <Spinner size="lg" />
      ) : (
        <Table
          variant="simple"
          size="sm"
          bg={useColorModeValue("gray.100", "gray.700")}
        >
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

export default Usuarios;
