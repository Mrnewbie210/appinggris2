import React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  key?: React.Key;
}

export const Card = ({ children, className = '', ...props }: CardProps) => (
  <div className={cn('card-base', className)} {...props}>
    {children}
  </div>
);

export default Card;
