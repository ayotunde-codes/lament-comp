import { useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { reactToReview, undoReaction } from "./api";
import { reviewKeys } from "@/services/reviews/queries";
import type { ReactionType } from "./types";
import type { CursorPage } from "@/services/reviews/types";
import type { Review } from "@/types";

interface ReactVariables {
  reviewId: string;
  type: ReactionType;
}

type ReviewCache = InfiniteData<CursorPage<Review>>;

function patchReview(
  data: ReviewCache,
  reviewId: string,
  delta: { likes?: number; dislikes?: number }
): ReviewCache {
  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      data: page.data.map((r) =>
        r.id === reviewId
          ? { ...r, likes: r.likes + (delta.likes ?? 0), dislikes: r.dislikes + (delta.dislikes ?? 0) }
          : r
      ),
    })),
  };
}

export function useReactToReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ reviewId, type }: ReactVariables) =>
      reactToReview(reviewId, { type }),
    onMutate: async ({ reviewId, type }) => {
      await queryClient.cancelQueries({ queryKey: reviewKeys.all });
      const snapshots = queryClient.getQueriesData<ReviewCache>({ queryKey: reviewKeys.all });
      const delta = type === "LIKE" ? { likes: 1 } : { dislikes: 1 };
      for (const [key, data] of snapshots) {
        if (data) queryClient.setQueryData(key, patchReview(data, reviewId, delta));
      }
      return { snapshots };
    },
    onError: (_err, _vars, context) => {
      for (const [key, data] of context?.snapshots ?? []) {
        queryClient.setQueryData(key, data);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: reviewKeys.all });
    },
  });
}

export function useUndoReaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ reviewId }: ReactVariables) => undoReaction(reviewId),
    onMutate: async ({ reviewId, type }) => {
      await queryClient.cancelQueries({ queryKey: reviewKeys.all });
      const snapshots = queryClient.getQueriesData<ReviewCache>({ queryKey: reviewKeys.all });
      const delta = type === "LIKE" ? { likes: -1 } : { dislikes: -1 };
      for (const [key, data] of snapshots) {
        if (data) queryClient.setQueryData(key, patchReview(data, reviewId, delta));
      }
      return { snapshots };
    },
    onError: (_err, _vars, context) => {
      for (const [key, data] of context?.snapshots ?? []) {
        queryClient.setQueryData(key, data);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: reviewKeys.all });
    },
  });
}
