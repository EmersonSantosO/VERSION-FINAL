import React from "react";
import { Box, Flex, Text, Image, useColorModeValue } from "@chakra-ui/react";
import logoFooter from "../assets/logoFooter.svg"; // Asegúrate de que la ruta sea correcta

const Footer = () => {
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  return (
    <Box
      as="footer"
      py="6"
      bg={bgColor}
      color={textColor}
      borderTop="1px"
      borderColor={borderColor}
    >
      <Flex
        align="center"
        justify="center"
        direction="column"
        textAlign="center"
      >
        <Image
          src={logoFooter}
          alt="Logo"
          boxSize={{ base: "100px", md: "100px" }}
          mb="2"
          border="2px solid"
          borderColor={borderColor}
          p="1"
        />
        <Text fontSize={{ base: "xs", md: "sm" }} mb="1">
          Prototipo
        </Text>
        <Text fontSize={{ base: "xs", md: "sm" }}>
          Proyecto desarrollado para el ramo de "Proyecto de Integración"
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
