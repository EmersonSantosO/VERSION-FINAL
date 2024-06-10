// src/components/Home.jsx
import React, { useEffect, useContext } from "react";
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
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useStore } from "../store"; // Asegúrate de que la ruta sea correcta

const Home = () => {
  const { user, isLoading: authLoading } = useContext(AuthContext);
  const { products, setProducts } = useStore();
  const { register, handleSubmit, reset } = useForm();
  const toast = useToast();

  useEffect(() => {
    // Solo ejecuta fetchProducts si el usuario está autenticado y no está cargando
    if (user && !authLoading) {
      const fetchProducts = async () => {
        try {
          const token = localStorage.getItem("token"); // Obtiene el token
          const response = await axios.get("/productos/", {
            headers: {
              Authorization: `Token ${token}`, // Envía el token en la cabecera
            },
          });
          setProducts(response.data); // Actualiza el estado con los productos
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
      fetchProducts();
    }
  }, [toast, setProducts, user, authLoading]);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`/productos/${productId}/`);
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

  const handleCreateProduct = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    try {
      const token = localStorage.getItem("token"); // Obtén el token

      const response = await axios.post("/productos/", formData, {
        headers: {
          Authorization: `Token ${token}`, // Incluye el token en la cabecera
          "Content-Type": "multipart/form-data",
        },
      });
      setProducts([...products, response.data]);
      reset();

      toast({
        title: "Producto Creado",
        description: "El producto se ha creado correctamente.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error al crear producto:", error);
      toast({
        title: "Error",
        description: "Hubo un error al crear el producto.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p="8">
      <Heading as="h1" size="xl" mb="8">
        Bienvenido al Sistema de Bazar
      </Heading>

      {user && user.rol === "admin" && (
        <Box mb="8" p="6" borderWidth="1px" borderRadius="md">
          <Heading as="h3" size="lg" mb="4">
            Agregar Nuevo Producto
          </Heading>
          <form onSubmit={handleSubmit(handleCreateProduct)}>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>Nombre:</FormLabel>
                <Input
                  {...register("nombre")}
                  placeholder="Nombre del producto"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Descripción:</FormLabel>
                <Input
                  {...register("descripcion")}
                  placeholder="Descripción del producto"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Precio:</FormLabel>
                <Input {...register("precio")} placeholder="Precio" />
              </FormControl>
              <FormControl>
                <FormLabel>Imagen:</FormLabel>
                <Input type="file" {...register("imagen")} />
              </FormControl>
              <FormControl>
                <FormLabel>Categoría:</FormLabel>
                <Select
                  {...register("categoria")}
                  placeholder="Selecciona una categoría"
                >
                  <option value="ropa">Ropa</option>
                  <option value="accesorios">Accesorios</option>
                  <option value="electronica">Electrónica</option>
                </Select>
              </FormControl>
              <Button leftIcon={<AddIcon />} colorScheme="brand" type="submit">
                Crear Producto
              </Button>
            </VStack>
          </form>
        </Box>
      )}

      <Box>
        <Heading as="h3" size="lg" mb="4">
          Lista de Productos
        </Heading>
        <Grid templateColumns="repeat(auto-fit, minmax(240px, 1fr))" gap={6}>
          {console.log("Productos antes de map:", products)}
          {products.map((product) => (
            <GridItem key={product.id}>
              <Box borderWidth="1px" borderRadius="md" p="4">
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
                {user && user.rol === "admin" && (
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    aria-label="Eliminar producto"
                    onClick={() => handleDelete(product.id)}
                    mt="4"
                  />
                )}
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
