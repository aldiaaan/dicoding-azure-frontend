import { BookCatalog } from "./elements";
import { Container } from "@chakra-ui/react";

function Index() {
  return (
    <Container maxW="container.lg" pt={24} minH="100vh" pb={24}>
      <BookCatalog></BookCatalog>
    </Container>
  );
}

export default Index;
