import { useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { reactToReview, undoReaction } from "./api";
import { reviewKeys } from "@/services/reviews/queries";
import type { ReactionType } from "./types";
import type { CursorPage } from "@/services/reviews/types";
import type { Review, ReactionCounts } from "@/types";

interface ReactVariables {
  reviewId: string;
  type: ReactionType;
  previousType: ReactionType | null;
}

interface UndoVariables {
  reviewId: string;
  previousType: ReactionType;
}

type ReviewCache = InfiniteData<CursorPage<Review>>;

function applyDelta(counts: ReactionCounts, type: ReactionType, delta: number): ReactionCounts {
  const next = { ...counts };
  next[type] = Math.max(0, (next[type] ?? 0) + delta);
  return next;
}

function patchReview(
  data: ReviewCache,
  reviewId: string,
  patch: (counts: ReactionCounts) => ReactionCounts
): ReviewCache {
  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      data: page.data.map((r) =>
        r.id === reviewId ? { ...r, reactionCounts: patch(r.reactionCounts) } : r
      ),
    })),
  };
}

function patchAllCaches(
  queryClient: ReturnType<typeof useQueryClient>,
  reviewId: string,
  patch: (counts: ReactionCounts) => ReactionCounts
) {
  const snapshots = queryClient.getQueriesData<ReviewCache>({ queryKey: reviewKeys.all });
  for (const [key, data] of snapshots) {
    if (data) queryClient.setQueryData(key, patchReview(data, reviewId, patch));
  }
  return snapshots;
}

export function useReactToReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ reviewId, type }: ReactVariables) =>
      reactToReview(reviewId, { type }),
    onMutate: async ({ reviewId, type, previousType }) => {
      await queryClient.cancelQueries({ queryKey: reviewKeys.all });
      const snapshots = patchAllCaches(queryClient, reviewId, (counts) => {
        let next = counts;
        if (previousType && previousType !== type) next = applyDelta(next, previousType, -1);
        if (previousType !== type) next = applyDelta(next, type, +1);
        return next;
      });
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
    mutationFn: ({ reviewId }: UndoVariables) => undoReaction(reviewId),
    onMutate: async ({ reviewId, previousType }) => {
      await queryClient.cancelQueries({ queryKey: reviewKeys.all });
      const snapshots = patchAllCaches(queryClient, reviewId, (counts) =>
        applyDelta(counts, previousType, -1)
      );
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
