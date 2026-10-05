import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none touch-manipulation active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-3 py-2 sm:py-1.5 gap-1.5 min-h-[36px] sm:min-h-[32px]',
    md: 'text-xs sm:text-sm px-4 py-2.5 gap-2 min-h-[42px] sm:min-h-[38px]',
    lg: 'text-sm sm:text-base px-5 sm:px-6 py-3 gap-2.5 min-h-[46px] sm:min-h-[44px]',
  }[size];

  const variantStyles = {
    primary: 'bg-net-blue hover:bg-net-blue/90 text-white shadow-sm focus:ring-net-blue',
    secondary: 'bg-slate-100 dark:bg-slate-800 text-ink-primary dark:text-ink-light hover:bg-slate-200 dark:hover:bg-slate-700 focus:ring-slate-400',
    outline: 'border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-ink-primary dark:text-ink-light focus:ring-slate-400',
    ghost: 'text-ink-secondary dark:text-ink-light-muted hover:bg-slate-100 dark:hover:bg-slate-800 focus:ring-slate-300',
    success: 'bg-net-green hover:bg-net-green/90 text-white shadow-sm focus:ring-net-green',
    danger: 'bg-net-rose hover:bg-net-rose/90 text-white shadow-sm focus:ring-net-rose',
  }[variant];

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};
