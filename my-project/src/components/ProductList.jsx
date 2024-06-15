// src/components/ProductList.jsx
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

const ProductList = () => {
  const products = useStore((state) => state.products);
  const deleteProduct = useStore((state) => state.deleteProduct);

  return (
    <Box mt="4">
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nombre</Th>
              <Th>Descripción</Th>
              <Th>Código</Th>
              <Th>Tipo</Th>
              <Th>Precio</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product) => (
              <Tr key={product.id}>
                <Td>{product.id}</Td>
                <Td>{product.nombre}</Td>
                <Td>{product.descripcion}</Td>
                <Td>{product.codigo}</Td>
                <Td>{product.tipo}</Td>
                <Td>{product.precio}</Td>
                <Td>
                  <Button
                    leftIcon={<DeleteIcon />}
                    colorScheme="red"
                    variant="ghost"
                    onClick={() => deleteProduct(product.id)}
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

export default ProductList;
