import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'blue' | 'green' | 'amber' | 'purple' | 'rose' | 'slate';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'slate',
  size = 'md',
  className = '',
  ...props
}) => {
  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  }[size];

  const variantStyles = {
    blue: 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300 border border-sky-200 dark:border-sky-800/60',
    green: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60',
    amber: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60',
    rose: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60',
    slate: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium rounded-full ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
