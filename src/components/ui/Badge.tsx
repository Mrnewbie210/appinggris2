import React from 'react';

type BadgeColor = 'mint' | 'peach' | 'sage' | 'white' | 'shadow' | 'A1' | 'A2' | 'B1' | 'B2';

interface BadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;
}

const colorMap: Record<BadgeColor, string> = {
  mint: 'bg-mint text-white',
  peach: 'bg-peach text-charcoal',
  sage: 'bg-sage text-charcoal',
  white: 'bg-white text-charcoal border border-[#DDD]',
  shadow: 'bg-black/10 text-charcoal',
  A1: 'bg-emerald-100 text-emerald-700',
  A2: 'bg-blue-100 text-blue-700',
  B1: 'bg-orange-100 text-orange-700',
  B2: 'bg-purple-100 text-purple-700',
};

export const Badge = ({ children, color = 'mint' }: BadgeProps) => (
  <span
    className={`px-3 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1 ${colorMap[color]}`}
  >
    {children}
  </span>
);

export default Badge;
