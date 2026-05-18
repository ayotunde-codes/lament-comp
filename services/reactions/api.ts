import apiClient from "@/services/api-client";
import type { CreateReactionDto, ReactionResponse } from "./types";

export function reactToReview(
  reviewId: string,
  dto: CreateReactionDto
): Promise<ReactionResponse> {
  return apiClient.post(
    `/reviews/${reviewId}/react`,
    dto
  ) as unknown as Promise<ReactionResponse>;
}

export function undoReaction(reviewId: string): Promise<ReactionResponse> {
  return apiClient.delete(
    `/reviews/${reviewId}/react`
  ) as unknown as Promise<ReactionResponse>;
}
