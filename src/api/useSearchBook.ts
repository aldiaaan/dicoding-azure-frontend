import { useQuery } from "react-query";
import axios from "axios";

import { API_ROOT } from "../const";
import { IBook } from "../types";

export interface UseSearchBookResult {
  books: Array<{
    document: IBook;
    score: number;
  }>;
}

export const useSearchBook = (query: string | null) => {
  return useQuery<UseSearchBookResult>([query], async () => {
    const { data } = await axios.get(`${API_ROOT}/books/search?query=${query}`);
    return data;
  });
};
