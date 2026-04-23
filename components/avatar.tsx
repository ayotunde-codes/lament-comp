'use client'

import { VoidAvatar } from 'void-avatars/react'
import { getAvatarStyle } from '@/lib/avatar'

type Size = 'sm' | 'md' | 'lg' | 'xl'

interface AvatarProps {
  seed: string
  size?: Size
  className?: string
}

const SIZE_MAP: Record<Size, number> = {
  sm: 32,
  md: 40,
  lg: 64,
  xl: 80,
}

export default function Avatar({ seed, size = 'md', className }: AvatarProps) {
  const px = SIZE_MAP[size]
  const variant = getAvatarStyle(seed)

  return (
    <div
      className={`rounded-full overflow-hidden shrink-0${className ? ` ${className}` : ''}`}
      style={{ width: px, height: px }}
      aria-hidden="true"
    >
      <VoidAvatar seed={seed} variant={variant} size={px} radius={0.5} />
    </div>
  )
}
