import type { ReactionCounts, ReactionType } from "@/types";

export type { ReactionType };

export interface CreateReactionDto {
  type: ReactionType;
}

export interface ReactionResponse {
  id: string;
  reactionCounts: ReactionCounts;
}
