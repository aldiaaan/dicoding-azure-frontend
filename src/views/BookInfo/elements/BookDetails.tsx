import {
  Skeleton,
  SkeletonText,
  Box,
  Text,
  chakra,
  IconButton,
  ButtonGroup,
  Tooltip,
} from "@chakra-ui/react";
import { FiTrash2, FiEdit3 } from "react-icons/fi";
import { Link, useHistory, useParams } from "react-router-dom";

import { useBook, useDeleteBook } from "../../../api";
import DefaultError from "../../../components/DefaultError";

interface BookInfoParams {
  id: string;
}

export const BookDetailsSkeleton = () => {
  return (
    <Box display="flex">
      <Box flexGrow={1} mr="16">
        <Skeleton width="52" height="4" />
        <Skeleton width="32" mt="2" height="4" />
        <Box mt="8">
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
        </Box>
      </Box>
      <Box>
        <Skeleton width="56" rounded="md" h="72"></Skeleton>
      </Box>
    </Box>
  );
};

export const DeleteBookButton = ({ id }: { id: string }) => {
  const history = useHistory();

  const mutation = useDeleteBook({
    id,
    options: {
      onSuccess: () => {
        history.push("/");
      },
    },
  });
  return (
    <Tooltip hasArrow label="Delete Book">
      <IconButton
        aria-label="Delete book"
        fontSize="xl"
        color="var(--chakra-colors-red-500)"
        icon={<FiTrash2 />}
        isLoading={mutation.isLoading}
        onClick={() => mutation.mutate()}
      />
    </Tooltip>
  );
};

export const BookDetails = () => {
  const { id } = useParams<BookInfoParams>();
  const { data, isLoading, isError } = useBook({ id });

  if (isError) return <DefaultError />;

  if (isLoading && !data) return <BookDetailsSkeleton />;

  return (
    <div>
      <Box display="flex">
        <Box flexGrow={1} mr="16">
          <Box display="flex" justifyContent="space-between">
            <Text
              fontSize="xl"
              letterSpacing="tight"
              fontWeight="medium"
              color="gray.600"
            >
              {data?.title || "No Title"}
            </Text>
            <ButtonGroup isAttached variant="outline">
              <Tooltip hasArrow label="Update Book">
                <IconButton
                  as={Link}
                  to={`/book/${id}/update`}
                  aria-label="Update book"
                  fontSize="xl"
                  mr="3"
                  icon={<FiEdit3 />}
                />
              </Tooltip>
              <DeleteBookButton id={id} />
            </ButtonGroup>
          </Box>
          <Text
            lineHeight="taller"
            color="gray.500"
            fontSize="sm"
            fontWeight="medium"
          >
            By{" "}
            <Text as="span" color="blue.600">
              {data?.author || "Unknown author"}{" "}
            </Text>
            · {data?.releaseYear || "-"}
          </Text>
          <Box mt="8">
            <Text
              mt="4"
              color="gray.600"
              whiteSpace="pre-wrap"
              wordBreak="break-word"
              fontSize="md"
            >
              {data?.synopsis}
            </Text>
          </Box>
        </Box>
        <Box>
          <Box
            width="56"
            rounded="md"
            h="72"
            flexShrink={0}
            overflow="hidden"
            position="relative"
          >
            {data?.coverURL ? (
              <chakra.img
                objectFit="cover"
                h="full"
                maxWidth="auto"
                maxHeight="auto"
                w="full"
                src={data?.coverURL}
              ></chakra.img>
            ) : (
              <Box
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
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
};
