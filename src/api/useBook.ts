import { useQuery } from "react-query";
import axios from "axios";

import { API_ROOT } from "../const";
import { IBook } from "../types";

export interface UseBookProps {
  id: string;
}

export interface UseBookResult extends IBook {}

export const useBook = ({ id }: UseBookProps) => {
  return useQuery<UseBookResult>(
    ["book", id],
    async () => {
      const { data } = await axios.get(`${API_ROOT}/book/${id}`);
      return data;
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
};
