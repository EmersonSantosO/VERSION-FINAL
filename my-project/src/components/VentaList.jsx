import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
} from "@chakra-ui/react";
import useStore from "../store";
import theme from "../theme";

const VentaList = () => {
  const ventas = useStore((state) => state.ventas);

  return (
    <Box
      p="8"
      bg={useColorModeValue(
        theme.colors.background.light,
        theme.colors.background.dark
      )}
      color={useColorModeValue(theme.colors.text.light, theme.colors.text.dark)}
      borderRadius="md"
      boxShadow="md"
    >
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Producto</Th>
            <Th>Cantidad</Th>
            <Th>Total</Th>
            <Th>Fecha</Th>
          </Tr>
        </Thead>
        <Tbody>
          {ventas.map((venta) => (
            <Tr key={venta.id}>
              <Td>{venta.id}</Td>
              <Td>{venta.producto}</Td>
              <Td>{venta.cantidad}</Td>
              <Td>{venta.total}</Td>
              <Td>{new Date().toLocaleDateString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default VentaList;
