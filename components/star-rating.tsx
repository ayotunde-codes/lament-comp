interface StarRatingProps {
  rating: number
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = { sm: 'text-xs', md: 'text-sm', lg: 'text-xl' }

export default function StarRating({ rating, size = 'md' }: StarRatingProps) {
  const rounded = Math.round(rating * 2) / 2
  return (
    <span
      className={`inline-flex items-center gap-px ${sizeMap[size]}`}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((pos) => (
        <span
          key={pos}
          className={
            rounded >= pos
              ? 'text-star'
              : rounded >= pos - 0.5
                ? 'text-star opacity-50'
                : 'text-muted opacity-50'
          }
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </span>
  )
}
