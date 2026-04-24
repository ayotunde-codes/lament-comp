import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchReviews, fetchReviewsByOrg, createReview } from "./api";
import { orgKeys } from "@/services/organizations/queries";
import type { CreateReviewDto, ListReviewsParams } from "./types";

type FeedParams = Omit<ListReviewsParams, "cursor">;

export const reviewKeys = {
  all: ["reviews"] as const,
  feed: (params: FeedParams) => [...reviewKeys.all, "feed", params] as const,
  byOrg: (orgId: string, params: FeedParams) =>
    [...reviewKeys.all, "org", orgId, params] as const,
};

export function useReviewsFeed(params?: FeedParams) {
  return useInfiniteQuery({
    queryKey: reviewKeys.feed(params ?? {}),
    queryFn: ({ pageParam }) =>
      fetchReviews({ ...params, cursor: pageParam as string | undefined }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
}

export function useOrgReviews(orgId: string, sort?: ListReviewsParams["sort"]) {
  return useInfiniteQuery({
    queryKey: reviewKeys.byOrg(orgId, { sort }),
    queryFn: ({ pageParam }) =>
      fetchReviewsByOrg(orgId, { sort, cursor: pageParam as string | undefined }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: !!orgId,
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateReviewDto) => createReview(dto),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["reviews", "feed"] });
      queryClient.invalidateQueries({ queryKey: ["reviews", "org", variables.orgId] });
      queryClient.invalidateQueries({ queryKey: orgKeys.detail(variables.orgId) });
    },
  });
}
