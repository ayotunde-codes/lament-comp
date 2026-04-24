import apiClient from "@/services/api-client";
import type { Review, CreateReviewDto, ListReviewsParams, CursorPage } from "./types";

export function fetchReviews(params?: ListReviewsParams): Promise<CursorPage<Review>> {
  return apiClient.get("/reviews", { params }) as unknown as Promise<CursorPage<Review>>;
}

export function fetchReviewsByOrg(
  orgId: string,
  params?: ListReviewsParams
): Promise<CursorPage<Review>> {
  return apiClient.get(`/reviews/org/${orgId}`, {
    params,
  }) as unknown as Promise<CursorPage<Review>>;
}

export function createReview(dto: CreateReviewDto): Promise<Review> {
  return apiClient.post("/reviews", dto) as unknown as Promise<Review>;
}
