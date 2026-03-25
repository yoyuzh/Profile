import React, { forwardRef } from 'react';
import { cn } from '../../utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    
    const variants = {
      primary: 'bg-white text-black hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.3)]',
      secondary: 'bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20',
      outline: 'bg-transparent text-white border border-white/30 hover:bg-white/10',
      ghost: 'bg-transparent text-white/70 hover:text-white hover:bg-white/10',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 active:scale-95',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
