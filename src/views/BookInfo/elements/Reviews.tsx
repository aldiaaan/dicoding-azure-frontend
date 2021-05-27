import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  Tooltip,
  VisuallyHidden,
  Skeleton,
  Button,
  chakra,
  Text,
  Input,
  Box,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
  CloseButton,
  Avatar,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router-dom";

import { useReviews } from "../../../api/";
import { IReview } from "../../../types";
import { API_ROOT } from "../../../const/";
import { omit } from "lodash";

interface BookInfoParams {
  id: string;
}

export interface RatingStarsProps {
  rating: number;
}

export const RatingStars = (props: RatingStarsProps) => {
  const { rating, ...rest } = props;
  return (
    <chakra.span
      ml="2"
      fontFamily="Times"
      fontSize="lg"
      aria-label={`rated ${rating}`}
      __css={{
        "--percent": `calc(${rating}/ 5 * 100%)`,
        " --star-color": "var(--chakra-colors-gray-300)",
        "--star-background": "#fc0",
        "&::before": {
          content: `"★★★★★"`,
          letterSpacing: 2,
          background:
            "linear-gradient(90deg, var(--star-background) var(--percent), var(--star-color) var(--percent))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        },
      }}
      {...rest}
    />
  );
};

export interface RatingInputProps
  extends React.ComponentPropsWithoutRef<"link"> {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export const RatingInput = React.forwardRef<HTMLInputElement, RatingInputProps>(
  (props, ref) => {
    const { inputProps } = props;

    const [rating, setRating] = React.useState(0);

    const onClick = (index: number) => {
      if (!isNaN(index)) {
        if (rating === 1 && index === 1) {
          setRating(0);
        } else {
          setRating(index);
        }
      }
    };

    return (
      <>
        <VisuallyHidden>
          <input ref={ref} value={rating} tabIndex={-1} {...inputProps}></input>
        </VisuallyHidden>
        {new Array(5).fill(0).map((val, index) => (
          <Tooltip placement="top" hasArrow label={`Rate ${index + 1}`}>
            <Button
              tabIndex={-1}
              key={index}
              onClick={() => onClick(index + 1)}
              fontFamily="Times"
              fontSize="x-large"
              _focus={{ outline: "none" }}
              __css={{
                color:
                  index < rating ? "#fc0" : "var(--chakra-colors-gray-300)",
              }}
            >
              ★
            </Button>
          </Tooltip>
        ))}
      </>
    );
  }
);

interface ReviewProps extends IReview {}

export const Review = (props: ReviewProps) => {
  const { reviewerName, rating, comment } = props;
  return (
    <Box display="flex" mb="8">
      <Box mr="6">
        <Avatar
          bgColor="gray.400"
          color="gray.100"
          name={reviewerName}
        ></Avatar>
      </Box>
      <Box>
        <Text color="gray.500">
          <Text as="span" color="gray.600" fontWeight="medium">
            {reviewerName}
          </Text>{" "}
          rated it
          <RatingStars
            rating={rating}
            aria-label={`${reviewerName} rated it ${rating}`}
          />
        </Text>
        <Text
          mt="3"
          fontSize="sm"
          lineHeight="tall"
          whiteSpace="pre-wrap"
          wordBreak="break-word"
        >
          {comment}
        </Text>
      </Box>
    </Box>
  );
};

export const ReviewsRendererSekeleton = () => {
  return (
    <>
      {new Array(3).fill(0).map((value, index) => (
        <Skeleton mb={3} key={index} height="24" width="full" />
      ))}
    </>
  );
};

export const ReviewsRenderer = (props: {
  reviews: IReview[] | undefined;
  isLoading: boolean;
}) => {
  const { isLoading, reviews } = props;

  if (isLoading && !reviews) return <ReviewsRendererSekeleton />;

  return (
    <Box display="flex" flexDirection="column-reverse">
      {reviews?.map((review) => (
        <Review {...review} key={review.id} />
      ))}
    </Box>
  );
};

export const ReviewsHeader = () => {};

export const ReviewForm = ({ open }: { open: boolean }) => {
  const { id } = useParams<BookInfoParams>();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (review) => axios.post(`${API_ROOT}/book/${id}/review`, review),
    {
      onSuccess: ({ data }) => {
        queryClient.setQueryData(["reviews", id], (cached: any) => {
          return {
            ...cached,
            reviews: [...cached.reviews, omit(data.review, "book")],
          };
        });
      },
    }
  );
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    mutation.mutate(data);
    // console.log(data);
  };
  return (
    <>
      {open && (
        <Box mb="8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl id="reviewerName" mb="4">
              <FormLabel color="gray.600">Nama</FormLabel>
              <Input
                ref={register}
                name="reviewerName"
                placeholder="reviewerName"
                spellCheck="false"
                autoComplete="off"
                reviewerName="reviewerName"
              />
            </FormControl>
            <FormControl id="review" mb="4">
              <FormLabel color="gray.600">Komen</FormLabel>
              <Textarea
                placeholder="Review"
                spellCheck="false"
                autoComplete="off"
                name="comment"
                reviewerName="comment"
                ref={register}
              />
            </FormControl>
            <Box display="flex" justifyContent="flex-end" alignItems="center">
              <Box mr="4">
                <RatingInput ref={register} inputProps={{ name: "rating" }} />
              </Box>
              <Button type="submit" isLoading={mutation.isLoading}>
                Tambah Review
              </Button>
            </Box>
          </form>
        </Box>
      )}
    </>
  );
};

export const Reviews = () => {
  const { id } = useParams<BookInfoParams>();
  const [page, setPage] = React.useState(1);
  const { data, isLoading, isError } = useReviews({ page, id });
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isError) return <div></div>;

  return (
    <Box mt="8">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="6"
      >
        <Text
          fontSize="xl"
          letterSpacing="tight"
          fontWeight="medium"
          color="gray.600"
        >
          Reviews
        </Text>
        {!isOpen ? (
          <Button variant="outline" onClick={onOpen}>
            Tambah Review
          </Button>
        ) : (
          <CloseButton size="sm" onClick={onClose} />
        )}
      </Box>
      <ReviewForm open={isOpen} />
      <ReviewsRenderer reviews={data?.reviews} isLoading={isLoading} />
    </Box>
  );
};
