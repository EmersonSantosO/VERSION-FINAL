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
import { useQuery } from "react-query";
import { getUsers, deleteUser } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import useStore from "../store";

const Usuarios = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const { data: users, refetch } = useQuery("users", getUsers);

  const user = useStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user.rol !== "administrador") {
      navigate("/");
    }
  }, [user, navigate]);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setName(user.name);
    setEmail(user.email);
    onOpen();
  };

  const handleDelete = (userId) => {
    deleteUser(userId)
      .then(() => {
        refetch();
      })
      .catch((error) => {
        console.error("Error al eliminar usuario:", error);
      });
  };

  const handleSave = () => {
    // Aquí podrías enviar la solicitud de actualización al servidor
    console.log(`Guardar cambios para ${selectedUser.name}`);
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
                <Td>{user.name}</Td>
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
