import { Container } from "@chakra-ui/react";

import { BookDetails, Reviews } from "./elements";

const BookInfo = () => {
  return (
    <Container maxW="container.lg" pt={24} minH="100vh" pb={24}>
      <BookDetails />
      <Reviews />
    </Container>
  );
};

export default BookInfo;
