import React, { useEffect } from "react";
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
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import axios from "axios";
import useStore from "../store";
import theme from "../theme";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionGridItem = motion(GridItem);

const Home = () => {
  const { user, products, isLoading, fetchProducts, deleteProduct } =
    useStore();
  const { register, handleSubmit, reset } = useForm();
  const toast = useToast();

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
      fetchProducts();
    }
  }, [user, fetchProducts]);

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId); // Llama a la función deleteProduct del store
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
      // Actualiza el store directamente con el nuevo producto
      useStore.setState((state) => ({
        products: [...state.products, response.data],
      }));
      reset();
      toast({
        title: "Producto Creado",
        description: "El producto se ha creado correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
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
        Bienvenido al Sistema de Bazar
      </Heading>

      {/* Formulario para crear nuevo producto (solo para administradores) */}
      {user?.rol === "administrador" && (
        <MotionBox
          mb="8"
          p="6"
          borderWidth="1px"
          borderRadius="md"
          bg={useColorModeValue("white", "gray.700")}
          boxShadow="md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Heading as="h3" size="lg" mb="4">
            Agregar Nuevo Producto
          </Heading>
          <form onSubmit={handleSubmit(handleCreateProduct)}>
            <VStack spacing={4} align="stretch">
              {/* ... (campos del formulario) ... */}
              <Button
                leftIcon={<AddIcon />}
                colorScheme="brand"
                type="submit"
                bg={buttonBg}
                _hover={{ bg: useColorModeValue("brand.600", "brand.300") }}
              >
                Crear Producto
              </Button>
            </VStack>
          </form>
        </MotionBox>
      )}

      {/* Lista de productos */}
      <Box>
        <Heading as="h3" size="lg" mb="4">
          Lista de Productos
        </Heading>
        {isLoading ? (
          <Spinner size="lg" />
        ) : (
          <Grid templateColumns="repeat(auto-fit, minmax(240px, 1fr))" gap={6}>
            {products.map((product) => (
              <MotionGridItem
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Box
                  borderWidth="1px"
                  borderRadius="md"
                  p="4"
                  bg={useColorModeValue("white", "gray.700")}
                  boxShadow="md"
                >
                  <Image
                    src={product.imagen}
                    alt={product.nombre}
                    objectFit="cover"
                    width="100%"
                    height="200px"
                    mb="4"
                  />
                  <Text fontWeight="bold">{product.nombre}</Text>
                  <Text>{product.descripcion}</Text>
                  <Text>${product.precio}</Text>
                  <Text>{product.categoria}</Text>
                  {user?.rol === "administrador" && (
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
            ))}
          </Grid>
        )}
      </Box>
    </MotionBox>
  );
};

export default Home;
