import React, { useEffect } from "react";
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
  Spinner,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import axios from "axios";
import useStore from "../store";
import theme from "../theme";

const Admin = () => {
  const token = useStore((state) => state.user?.token);
  const { users, setUsers, isLoading, setLoading } = useStore();
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
      setLoading(true);
      try {
        const response = await axios.get("/usuarios/");
        setUsers(response.data.results); // Ajusta aquí si tu respuesta es diferente
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        toast({
          title: "Error",
          description: "Hubo un error al obtener la lista de usuarios.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token, toast, setUsers, setLoading]);

  const handleCreateUser = async (data) => {
    try {
      const response = await axios.post("/usuarios/", data);
      setUsers((prevUsers) => [...prevUsers, response.data]);
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
        title: "Error al crear el usuario",
        description: error.response.data?.email
          ? error.response.data.email[0]
          : "Hubo un error al crear el usuario.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/usuarios/${userId}/`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
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
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                {...register("email", { required: "Este campo es requerido" })}
                bg={inputBg}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                {...register("password", {
                  required: "Este campo es requerido",
                })}
                bg={inputBg}
              />
            </FormControl>
            <FormControl>
              <FormLabel>RUT</FormLabel>
              <Input
                type="text"
                {...register("rut", { required: "Este campo es requerido" })}
                bg={inputBg}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Nombre</FormLabel>
              <Input
                type="text"
                {...register("nombre", { required: "Este campo es requerido" })}
                bg={inputBg}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Apellido</FormLabel>
              <Input
                type="text"
                {...register("apellido", {
                  required: "Este campo es requerido",
                })}
                bg={inputBg}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Teléfono</FormLabel>
              <Input
                type="text"
                {...register("telefono", {
                  required: "Este campo es requerido",
                })}
                bg={inputBg}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Jornada</FormLabel>
              <Select
                {...register("jornada", {
                  required: "Este campo es requerido",
                })}
                bg={inputBg}
              >
                <option value="diurno">Diurno</option>
                <option value="vespertino">Vespertino</option>
                <option value="mixto">Mixto</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Rol</FormLabel>
              <Select
                {...register("rol", { required: "Este campo es requerido" })}
                bg={inputBg}
              >
                <option value="vendedor">Vendedor</option>
                <option value="administrador">Administrador</option>
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
              {Array.isArray(users) &&
                users.map((user) => (
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
                        onClick={() => handleDeleteUser(user.id)}
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
    </Box>
  );
};

export default Admin;
