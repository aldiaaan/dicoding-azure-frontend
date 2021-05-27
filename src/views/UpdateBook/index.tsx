import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Container, Box, Button } from "@chakra-ui/react";
import { useMutation } from "react-query";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

import BookForm from "../../components/BookForm";
import { API_ROOT } from "../../const";
import { IBook } from "../../types";
import { useBook } from "../../api";
import DefaultFallback from "../../components/DefaultFallback";

const schema = yup.object().shape({
  releaseYear: yup.number(),
});

const AddBook = () => {
  const { id } = useParams<{ id: string }>();

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const history = useHistory();

  const mutation = useMutation<{ book: IBook }>(
    // @ts-ignore
    async (form: IBook) => {
      const { data } = await axios.patch(
        `${API_ROOT}/book/${id}/update`,
        form,
        {
          headers: { "content-type": "multipart/form-data" },
        }
      );
      return data;
    },
    {
      onSuccess: ({ book }) => {
        history.push(`/book/${book?.id}`);
        // console.log(book);
      },
    }
  );

  const { data, isLoading } = useBook({ id });

  console.log(data);
  console.log("-----------");

  const onSubmit = (data: any) => {
    const newBook = new FormData();
    for (const key in data) {
      switch (key) {
        case "cover":
          newBook.append(key, data[key][0]);
          break;
        default:
          if (data[key]) newBook.append(key, data[key]);
      }
    }
    // @ts-ignore
    mutation.mutate(newBook);
  };

  console.log("sxxx");

  if (isLoading) return <DefaultFallback />;

  return (
    <Container maxWidth="container.lg" pt={24} pb={12}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <BookForm {...data!} />
          <Box display="flex" justifyContent="flex-end">
            <Button
              colorScheme="blue"
              type="submit"
              isLoading={mutation.isLoading}
            >
              Submit
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Container>
  );
};

export default AddBook;
