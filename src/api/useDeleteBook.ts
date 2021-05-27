import { useMutation, UseMutationOptions } from "react-query";
import axios from "axios";

import { API_ROOT } from "../const";

export interface UseDeleteBookProps {
  id: string;
  options?: UseMutationOptions;
}

export const useDeleteBook = ({ id, options }: UseDeleteBookProps) => {
  return useMutation<any>(
    async () => {
      await axios.delete(`${API_ROOT}/book/${id}/delete`);
    },
    { ...options }
  );
};
