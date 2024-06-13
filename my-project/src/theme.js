import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.100",
        color: "gray.800",
      },
    },
  },
  colors: {
    brand: {
      500: "#2b6cb0",
      600: "#2c5282",
      200: "#90cdf4",
    },
    background: {
      light: "gray.100",
      dark: "gray.800",
    },
    text: {
      light: "gray.800",
      dark: "white",
    },
  },
});

export default theme;
