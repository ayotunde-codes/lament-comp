import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  type InfiniteData,
} from '@tanstack/react-query'
import { fetchComments, postComment } from './api'
import type { Comment, CreateCommentDto, CursorPage } from './types'

export const commentKeys = {
  all: ['comments'] as const,
  byReview: (reviewId: string) => [...commentKeys.all, 'review', reviewId] as const,
}

export function useComments(reviewId: string, enabled = true) {
  return useInfiniteQuery({
    queryKey: commentKeys.byReview(reviewId),
    queryFn: ({ pageParam }) =>
      fetchComments(reviewId, { cursor: pageParam as string | undefined }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: enabled && !!reviewId,
  })
}

export function usePostComment(reviewId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (dto: CreateCommentDto) => postComment(reviewId, dto),

    // Optimistic insert at the end of the first page
    onMutate: async (dto) => {
      await queryClient.cancelQueries({ queryKey: commentKeys.byReview(reviewId) })

      const previous = queryClient.getQueryData<InfiniteData<CursorPage<Comment>>>(
        commentKeys.byReview(reviewId),
      )

      const optimistic: Comment = {
        id: `optimistic-${Date.now()}`,
        reviewId,
        username: '…',
        avatar: '',
        avatarColor: '#6FA88E',
        body: dto.body,
        createdAt: new Date().toISOString(),
      }

      queryClient.setQueryData<InfiniteData<CursorPage<Comment>>>(
        commentKeys.byReview(reviewId),
        (old) => {
          if (!old) return old
          const pages = [...old.pages]
          pages[pages.length - 1] = {
            ...pages[pages.length - 1],
            data: [...pages[pages.length - 1].data, optimistic],
          }
          return { ...old, pages }
        },
      )

      return { previous }
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(commentKeys.byReview(reviewId), context.previous)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.byReview(reviewId) })
      // Also invalidate reviews so commentCount badge refreshes
      queryClient.invalidateQueries({ queryKey: ['reviews'] })
    },
  })
}
