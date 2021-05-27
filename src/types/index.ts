export type IBook = {
  id: string;
  createdAt: string;
  author: string;
  synopsis: string;
  title: string;
  coverURL: string;
  releaseYear: string;
};

export type IReview = {
  reviewerName: string;
  rating: number;
  comment: string;
  id: number;
};

export interface IPaginationResult {
  total: number;
  currentPage: number;
}
