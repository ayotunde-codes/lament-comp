import type { Comment } from '@/types'
import Avatar from './avatar'
import { formatTimeAgo } from '@/lib/format-time'

interface CommentCardProps {
  comment: Comment
}

export default function CommentCard({ comment }: CommentCardProps) {
  return (
    <div className="flex gap-2.5">
      <Avatar seed={comment.username} size="sm" className="mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-xs font-semibold text-primary leading-none">
            Anon Barista — {comment.username}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted leading-none">
            {formatTimeAgo(comment.createdAt)}
          </span>
        </div>
        <p className="text-sm text-primary/85 leading-relaxed mt-1">
          {comment.body}
        </p>
      </div>
    </div>
  )
}
