import type { Review } from "@/types";

export type { Review };

export interface CreateReviewDto {
  orgId: string;
  rating: number;
  heading: string;
  body: string;
  emoji?: string;
  voiceUrl?: string;
}

export interface ListReviewsParams {
  sort?: "latest" | "top" | "lowest";
  cursor?: string;
  limit?: number;
}

export interface CursorPage<T> {
  data: T[];
  nextCursor: string | null;
}
