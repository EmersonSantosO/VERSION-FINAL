import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import useStore from "../store";

const Productos = () => {
  const fetchProducts = useStore((state) => state.fetchProducts);
  const queryClient = useQueryClient();

  const {
    isLoading,
    data: products,
    error,
  } = useQuery("products", fetchProducts, { staleTime: Infinity });

  const deleteProductMutation = useMutation(
    useStore((state) => state.deleteProduct),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
      },
    }
  );

  const handleDelete = (productId) => {
    deleteProductMutation.mutate(productId);
  };

  if (error) {
    return (
      <Box p="8">
        <Heading as="h2" size="lg" mb="4" color="red.500">
          Error al cargar productos
        </Heading>
      </Box>
    );
  }

  const bgColor = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Box p="8" bg={bgColor} color={textColor}>
      <Heading as="h1" size="xl" mb="8">
        Gestión de Productos
      </Heading>
      <ProductForm />

      <ProductList
        products={products}
        isLoading={isLoading}
        handleDelete={handleDelete}
      />
    </Box>
  );
};

export default Productos;
