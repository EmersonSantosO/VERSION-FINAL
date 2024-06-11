// src/components/Home/Home.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Text,
  Heading,
  useToast,
  Image,
  useColorModeValue,
  Flex,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon, SearchIcon, CloseIcon } from "@chakra-ui/icons";
import useStore from "../../store";
import theme from "../../theme";
import { motion } from "framer-motion";
import ProductForm from "../ProductForm/ProductForm";
import DataList from "../DataList/DataList";

const MotionBox = motion(Box);

const Home = () => {
  const { user, products, isLoading, fetchProducts, deleteProduct } =
    useStore();
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Chakra UI Color Mode
  const bgColor = useColorModeValue(
    theme.colors.background.light,
    theme.colors.background.dark
  );
  const textColor = useColorModeValue(
    theme.colors.text.light,
    theme.colors.text.dark
  );

  useEffect(() => {
    // Obtener productos al montar el componente y cuando cambia la página o el término de búsqueda
    if (user?.token) {
      fetchProducts(currentPage, searchTerm);
    }
  }, [user, fetchProducts, currentPage, searchTerm]);

  const handleDelete = async (productId) => {
    // Eliminar producto
    try {
      await deleteProduct(productId);
      toast({
        title: "Producto Eliminado",
        description: "El producto se ha eliminado correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Actualizar la lista después de eliminar
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

  // Configuración de columnas para DataList
  const productColumns = [
    {
      key: "imagen",
      header: "Imagen",
      render: (product) => (
        <Image src={product.imagen} alt={product.nombre} boxSize="50px" />
      ),
    },
    { key: "nombre", header: "Nombre" },
    { key: "descripcion", header: "Descripción" },
    { key: "precio", header: "Precio" },
    { key: "tipo", header: "Categoría" },
  ];

  // Configuración de acciones para DataList
  const productActions = [
    {
      key: "delete",
      label: "Eliminar",
      onClick: handleDelete,
      icon: <DeleteIcon />,
    },
  ];

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

      {/* Formulario para crear nuevo producto (solo para administradores y vendedores) */}
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

      {/* Lista de productos usando DataList */}
      <DataList
        data={products.results || []} // Asegura que 'data' sea un array
        columns={productColumns}
        isLoading={isLoading}
        actions={productActions}
      />

      {/* Paginación */}
      {products.next || products.previous ? (
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
      ) : null}
    </MotionBox>
  );
};

export default Home;
