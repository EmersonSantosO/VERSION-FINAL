import React from "react";
import { Table, Tbody, Td, Th, Thead, Tr, Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import useStore from "../store";

const ClienteList = () => {
  const clientes = useStore((state) => state.clientes); // Asegúrate de tener un estado de clientes en tu store
  const deleteCliente = useStore((state) => state.deleteCliente); // Método para eliminar clientes

  return (
    <Table variant="simple" size="sm">
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Email</Th>
          <Th>Nombre</Th>
          <Th>Apellido</Th>
          <Th>RUT</Th>
          <Th>Teléfono</Th>
          <Th>Acciones</Th>
        </Tr>
      </Thead>
      <Tbody>
        {clientes.map((cliente) => (
          <Tr key={cliente.id}>
            <Td>{cliente.id}</Td>
            <Td>{cliente.email}</Td>
            <Td>{cliente.nombre}</Td>
            <Td>{cliente.apellido}</Td>
            <Td>{cliente.rut}</Td>
            <Td>{cliente.telefono}</Td>
            <Td>
              <Button
                leftIcon={<DeleteIcon />}
                colorScheme="red"
                variant="solid"
                onClick={() => deleteCliente(cliente.id)}
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

export default ClienteList;
