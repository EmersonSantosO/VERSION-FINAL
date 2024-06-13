import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

const InputComponent = ({
  label,
  id,
  placeholder,
  error,
  register,
  ...rest
}) => (
  <FormControl isInvalid={error}>
    <FormLabel htmlFor={id}>{label}</FormLabel>
    <Input id={id} placeholder={placeholder} {...register} {...rest} />
    <FormErrorMessage>{error && error.message}</FormErrorMessage>
  </FormControl>
);

export default InputComponent;
