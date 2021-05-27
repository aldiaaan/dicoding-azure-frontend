import { IBook } from "../types";
import { API_ROOT } from "../const";

import { useQuery } from "react-query";
import axios from "axios";

export interface UseBooksResult {
  books: Array<IBook>;
}

interface UseBooksProps {
  page: number;
}

export const useBooks = ({ page }: UseBooksProps) => {
  return useQuery<UseBooksResult>(
    ["books", page],
    async () => {
      const { data } = await axios.get(
        `${API_ROOT}/books?page=${page}&limit=1000`
      );

      return data;
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
};
