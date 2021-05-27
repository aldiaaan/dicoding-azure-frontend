import { Text, Box, chakra, Skeleton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IBook } from "../../types";

export const Card = (props: IBook) => {
  const { title, author, coverURL, id } = props;
  return (
    <Box width="full" mb="4">
      <Link to={`/book/${id}`}>
        <Box
          height={{ lg: "72", sm: "64" }}
          rounded="md"
          overflow="hidden"
          shadow="md"
        >
          {coverURL ? (
            <chakra.img
              src={coverURL}
              alt={title}
              objectFit="cover"
              h="full"
              maxWidth="auto"
              maxHeight="auto"
              w="full"
            />
          ) : (
            <chakra.div
              h="full"
              w="full"
              display="flex"
              justifyContent="center"
              alignItems="center"
              backgroundColor="gray.100"
            >
              <Text fontWeight="medium" fontSize="large" color="gray.500">
                No Cover
              </Text>
            </chakra.div>
          )}
        </Box>
      </Link>
      <Box px="1.5">
        <Link to={`/book/${id}`}>
          <Box mt="3">
            <Text
              _hover={{
                textDecoration: "underline",
              }}
              lineHeight="shorter"
              color="gray.700"
              fontWeight="medium"
            >
              {title}
            </Text>
          </Box>
        </Link>
        <Text color="gray.500" mt="0.5" fontSize="sm" fontWeight="medium">
          {author}
        </Text>
      </Box>
    </Box>
  );
};

export const CardSkeleton = () => {
  return (
    <Box width="full" mb="4">
      <Skeleton height={{ lg: "72", sm: "64" }}></Skeleton>
      <Box>
        <Skeleton height="12px" mt="3" />
        <Skeleton height="12px" mt="2" />
      </Box>
    </Box>
  );
};
