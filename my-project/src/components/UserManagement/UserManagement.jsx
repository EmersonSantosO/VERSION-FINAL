// src/components/UserManagement/UserManagement.jsx
import React, { useEffect } from "react";
import { Box, Heading, useColorModeValue, useToast } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import useStore from "../../store";
import DataList from "../DataList/DataList";
import theme from "../../theme";

const UserManagement = () => {
  const { users, fetchUsers, isLoading } = useStore();
  const user = useStore((state) => state.user);
  const toast = useToast();

  // Chakra UI Color Mode
  const bgColor = useColorModeValue(
    theme.colors.background.light,
    theme.colors.background.dark
  );
  const textColor = useColorModeValue(
    theme.colors.text.light,
    theme.colors.text.dark
  );

  useEffect(() => {
    // Obtener usuarios cuando el componente se monta
    if (user?.token) {
      fetchUsers();
    }
  }, [user, fetchUsers]);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/usuarios/${userId}/`);
      fetchUsers(); // Actualizar la lista de usuarios después de la eliminación
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

  // Configuración de columnas para DataList
  const userColumns = [
    { key: "id", header: "ID" },
    { key: "email", header: "Email" },
    { key: "nombre", header: "Nombre" },
    { key: "apellido", header: "Apellido" },
    { key: "rol", header: "Rol" },
  ];

  // Configuración de acciones para DataList
  const userActions = [
    {
      key: "delete",
      label: "Eliminar",
      onClick: handleDelete,
      icon: <DeleteIcon />,
    },
  ];

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

      {/* Usa DataList para mostrar la lista de usuarios */}
      <DataList
        data={users}
        columns={userColumns}
        isLoading={isLoading}
        actions={userActions}
      />
    </Box>
  );
};

export default UserManagement;
