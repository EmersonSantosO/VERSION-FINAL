import React, { useEffect, useState } from "react";
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
import useStore from "../store";
import theme from "../theme";
import { motion } from "framer-motion";
import ProductForm from "./ProductForm"; // Importa el componente ProductForm

const MotionBox = motion(Box);
const MotionGridItem = motion(GridItem);

const Home = () => {
  const { user, products, isLoading, fetchProducts, deleteProduct } =
    useStore();
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const bgColor = useColorModeValue(
    theme.colors.background.light,
    theme.colors.background.dark
  );
  const textColor = useColorModeValue(
    theme.colors.text.light,
    theme.colors.text.dark
  );

  useEffect(() => {
    if (user?.token) {
      fetchProducts(currentPage, searchTerm);
    }
  }, [user, fetchProducts, currentPage, searchTerm]);

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
      fetchProducts(currentPage, searchTerm);
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
    fetchProducts(1, searchTerm);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchProducts(newPage, searchTerm);
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

      {/* Formulario para crear nuevo producto */}
      {(user?.rol === "administrador" || user?.rol === "vendedor") && (
        <ProductForm />
      )}

      {/* Buscador de productos */}
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

      {/* Lista de productos */}
      <Box>
        {isLoading ? (
          <Spinner size="lg" />
        ) : (
          <>
            <Grid
              templateColumns="repeat(auto-fit, minmax(240px, 1fr))"
              gap={6}
            >
              {products.results && products.results.length > 0 ? (
                products.results.map((product) => (
                  <MotionGridItem key={product.id}>
                    <ProductCard product={product} onDelete={handleDelete} />
                  </MotionGridItem>
                ))
              ) : (
                <Text>No se encontraron productos</Text>
              )}
            </Grid>

            {/* Paginación */}
            <Flex justifyContent="center" mt={4}>
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                isDisabled={!products.previous}
                mr={2}
              >
                Anterior
              </Button>
              <Text>Página {currentPage}</Text>
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                isDisabled={!products.next}
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

// Componente para mostrar la tarjeta de un producto
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
