import React, { useEffect, useState, useContext } from "react";
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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/usuarios/", {
        headers: { Authorization: `Token ${token}` },
      });
      setUsers(response.data);
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    const token = localStorage.getItem("token");
    await axios.delete(`/api/usuarios/${userId}/`, {
      headers: { Authorization: `Token ${token}` },
    });
    setUsers(users.filter((user) => user.id !== userId));
  };

  if (user.rol !== "administrador") {
    return <p>No tienes permisos para acceder a esta página.</p>;
  }

  return (
    <Box p="8">
      <Heading as="h1" size="xl" mb="8">
        Gestión de Usuarios
      </Heading>
      <Table variant="simple">
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
                <Button colorScheme="red" onClick={() => handleDelete(user.id)}>
                  Eliminar
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default UserManagement;
