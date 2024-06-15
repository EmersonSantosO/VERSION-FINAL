// src/components/ProductForm.jsx
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
import useStore from "../store";
import theme from "../theme";

const MotionBox = motion(Box);

const ProductForm = ({ isOpen, onClose }) => {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors, isSubmitting } = formState;
  const addProduct = useStore((state) => state.addProduct);
  const queryClient = useQueryClient();
  const toast = useToast();

  const createProduct = async (data) => {
    try {
      await addProduct(data);
      toast({
        title: "Producto creado",
        description: "El producto se ha creado correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      queryClient.invalidateQueries(["products"]); // Invalida y refetch la query de productos
      reset();
      onClose(); // Cierra el modal
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
      bg={useColorModeValue(
        theme.colors.background.light,
        theme.colors.background.dark
      )}
      color={useColorModeValue(theme.colors.text.light, theme.colors.text.dark)}
    >
      <Heading as="h1" size="xl" mb="8">
        Crear Producto
      </Heading>
      <form onSubmit={handleSubmit(createProduct)}>
        <VStack spacing={4} align="stretch">
          <FormControl isInvalid={errors.nombre}>
            <FormLabel htmlFor="nombre">Nombre</FormLabel>
            <Input
              id="nombre"
              placeholder="Nombre del producto"
              {...register("nombre", { required: "Este campo es requerido" })}
            />
            <FormErrorMessage>
              {errors.nombre && errors.nombre.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.descripcion}>
            <FormLabel htmlFor="descripcion">Descripción</FormLabel>
            <Input
              id="descripcion"
              placeholder="Descripción del producto"
              {...register("descripcion")}
            />
            <FormErrorMessage>
              {errors.descripcion && errors.descripcion.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.codigo}>
            <FormLabel htmlFor="codigo">Código</FormLabel>
            <Input
              id="codigo"
              placeholder="Código del producto"
              {...register("codigo", { required: "Este campo es requerido" })}
            />
            <FormErrorMessage>
              {errors.codigo && errors.codigo.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.tipo}>
            <FormLabel htmlFor="tipo">Tipo</FormLabel>
            <Select
              id="tipo"
              placeholder="Selecciona un tipo"
              {...register("tipo", { required: "Este campo es requerido" })}
            >
              <option value="aseo">Aseo</option>
              <option value="bebidas">Bebidas</option>
              <option value="carnes">Carnes</option>
              <option value="lacteos">Lacteos</option>
              <option value="pastas">Pastas</option>
              <option value="snacks">Snacks</option>
              <option value="otros">Otros</option>
            </Select>
            <FormErrorMessage>
              {errors.tipo && errors.tipo.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.precio}>
            <FormLabel htmlFor="precio">Precio</FormLabel>
            <Input
              id="precio"
              type="number"
              placeholder="Precio del producto"
              {...register("precio", {
                required: "Este campo es requerido",
                min: {
                  value: 0,
                  message: "El precio debe ser mayor o igual a 0",
                },
              })}
            />
            <FormErrorMessage>
              {errors.precio && errors.precio.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="imagen">Imagen</FormLabel>
            <Input
              id="imagen"
              type="file"
              accept="image/*"
              {...register("imagen")}
            />
          </FormControl>
          <Button colorScheme="blue" type="submit" isLoading={isSubmitting}>
            Crear Producto
          </Button>
        </VStack>
      </form>
    </MotionBox>
  );
};

export default ProductForm;
