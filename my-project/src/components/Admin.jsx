import React, { useEffect } from "react";
import { Box, Heading, Spinner, useColorModeValue } from "@chakra-ui/react";
import useStore from "../store";
import UserTable from "./UserTable";
import UserActions from "./UserActions";
import UserForm from "./UserForm";
import theme from "../theme";

const Admin = () => {
  const { users, isLoading } = useStore((state) => ({
    users: state.users,
    isLoading: state.usersLoading,
  }));
  const user = useStore((state) => state.user);
  const fetchUsers = useStore((state) => state.fetchUsers);
  const { handleDelete } = UserActions({ user });

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

  const handleUserCreated = (newUser) => {
    fetchUsers();
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
      <UserForm onUserCreated={handleUserCreated} />
      {isLoading ? (
        <Spinner size="lg" />
      ) : (
        <UserTable users={users} handleDelete={handleDelete} />
      )}
    </Box>
  );
};

export default Admin;
