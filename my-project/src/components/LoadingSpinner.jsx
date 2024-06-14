// src/components/LoadingSpinner.jsx
import React from "react";
import { Box, Spinner } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const LoadingSpinner = () => {
  return (
    <MotionBox
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Spinner size="xl" />
    </MotionBox>
  );
};

export default LoadingSpinner;
