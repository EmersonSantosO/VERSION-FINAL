import React from "react";
import {
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";

const SelectComponent = ({
  label,
  id,
  placeholder,
  error,
  register,
  children,
  ...rest
}) => (
  <FormControl isInvalid={error}>
    <FormLabel htmlFor={id}>{label}</FormLabel>
    <Select id={id} placeholder={placeholder} {...register} {...rest}>
      {children}
    </Select>
    <FormErrorMessage>{error && error.message}</FormErrorMessage>
  </FormControl>
);

export default SelectComponent;
