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
  FormErrorMessage,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import theme from "../theme";
import useStore from "../store";

const MotionBox = motion(Box);

const ProductForm = () => {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors, isSubmitting } = formState;
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toast = useToast();
  const fetchProducts = useStore((state) => state.fetchProducts);

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

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const createProduct = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    formData.append("imagen", image);

    try {
      const token = localStorage.getItem("token");
      await axios.post("/productos/", formData, {
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

      fetchProducts(); // Fetch products again to update the list
      reset();
      navigate("/productos");
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
      <form onSubmit={handleSubmit(createProduct)}>
        <VStack spacing={4} align="stretch">
          <InputComponent
            inputBg={inputBg}
            textColor={textColor}
            label="Nombre"
            id="nombre"
            placeholder="Nombre del producto"
            error={errors.nombre}
            register={register("nombre", {
              required: "Este campo es requerido",
            })}
          />
          <InputComponent
            inputBg={inputBg}
            label="Descripción"
            id="descripcion"
            placeholder="Descripción del producto"
            error={errors.descripcion}
            register={register("descripcion")}
          />
          <InputComponent
            inputBg={inputBg}
            label="Código"
            id="codigo"
            placeholder="Código del producto"
            error={errors.codigo}
            register={register("codigo", {
              required: "Este campo es requerido",
            })}
          />
          <SelectComponent
            inputBg={inputBg}
            textColor={textColor}
            label="Tipo"
            id="tipo"
            placeholder="Selecciona un tipo"
            error={errors.tipo}
            register={register("tipo", { required: "Este campo es requerido" })}
          >
            <option value="aseo">Aseo</option>
            <option value="bebidas">Bebidas</option>
            <option value="carnes">Carnes</option>
            <option value="lacteos">Lacteos</option>
            <option value="pastas">Pastas</option>
            <option value="snacks">Snacks</option>
            <option value="otros">Otros</option>
          </SelectComponent>
          <InputComponent
            inputBg={inputBg}
            label="Precio"
            id="precio"
            placeholder="Precio del producto"
            type="number"
            error={errors.precio}
            register={register("precio", {
              required: "Este campo es requerido",
              min: {
                value: 0,
                message: "El precio debe ser mayor o igual a 0",
              },
            })}
          />
          <FormControl>
            <FormLabel htmlFor="imagen">Imagen:</FormLabel>
            <Input
              id="imagen"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </FormControl>
          <Button
            colorScheme="blue"
            type="submit"
            bg={buttonBg}
            _hover={{ bg: useColorModeValue("brand.600", "brand.300") }}
            isLoading={isSubmitting}
          >
            Crear Producto
          </Button>
        </VStack>
      </form>
    </MotionBox>
  );
};

const InputComponent = ({
  label,
  id,
  placeholder,
  error,
  register,
  inputBg,
  textColor,
  ...rest
}) => (
  <FormControl isInvalid={error}>
    <FormLabel htmlFor={id}>{label}:</FormLabel>
    <Input
      id={id}
      placeholder={placeholder}
      bg={inputBg}
      color={textColor}
      {...register}
      {...rest}
    />
    <FormErrorMessage>{error && error.message}</FormErrorMessage>
  </FormControl>
);

const SelectComponent = ({
  label,
  id,
  placeholder,
  error,
  register,
  inputBg,
  textColor,
  children,
  ...rest
}) => (
  <FormControl isInvalid={error}>
    <FormLabel htmlFor={id}>{label}:</FormLabel>
    <Select
      id={id}
      placeholder={placeholder}
      bg={inputBg}
      color={textColor}
      {...register}
      {...rest}
    >
      {children}
    </Select>
    <FormErrorMessage>{error && error.message}</FormErrorMessage>
  </FormControl>
);

export default ProductForm;
