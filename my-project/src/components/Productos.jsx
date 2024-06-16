import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import useStore from "../store";

const Productos = () => {
  const fetchProducts = useStore((state) => state.fetchProducts);
  const queryClient = useQueryClient();

  // Usa useQuery para gestionar la solicitud de productos
  const {
    isLoading,
    data: products,
    error,
  } = useQuery("products", fetchProducts, { staleTime: Infinity });

  // Define la mutación para eliminar productos
  const deleteProductMutation = useMutation(
    useStore((state) => state.deleteProduct),
    {
      onSuccess: () => {
        // Invalida la caché de productos después de eliminar uno
        queryClient.invalidateQueries("products");
      },
    }
  );

  // Define la función handleDelete
  const handleDelete = (productId) => {
    deleteProductMutation.mutate(productId);
  };

  // Manejo de errores
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

      {/* Pasa products, isLoading y handleDelete a ProductList */}
      <ProductList
        products={products}
        isLoading={isLoading}
        handleDelete={handleDelete}
      />
    </Box>
  );
};

export default Productos;
