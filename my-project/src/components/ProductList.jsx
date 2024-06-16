import React from "react";
import { Box, Spinner, Image, Text, Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const ProductList = ({ products, isLoading, handleDelete }) => {
  console.log("Productos en ProductList:", products);
  if (isLoading) {
    return <Spinner size="lg" />;
  }

  if (products && products.length > 0) {
    return (
      <Box>
        {products.map((product) => (
          <Box
            key={product.id}
            borderWidth="1px"
            borderRadius="md"
            p="4"
            mb="4"
          >
            <Image src={product.imagen} alt={product.nombre} mb="4" />
            <Text fontWeight="bold">{product.nombre}</Text>
            <Text>{product.descripcion}</Text>
            <Text>Código: {product.codigo}</Text>
            <Text>Tipo: {product.tipo}</Text>
            <Text>Precio: ${product.precio}</Text>
            <Button
              leftIcon={<DeleteIcon />}
              colorScheme="red"
              onClick={() => handleDelete(product.id)}
              mt="4"
            >
              Eliminar
            </Button>
          </Box>
        ))}
      </Box>
    );
  } else if (products && products.length === 0) {
    return <Text>No hay productos disponibles.</Text>;
  } else {
    return <Text>Cargando productos...</Text>;
  }
};

export default ProductList;
