// src/components/VentaList.jsx
import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  TableContainer,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import useStore from "../store";

const VentaList = () => {
  const ventas = useStore((state) => state.ventas);
  const deleteVenta = useStore((state) => state.deleteVenta);

  return (
    <Box mt="4">
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Producto</Th>
              <Th>Vendedor</Th>
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
                <Td>{venta.producto.nombre}</Td>
                <Td>{venta.vendedor.nombre}</Td>
                <Td>{venta.cliente.nombre}</Td>
                <Td>{venta.cantidad}</Td>
                <Td>{venta.total}</Td>
                <Td>{new Date(venta.fecha).toLocaleString()}</Td>
                <Td>
                  <Button
                    leftIcon={<DeleteIcon />}
                    colorScheme="red"
                    variant="ghost"
                    onClick={() => deleteVenta(venta.id)}
                  >
                    Eliminar
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default VentaList;
