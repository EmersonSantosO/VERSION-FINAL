import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Text,
  Heading,
  Grid,
  GridItem,
  useToast,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Select,
  IconButton,
  Image,
  useColorModeValue,
  Spinner,
  Flex,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon, SearchIcon, CloseIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import axios from "axios";
import useStore from "../store";
import theme from "../theme";
import { motion } from "framer-motion";
import { useContext } from "react";
import UIContext from "../context/UIContext";

const MotionBox = motion(Box);
const MotionGridItem = motion(GridItem);

const Home = () => {
  const {
    user,
    products,
    isLoading,
    fetchProducts,
    deleteProduct,
    navbarNeedsUpdate,
  } = useStore();
  const { register, handleSubmit, reset } = useForm();
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { updateNavbar } = useContext(UIContext);

  const bgColor = useColorModeValue(
    theme.colors.background.light,
    theme.colors.background.dark
  );
  const textColor = useColorModeValue(
    theme.colors.text.light,
    theme.colors.text.dark
  );
  const buttonBg = useColorModeValue("brand.500", "brand.200");
  const inputBg = useColorModeValue("gray.100", "gray.700");

  useEffect(() => {
    if (user?.token) {
      fetchProducts(currentPage, searchTerm);
    }
  }, [user, fetchProducts, currentPage, searchTerm, products]);

  useEffect(() => {
    if (navbarNeedsUpdate) {
      updateNavbar();
      useStore.setState({ navbarNeedsUpdate: false });
    }
  }, [navbarNeedsUpdate, updateNavbar]);

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

  const handleCreateProduct = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/productos/", formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      useStore.setState((state) => ({
        products: {
          ...state.products,
          results: [...state.products.results, response.data],
        },
      }));
      reset();
      toast({
        title: "Producto Creado",
        description: "El producto se ha creado correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchProducts(currentPage, searchTerm);
    } catch (error) {
      console.error("Error al crear producto:", error);
      toast({
        title: "Error",
        description: "Hubo un error al crear el producto.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
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
        <Box
          mb="8"
          p="6"
          borderWidth="1px"
          borderRadius="md"
          bg={useColorModeValue("white", "gray.700")}
          boxShadow="md"
        >
          <Heading as="h3" size="lg" mb="4">
            Crear Nuevo Producto
          </Heading>
          <form onSubmit={handleSubmit(handleCreateProduct)}>
            <VStack spacing={4} align="stretch">
              {/* ... (campos del formulario para crear producto) ... */}
            </VStack>
          </form>
        </Box>
      )}
      <InputGroup mb={4}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={handleSearch}
        />
        {searchTerm && (
          <InputRightElement>
            <IconButton
              icon={<CloseIcon />}
              onClick={() => setSearchTerm("")}
              size="sm"
            />
          </InputRightElement>
        )}
      </InputGroup>
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
                    <Box
                      borderWidth="1px"
                      borderRadius="md"
                      p="4"
                      bg={useColorModeValue("white", "gray.700")}
                      boxShadow="md"
                    >
                      <Image src={product.imagen} alt={product.nombre} mb={4} />
                      <Text fontWeight="bold" mb={2}>
                        {product.nombre}
                      </Text>
                      <Text mb={2}>{product.descripcion}</Text>
                      <Text mb={2}>Precio: ${product.precio}</Text>
                      <Text mb={2}>Categoría: {product.tipo}</Text>
                      {user && (
                        <IconButton
                          icon={<DeleteIcon />}
                          colorScheme="red"
                          aria-label="Eliminar producto"
                          onClick={() => handleDelete(product.id)}
                          mt="4"
                        />
                      )}
                    </Box>
                  </MotionGridItem>
                ))
              ) : (
                <Text>No se encontraron productos</Text>
              )}
            </Grid>
            <Flex justifyContent="center" mt={4}>
              <Button
                onClick={() => setCurrentPage(currentPage - 1)}
                isDisabled={!products.previous}
                mr={2}
              >
                Anterior
              </Button>
              <Text>Página {currentPage}</Text>
              <Button
                onClick={() => setCurrentPage(currentPage + 1)}
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

export default Home;
