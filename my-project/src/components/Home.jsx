import React, { useState, useEffect, useContext } from "react";
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
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const toast = useToast();

  // Estados para el formulario de nuevo producto
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    descripcion: "",
    codigo: "",
    tipo: "aseo", // Valor inicial
    precio: "",
    imagen: null,
  });

  // Función para obtener productos (fuera de useEffect)
  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/productos/");
      setProducts(response.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      toast({
        title: "Error",
        description: "Hubo un error al cargar los productos.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [toast]);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`/api/productos/${productId}/`);
      setProducts(products.filter((product) => product.id !== productId));
      toast({
        title: "Producto Eliminado",
        description: "El producto se ha eliminado correctamente.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      toast({
        title: "Error",
        description: "Hubo un error al eliminar el producto.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === "imagen") {
      setNuevoProducto({
        ...nuevoProducto,
        imagen: e.target.files[0],
      });
    } else {
      setNuevoProducto({
        ...nuevoProducto,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      for (const key in nuevoProducto) {
        formData.append(key, nuevoProducto[key]);
      }

      await axios.post("/api/productos/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Reiniciar formulario
      setNuevoProducto({
        nombre: "",
        descripcion: "",
        codigo: "",
        tipo: "aseo",
        precio: "",
        imagen: null,
      });

      // Actualizar lista de productos
      fetchProducts();
      toast({
        title: "Producto Agregado",
        description: "El producto se ha agregado correctamente.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      toast({
        title: "Error",
        description: "Hubo un error al agregar el producto.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p="8">
      <Heading as="h1" size="xl" mb="8">
        Bienvenido, {user ? user.nombre : "usuario"}
      </Heading>

      {/* Formulario para agregar productos */}
      <Box mb="8" p="6" borderWidth="1px" borderRadius="md">
        <Heading as="h3" size="lg" mb="4">
          Agregar Nuevo Producto
        </Heading>
        <form onSubmit={handleSubmitProduct}>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel htmlFor="nombre">Nombre:</FormLabel>
              <Input
                id="nombre"
                name="nombre"
                value={nuevoProducto.nombre}
                onChange={handleInputChange}
                placeholder="Nombre del producto"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="descripcion">Descripción:</FormLabel>
              <Input
                id="descripcion"
                name="descripcion"
                value={nuevoProducto.descripcion}
                onChange={handleInputChange}
                placeholder="Descripción del producto"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="codigo">Código:</FormLabel>
              <Input
                id="codigo"
                name="codigo"
                value={nuevoProducto.codigo}
                onChange={handleInputChange}
                placeholder="Código del producto"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="tipo">Tipo:</FormLabel>
              <Select
                id="tipo"
                name="tipo"
                value={nuevoProducto.tipo}
                onChange={handleInputChange}
                placeholder="Selecciona un tipo"
              >
                <option value="aseo">Aseo</option>
                <option value="bebidas">Bebidas</option>
                <option value="carnes">Carnes</option>
                <option value="lacteos">Lácteos</option>
                <option value="pastas">Pastas</option>
                <option value="snacks">Snacks</option>
                <option value="otros">Otros</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="precio">Precio:</FormLabel>
              <Input
                id="precio"
                name="precio"
                type="number"
                value={nuevoProducto.precio}
                onChange={handleInputChange}
                placeholder="Precio del producto"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="imagen">Imagen:</FormLabel>
              <Input
                id="imagen"
                name="imagen"
                type="file"
                accept="image/*"
                onChange={handleInputChange}
              />
            </FormControl>
            <Button leftIcon={<AddIcon />} colorScheme="brand" type="submit">
              Agregar Producto
            </Button>
          </VStack>
        </form>
      </Box>

      {/* Lista de productos */}
      <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={6}>
        {products.map((product) => (
          <GridItem key={product.id} p="4" borderWidth="1px" borderRadius="md">
            {product.imagen && (
              <Image
                src={product.imagen}
                alt={product.nombre}
                boxSize="100px"
                objectFit="cover"
                mb={2}
              />
            )}
            <Text fontWeight="bold">{product.nombre}</Text>
            <IconButton
              icon={<DeleteIcon />}
              colorScheme="red"
              aria-label="Eliminar producto"
              onClick={() => handleDelete(product.id)}
              mt="4"
              size="sm"
            />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
