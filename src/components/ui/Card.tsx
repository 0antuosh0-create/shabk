import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'flat' | 'interactive';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const variantStyles = {
    default: 'bg-white dark:bg-canvas-card-dark border border-slate-200/80 dark:border-slate-800 shadow-card rounded-2xl p-5 md:p-6',
    flat: 'bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-5 md:p-6',
    interactive: 'bg-white dark:bg-canvas-card-dark border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-elevated hover:border-net-blue/40 dark:hover:border-net-blue/40 transition-all duration-200 rounded-2xl p-5 md:p-6 cursor-pointer',
  }[variant];

  return (
    <div className={`${variantStyles} ${className}`} {...props}>
      {children}
    </div>
  );
};
