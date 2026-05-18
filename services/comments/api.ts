import apiClient from '@/services/api-client'
import type { Comment, CreateCommentDto, ListCommentsParams, CursorPage } from './types'

export function fetchComments(
  reviewId: string,
  params?: ListCommentsParams,
): Promise<CursorPage<Comment>> {
  return apiClient.get(
    `/reviews/${reviewId}/comments`,
    { params },
  ) as unknown as Promise<CursorPage<Comment>>
}

export function postComment(
  reviewId: string,
  dto: CreateCommentDto,
): Promise<Comment> {
  return apiClient.post(
    `/reviews/${reviewId}/comments`,
    dto,
  ) as unknown as Promise<Comment>
}
