import React, { useState } from "react";
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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useStore from "../store";
import theme from "../theme";

const MotionBox = motion(Box);

const ProductForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [image, setImage] = useState(null);
  const user = useStore((state) => state.user); // Accede al usuario desde el store
  const navigate = useNavigate();
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
      const response = await axios.post("/productos/", formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: "Producto creado",
        description: "El producto se ha creado correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      reset();
      navigate("/");
    } catch (error) {
      console.error("Error al crear el producto:", error);
      toast({
        title: "Error",
        description: "Hubo un error al crear el producto.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Verifica los roles del usuario desde el store
  if (!user || (user.rol !== "administrador" && user.rol !== "vendedor")) {
    return (
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        p="8"
        bg={bgColor}
        color={textColor}
      >
        <Heading as="h2" size="lg" mb="4">
          No tienes permisos para acceder a esta página.
        </Heading>
      </MotionBox>
    );
  }

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      p="8"
      bg={bgColor}
      color={textColor}
      borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
    >
      <Heading as="h1" size="xl" mb="8">
        Crear Producto
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="stretch">
          {/* ... (campos del formulario) */}
          <Button
            colorScheme="blue"
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
