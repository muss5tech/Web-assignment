import { type HTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md';
  color?:
    | 'default'
    | 'frontend'
    | 'mobile'
    | 'backend'
    | 'devops'
    | 'others';
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      color = 'default',
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center gap-1.5 font-medium rounded-full transition-all duration-200';

    const variants = {
      default: 'bg-light-bg-hover dark:bg-background-hover border border-light-border-primary dark:border-border-primary text-light-text-secondary dark:text-foreground-secondary',
      primary: 'bg-accent-primary/20 text-accent-primary border border-accent-primary/30',
      secondary: 'bg-accent-secondary/20 text-accent-secondary border border-accent-secondary/30',
      outline: 'border border-light-border-primary dark:border-border-primary bg-transparent text-light-text-secondary dark:text-foreground-secondary',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
    };

    const colors = {
      default: '',
      frontend: 'border-tech-frontend/30 bg-tech-frontend/10 text-tech-frontend',
      mobile: 'border-tech-mobile/30 bg-tech-mobile/10 text-tech-mobile',
      backend: 'border-tech-backend/30 bg-tech-backend/10 text-tech-backend',
      devops: 'border-tech-devops/30 bg-tech-devops/10 text-tech-devops',
      others: 'border-tech-others/30 bg-tech-others/10 text-tech-others',
    };

    const hoverStyles = 'hover:border-opacity-60 hover:shadow-glow-sm';

    return (
      <span
        ref={ref}
        className={clsx(
          baseStyles,
          variants[variant],
          sizes[size],
          color !== 'default' && colors[color],
          hoverStyles,
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
