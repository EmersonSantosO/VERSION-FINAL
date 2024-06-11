// src/components/DataList/DataList.jsx
import React from "react";
import {
  Box,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Spinner,
} from "@chakra-ui/react";

const DataList = ({ data, columns, isLoading, actions }) => {
  return (
    <Box>
      <Heading as="h3" size="lg" mb="4">
        {/* Puedes pasar el título como una prop */}
      </Heading>
      {isLoading ? (
        <Spinner size="lg" />
      ) : data.length > 0 ? (
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              {columns.map((column) => (
                <Th key={column.key}>{column.header}</Th>
              ))}
              {actions && <Th>Acciones</Th>}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item.id}>
                {columns.map((column) => (
                  <Td key={column.key}>
                    {column.render ? column.render(item) : item[column.key]}
                  </Td>
                ))}
                {actions && (
                  <Td>
                    {actions.map((action) => (
                      <Button
                        key={action.key}
                        onClick={() => action.onClick(item)}
                        leftIcon={action.icon}
                        colorScheme="red"
                        size="sm"
                        mr={2}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </Td>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <p>No hay datos disponibles.</p>
      )}
    </Box>
  );
};

export default DataList;
