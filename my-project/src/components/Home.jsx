// src/components/Home.jsx
import React from "react";
import { Box, Heading, useColorModeValue } from "@chakra-ui/react";

const Home = () => {
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Box p="8" bg={bgColor} color={textColor}>
      <Heading as="h1" size="xl">
        Bienvenido a la Aplicación Bazar
      </Heading>
    </Box>
  );
};

export default Home;
