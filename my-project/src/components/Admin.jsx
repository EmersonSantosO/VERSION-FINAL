// src/components/Admin.jsx
import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Input,
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
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Admin = () => {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  // Estados para el formulario de nuevo usuario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [jornada, setJornada] = useState("");
  const [rol, setRol] = useState("");

  const toast = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/usuarios/");
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
  }, [token, toast]);

  const handleCreateUser = async () => {
    try {
      const response = await axios.post("/api/usuarios/", {
        email,
        password,
        nombre,
        apellido,
        telefono,
        jornada,
        rol,
      });
      setUsers([...users, response.data]);
      toast({
        title: "Usuario Creado",
        description: "El usuario se ha creado correctamente.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
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
      await axios.delete(`/api/usuarios/${userId}/`);
      setUsers(users.filter((user) => user.id !== userId));
      toast({
        title: "Usuario Eliminado",
        description: "El usuario se ha eliminado correctamente.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
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
    <Box p="8">
      <Heading as="h1" size="xl" mb="8">
        Panel de Administración
      </Heading>

      {/* Formulario para agregar usuarios */}
      <Box mb="8" p="6" borderWidth="1px" borderRadius="md">
        <Heading as="h3" size="lg" mb="4">
          Crear Nuevo Usuario
        </Heading>
        <VStack spacing={4} align="stretch">
          {/* ... (campos de entrada para email, password, nombre, apellido, telefono, jornada, rol - sin cambios) */}

          <Button
            leftIcon={<AddIcon />}
            onClick={handleCreateUser}
            colorScheme="brand"
          >
            Crear Usuario
          </Button>
        </VStack>
      </Box>

      {/* Lista de usuarios */}
      <Box p="6" borderWidth="1px" borderRadius="md">
        <Heading as="h3" size="lg" mb="4">
          Lista de Usuarios
        </Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Email</Th>
              <Th>Nombre</Th>
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
