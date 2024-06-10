import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import theme from "../theme"; // Importa tu tema de colores

const MotionBox = motion(Box);

const ProductForm = () => {
  const { register, handleSubmit } = useForm();
  const [image, setImage] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Colores adaptativos al tema
  const bgColor = useColorModeValue(
    theme.colors.background.light,
    theme.colors.background.dark
  );
  const textColor = useColorModeValue(
    theme.colors.text.light,
    theme.colors.text.dark
  );
  const buttonBg = useColorModeValue(
    theme.colors.brand.light,
    theme.colors.brand.dark
  );
  const inputBg = useColorModeValue("gray.100", "gray.700");

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("nombre", data.nombre);
    formData.append("descripcion", data.descripcion);
    formData.append("codigo", data.codigo);
    formData.append("tipo", data.tipo);
    formData.append("precio", data.precio);
    if (image) {
      formData.append("imagen", image);
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post("/productos/", formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  if (!user || (user.rol !== "administrador" && user.rol !== "vendedor")) {
    return <p>No tienes permisos para acceder a esta página.</p>;
  }

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
        Crear Producto
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Nombre:</FormLabel>
            <Input
              {...register("nombre")}
              placeholder="Nombre"
              required
              bg={inputBg}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Descripción:</FormLabel>
            <Input
              {...register("descripcion")}
              placeholder="Descripción"
              required
              bg={inputBg}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Código:</FormLabel>
            <Input
              {...register("codigo")}
              placeholder="Código"
              required
              bg={inputBg}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Tipo:</FormLabel>
            <Select
              {...register("tipo")}
              placeholder="Selecciona el tipo de producto"
              required
              bg={inputBg}
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
            <FormLabel>Precio:</FormLabel>
            <Input
              {...register("precio")}
              type="number"
              step="0.01"
              placeholder="Precio"
              required
              bg={inputBg}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Imagen:</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              bg={inputBg}
            />
          </FormControl>
          <Button
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
  );
};

export default ProductForm;
