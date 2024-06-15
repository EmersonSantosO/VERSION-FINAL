// src/components/Usuarios.jsx
import React, { useEffect } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import useStore from "../store";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const Usuarios = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const fetchUsers = useStore((state) => state.fetchUsers);
  const users = useStore((state) => state.users);
  const isLoading = useStore((state) => state.isLoading);
  const user = useStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user.rol !== "administrador") {
      navigate("/");
    } else {
      fetchUsers();
    }
  }, [user, navigate, fetchUsers]);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setName(user.nombre);
    setEmail(user.email);
    onOpen();
  };

  const handleDelete = async (userId) => {
    try {
      const deleteUser = useStore.getState().deleteUser;
      await deleteUser(userId);
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  const handleSave = () => {
    // Aquí podrías enviar la solicitud de actualización al servidor
    console.log(`Guardar cambios para ${selectedUser.nombre}`);
    onClose();
  };

  return (
    <Box p={5}>
      <Button
        mb={4}
        colorScheme="blue"
        onClick={() => navigate("/usuarios/nuevo")}
      >
        Nuevo Usuario
      </Button>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nombre</Th>
              <Th>Email</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users?.map((user) => (
              <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>{user.nombre}</Td>
                <Td>{user.email}</Td>
                <Td>
                  <Button
                    onClick={() => handleEdit(user)}
                    leftIcon={<EditIcon />}
                    colorScheme="teal"
                    variant="ghost"
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => handleDelete(user.id)}
                    leftIcon={<DeleteIcon />}
                    colorScheme="red"
                    variant="ghost"
                  >
                    Eliminar
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {selectedUser && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Editar Usuario</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Nombre</FormLabel>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSave}>
                Guardar
              </Button>
              <Button onClick={onClose}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default Usuarios;
