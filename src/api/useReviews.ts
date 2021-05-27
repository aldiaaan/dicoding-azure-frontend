import { IReview, IPaginationResult } from "../types";
import { API_ROOT } from "../const";

import { useQuery } from "react-query";
import axios from "axios";

export interface UseReviewsResult extends IPaginationResult {
  reviews: Array<IReview>;
}

interface UseReviewsProps {
  page: number;
  id: string;
}

export const useReviews = ({ page, id }: UseReviewsProps) => {
  return useQuery<UseReviewsResult>(
    ["reviews", id],
    async () => {
      const { data } = await axios.get(
        `${API_ROOT}/book/${id}/reviews?limit=10000`
      );
      return data;
    },
    {
      retry: false,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
};
