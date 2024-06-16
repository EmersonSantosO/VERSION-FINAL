// src/components/Home.jsx
import React, { useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  useColorModeValue,
  Icon,
  Center,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import useStore from "../store";

const MotionVStack = motion(VStack);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

const Home = () => {
  const { user, navbarNeedsUpdate } = useStore((state) => ({
    user: state.user,
    navbarNeedsUpdate: state.navbarNeedsUpdate,
  }));
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  useEffect(() => {
    // ... (useEffect para forzar la actualización) ...
  }, [navbarNeedsUpdate]);

  return (
    <Center h="100vh">
      <MotionVStack
        p="8"
        spacing={4}
        bg={bgColor}
        color={textColor}
        textAlign="center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <MotionHeading
          as="h1"
          size="2xl"
          fontWeight="bold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          Bienvenido a la Aplicación Bazar
        </MotionHeading>
        {user && (
          <MotionText
            fontSize="xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            Hola,{" "}
            <Icon
              as={user.rol === "administrador" ? "Star" : "User"}
              boxSize={6}
              mr={2}
            />{" "}
            {user.nombre}
          </MotionText>
        )}
      </MotionVStack>
    </Center>
  );
};

export default Home;
