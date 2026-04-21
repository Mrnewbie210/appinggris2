export interface EnglishRank {
  name: string;
  icon: string;
  color: string;
}

export function getEnglishRank(xp: number): EnglishRank {
  if (xp < 100) {
    return { name: 'Beginner', icon: '🥚', color: 'text-gray-500 bg-gray-50 border-gray-200' };
  }
  if (xp < 500) {
    return { name: 'Elementary', icon: '🐣', color: 'text-sky-600 bg-sky-50 border-sky-200' };
  }
  if (xp < 1000) {
    return { name: 'Intermediate', icon: '🐤', color: 'text-amber-600 bg-amber-50 border-amber-200' };
  }
  return { name: 'Advanced', icon: '🦅', color: 'text-rose-600 bg-rose-50 border-rose-200' };
}
