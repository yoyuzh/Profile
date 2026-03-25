import React from 'react';
import { cn } from '../../utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glow?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, glow = false, ...props }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn(
          "relative glass-card p-6 md:p-8 rounded-3xl overflow-hidden group",
          glow && "glow-effect",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
