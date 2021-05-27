import { Container, Text, Box, chakra } from "@chakra-ui/react";
import { withRouter, Link } from "react-router-dom";

import { useSearchBook, UseSearchBookResult } from "../../api/useSearchBook";
import { IBook } from "../../types";

const BookResult = (props: IBook) => {
  const { title, author, coverURL, releaseYear, id } = props;
  return (
    <Box display="flex" mb="4">
      <Box>
        <Box width="12" height="16" overflow="hidden" rounded="md">
          {coverURL ? (
            <chakra.img
              objectFit="cover"
              height="full"
              width="full"
              src={coverURL}
            ></chakra.img>
          ) : (
            <Box width="full" height="full" bg="gray.100"></Box>
          )}
        </Box>
      </Box>
      <Box ml="4">
        <Text
          as={Link}
          _hover={{
            textDecoration: "underline",
          }}
          to={`/book/${id}`}
          fontWeight="medium"
          textColor="gray.800"
        >
          {title}
        </Text>
        <Text fontSize="sm" textColor="gray.600">
          {author}
        </Text>
      </Box>
    </Box>
  );
};

const BooksRenderer = (props: { data: UseSearchBookResult }) => {
  const { data } = props;
  return (
    <>
      {data.books.map(({ document }) => (
        <BookResult {...document} key={document.id} />
      ))}
    </>
  );
};

// @ts-ignore
const SearchResult = (props) => {
  const queries = new URLSearchParams(props.location.search);
  const term = queries.get("query");

  const { data, isLoading } = useSearchBook(term);

  return (
    <Container maxW="container.lg" pt={24} minH="100vh" pb={24}>
      <Text mb="8" fontSize="xl" fontWeight="medium" color="gray.600">
        Search Results for {term}
      </Text>
      {isLoading && !data ? <p>loading...</p> : <BooksRenderer data={data!} />}
    </Container>
  );
};

export default withRouter(SearchResult);
