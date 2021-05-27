import { Text, Box, Container } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import SearchBar from "../SearchBar";

function Navbar() {
  return (
    <Box
      h={16}
      shadow="sm"
      position="fixed"
      top={0}
      right={0}
      left={0}
      bg="white"
      zIndex={10}
    >
      <Box h={16} shadow="xs" display="flex" alignItems="center">
        <Container maxW="container.lg" display="flex" alignItems="center">
          <Box mr="auto" display="flex" alignItems="center" width="full">
            <Link to="/">
              <Text fontWeight="semibold" fontSize="xl" color="gray.600">
                BookCatalog
              </Text>
            </Link>
            <Box flexGrow={1} ml="8">
              <SearchBar />
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Navbar;
