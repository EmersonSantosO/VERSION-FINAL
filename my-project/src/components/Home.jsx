import React, { useState } from "react";
import {
  Box,
  Button,
  Text,
  Heading,
  Grid,
  GridItem,
  useToast,
  Image,
  useColorModeValue,
  Spinner,
  Flex,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon, SearchIcon, CloseIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useStore from "../store";
import theme from "../theme";
import ProductForm from "./ProductForm";

const MotionBox = motion(Box);
const MotionGridItem = motion(GridItem);

const fetchProducts = async ({ queryKey }) => {
  const [_key, { page, search }] = queryKey;
  const { data } = await axios.get(`/productos/?page=${page}&search=${search}`);
  return data;
};

const Home = () => {
  const user = useStore((state) => state.user); // Asegúrate de que user está definido
  const deleteProduct = useStore((state) => state.deleteProduct);
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading } = useQuery({
    queryKey: ["products", { page: currentPage, search: searchTerm }],
    queryFn: fetchProducts,
  });

  const bgColor = useColorModeValue(
    theme.colors.background.light,
    theme.colors.background.dark
  );
  const textColor = useColorModeValue(
    theme.colors.text.light,
    theme.colors.text.dark
  );

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      toast({
        title: "Producto Eliminado",
        description: "El producto se ha eliminado correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      toast({
        title: "Error",
        description: "Hubo un error al eliminar el producto.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      p="8"
      bg={bgColor}
      color={textColor}
    >
      <Heading as="h1" size="xl" mb="8">
        Productos
      </Heading>

      {(user?.rol === "administrador" || user?.rol === "vendedor") && (
        <ProductForm />
      )}

      <InputGroup mb={4}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <InputRightElement>
          <IconButton
            icon={<SearchIcon />}
            onClick={handleSearchSubmit}
            size="sm"
          />
          {searchTerm && (
            <IconButton
              icon={<CloseIcon />}
              onClick={() => setSearchTerm("")}
              size="sm"
              ml={2}
            />
          )}
        </InputRightElement>
      </InputGroup>

      <Box>
        {isLoading ? (
          <Spinner size="lg" />
        ) : error ? (
          <Text>Error al cargar los productos.</Text>
        ) : (
          <>
            <Grid
              templateColumns="repeat(auto-fit, minmax(240px, 1fr))"
              gap={6}
            >
              {data?.results && data.results.length > 0 ? (
                data.results.map((product) => (
                  <MotionGridItem key={product.id}>
                    <ProductCard product={product} onDelete={handleDelete} />
                  </MotionGridItem>
                ))
              ) : (
                <Text>No se encontraron productos</Text>
              )}
            </Grid>

            <Flex justifyContent="center" mt={4}>
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                isDisabled={!data.previous}
                mr={2}
              >
                Anterior
              </Button>
              <Text>Página {currentPage}</Text>
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                isDisabled={!data.next}
                ml={2}
              >
                Siguiente
              </Button>
            </Flex>
          </>
        )}
      </Box>
    </MotionBox>
  );
};

const ProductCard = ({ product, onDelete }) => {
  const bgColor = useColorModeValue("white", "gray.700");

  return (
    <Box borderWidth="1px" borderRadius="md" p="4" bg={bgColor} boxShadow="md">
      <Image src={product.imagen} alt={product.nombre} mb={4} />
      <Text fontWeight="bold" mb={2}>
        {product.nombre}
      </Text>
      <Text mb={2}>{product.descripcion}</Text>
      <Text mb={2}>Precio: ${product.precio}</Text>
      <Text mb={2}>Categoría: {product.tipo}</Text>
      <IconButton
        icon={<DeleteIcon />}
        colorScheme="red"
        aria-label="Eliminar producto"
        onClick={() => onDelete(product.id)}
        mt="4"
      />
    </Box>
  );
};

export default Home;
