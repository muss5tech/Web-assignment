import clsx from 'clsx';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const UIButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary:
        'bg-gradient-accent text-white hover:opacity-90 hover:shadow-glow-md active:scale-[0.98]',
      secondary:
        'bg-light-bg-card dark:bg-background-card text-light-text-primary dark:text-foreground-primary border border-gray-300 dark:border-white/10 hover:border-accent-primary/50 hover:bg-light-bg-hover dark:hover:bg-background-hover',
      ghost:
        'text-light-text-secondary dark:text-foreground-secondary hover:text-light-text-primary dark:hover:text-foreground-primary hover:bg-light-bg-hover dark:hover:bg-background-hover',
      outline:
        'border border-accent-primary/50 text-accent-primary hover:bg-accent-primary/10 hover:border-accent-primary',
      destructive:
        'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 hover:shadow-lg hover:shadow-red-500/50 active:scale-[0.98]',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm gap-1.5',
      md: 'px-5 py-[6px] text-base gap-2',
      lg: 'px-7 py-3 text-lg gap-2.5',
    };

    return (
      <button
        ref={ref}
        type={type} 
        className={clsx(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

UIButton.displayName = 'Button';

export default UIButton;
