// src/components/VentaList.jsx
import React from "react";
import { Table, Tbody, Td, Th, Thead, Tr, Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import useStore from "../store";

const VentaList = () => {
  const ventas = useStore((state) => state.ventas); // Asegúrate de tener un estado de ventas en tu store
  const deleteVenta = useStore((state) => state.deleteVenta); // Método para eliminar ventas

  return (
    <Table variant="simple" size="sm">
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Producto</Th>
          <Th>Cliente</Th>
          <Th>Cantidad</Th>
          <Th>Total</Th>
          <Th>Fecha</Th>
          <Th>Acciones</Th>
        </Tr>
      </Thead>
      <Tbody>
        {ventas.map((venta) => (
          <Tr key={venta.id}>
            <Td>{venta.id}</Td>
            <Td>{venta.producto}</Td>
            <Td>{venta.cliente}</Td>
            <Td>{venta.cantidad}</Td>
            <Td>{venta.total}</Td>
            <Td>{venta.fecha_venta}</Td>
            <Td>
              <Button
                leftIcon={<DeleteIcon />}
                colorScheme="red"
                variant="solid"
                onClick={() => deleteVenta(venta.id)}
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

export default VentaList;
