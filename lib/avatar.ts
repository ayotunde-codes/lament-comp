import type { AvatarStyle } from 'void-avatars'

export const ANIMAL_USERNAMES = [
  'MysticOwl', 'SilentWolf', 'CalmTiger', 'NobleFox', 'SwiftEagle',
  'WildPuma', 'GentleBear', 'BoldLynx', 'QuietDeer', 'BraveHawk',
  'DarkRaven', 'FierceLion', 'WiseOtter', 'CuriousPanda', 'StealthCat',
  'LuckyMoose', 'ProudElk', 'ShadyFox', 'ZenCrane', 'CoolWalrus',
]

const AVATAR_STYLES: AvatarStyle[] = [
  'bauhaus', 'emoticon', 'ring', 'pixel', 'constellation',
  'nebula', 'glitch', 'marble', 'beam', 'wireframe', 'halftone', 'isometric',
]

// Warm Disclosure palette — matcha, terracotta, ochre, sage, dusty rose, copper.
const AVATAR_COLORS = [
  '#6FA88E', '#C7763E', '#B5A06E', '#7FB89A', '#C58B7E', '#A88562',
]

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0
  }
  return hash
}

export function getAvatarColor(username: string): string {
  return AVATAR_COLORS[hashString(username) % AVATAR_COLORS.length]
}

export function getAvatarStyle(username: string): AvatarStyle {
  return AVATAR_STYLES[hashString(username) % AVATAR_STYLES.length]
}

export function getInitials(username: string): string {
  const parts = username.match(/[A-Z][a-z]+/g) ?? [username]
  return parts.slice(0, 2).map(p => p[0]).join('')
}

export function generateIdentity(): { username: string; avatar: string } {
  const username = ANIMAL_USERNAMES[Math.floor(Math.random() * ANIMAL_USERNAMES.length)]
  return { username, avatar: getAvatarColor(username) }
}
