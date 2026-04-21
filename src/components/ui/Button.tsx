import React from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'dark';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: React.ReactNode;
};

const variantStyles: Record<Variant, string> = {
  primary:
    'soft-gradient text-white font-bold shadow-lg shadow-mint/20 hover:opacity-90 transition-opacity',
  secondary:
    'bg-white border border-[#DDD] text-charcoal font-bold hover:bg-gray-50 transition-colors',
  ghost:
    'bg-gray-100 text-charcoal font-bold hover:bg-gray-200 transition-colors',
  dark: 'bg-charcoal text-white font-bold hover:opacity-90 transition-opacity',
};

export const Button = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) => (
  <button
    className={`inline-flex items-center justify-center gap-2 py-3 px-6 rounded-2xl ${variantStyles[variant]} ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
