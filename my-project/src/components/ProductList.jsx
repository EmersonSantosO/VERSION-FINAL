// src/components/ProductList.jsx
import React from "react";
import { Table, Tbody, Td, Th, Thead, Tr, Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import useStore from "../store";

const ProductList = () => {
  const products = useStore((state) => state.products); // Asegúrate de tener un estado de productos en tu store
  const deleteProduct = useStore((state) => state.deleteProduct); // Método para eliminar productos

  return (
    <Table variant="simple" size="sm">
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
                variant="solid"
                onClick={() => deleteProduct(product.id)}
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

export default ProductList;
