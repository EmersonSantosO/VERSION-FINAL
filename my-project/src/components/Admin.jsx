// Admin.jsx - Simplificado
import React, { useEffect } from "react";
import { Box, Heading, Spinner, useColorModeValue } from "@chakra-ui/react";
import useStore from "../store";
import UserTable from "./UserTable";
import UserActions from "./UserActions";
import UserForm from "./UserForm";
import theme from "../theme";

const Admin = () => {
  const { users, isLoading, user, fetchUsers } = useStore((state) => ({
    users: state.users,
    isLoading: state.usersLoading,
    user: state.user,
    fetchUsers: state.fetchUsers,
  }));
  const { handleDelete } = UserActions();

  // ... (Estilos con useColorModeValue) ...
  const bgColor = useColorModeValue(
    theme.colors.background.light,
    theme.colors.background.dark
  );
  const textColor = useColorModeValue(
    theme.colors.text.light,
    theme.colors.text.dark
  );

  useEffect(() => {
    if (user?.rol === "administrador") {
      fetchUsers();
    }
  }, [user, fetchUsers]);

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
      <UserForm />
      {isLoading ? (
        <Spinner size="lg" />
      ) : (
        <UserTable users={users} handleDelete={handleDelete} />
      )}
    </Box>
  );
};

export default Admin;
