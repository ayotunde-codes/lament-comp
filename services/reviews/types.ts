import type { Review, Tenure, Role, EmploymentStatus } from "@/types";

export type { Review };

export interface CreateReviewDto {
  orgId: string;
  rating: number;
  heading: string;
  body: string;
  emoji?: string;
  voiceUrl?: string;
  tags?: string[];
  tenure?: Tenure;
  role?: Role;
  status?: EmploymentStatus;
}

export interface ListReviewsParams {
  sort?: "latest" | "top" | "lowest";
  cursor?: string;
  limit?: number;
  tag?: string;
}

export interface CursorPage<T> {
  data: T[];
  nextCursor: string | null;
}
