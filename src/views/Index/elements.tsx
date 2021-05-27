import React from "react";
import { Button, Box, Text, Container, Grid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

import { Card } from "../../components/Card";
import DefaultError from "../../components/DefaultError";
import DefaultFallback from "../../components/DefaultFallback";
import { useBooks } from "../../api";

export const BookCatalog = () => {
  const [page] = React.useState(1);

  const { isError, data, isFetching, isLoading } = useBooks({ page });

  if (isError) return <DefaultError />;

  if (isLoading) return <DefaultFallback />;

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Text fontSize="x-large" color="gray.600" fontWeight="medium">
          Katalog
        </Text>
        <Link to="/book/add">
          <Button leftIcon={<FiPlus />} variant="outline">
            Tambah Buku
          </Button>
        </Link>
      </Box>
      <Grid
        mt="8"
        templateColumns={{
          lg: "repeat(4, 1fr)",
          md: "repeat(3, 1fr)",
          sm: "repeat(2, 1fr)",
        }}
        gap={{ sm: 4, md: 8 }}
      >
        {data?.books.map((book) => (
          <Card {...book} key={book.id} />
        ))}
      </Grid>
    </div>
  );
};
