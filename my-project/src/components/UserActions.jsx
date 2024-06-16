import React from "react";
import { useToast } from "@chakra-ui/react";
import useStore from "../store";

const UserActions = () => {
  const fetchUsers = useStore((state) => state.fetchUsers);
  const deleteUser = useStore((state) => state.deleteUser);
  const toast = useToast();

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      toast({
        title: "Usuario Eliminado",
        description: "El usuario se ha eliminado correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchUsers(); // Refetch users after deletion
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

  return { handleDelete };
};

export default UserActions;
