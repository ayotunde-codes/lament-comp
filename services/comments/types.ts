import type { Comment } from '@/types'

export type { Comment }

export interface CreateCommentDto {
  body: string
}

export interface ListCommentsParams {
  cursor?: string
  limit?: number
}

export interface CursorPage<T> {
  data: T[]
  nextCursor: string | null
}
