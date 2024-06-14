import React from "react";
import { Table, Tbody, Td, Th, Thead, Tr, Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const UserTable = ({ users, handleDelete }) => {
  return (
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
  );
};

export default UserTable;
