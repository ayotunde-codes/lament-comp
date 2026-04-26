export type ReactionType = "LIKE" | "DISLIKE";

export interface CreateReactionDto {
  type: ReactionType;
}

export interface ReactionResponse {
  id: string;
  likes: number;
  dislikes: number;
}
