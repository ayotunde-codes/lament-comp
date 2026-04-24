export type ReactionType = "LIKE" | "DISLIKE";

export interface CreateReactionDto {
  type: ReactionType;
}

export interface ReactionResponse {
  reviewId: string;
  likes: number;
  dislikes: number;
}
