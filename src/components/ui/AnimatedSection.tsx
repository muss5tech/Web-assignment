import { type HTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';
import useScrollAnimation from '../../hooks/useScrollAnimation';

type AnimationType =
  | 'fade-in'
  | 'fade-in-up'
  | 'fade-in-down'
  | 'fade-in-left'
  | 'fade-in-right';

interface AnimatedSectionProps extends HTMLAttributes<HTMLDivElement> {
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  as?: 'div' | 'section' | 'article' | 'header' | 'footer';
}

const AnimatedSection = forwardRef<HTMLDivElement, AnimatedSectionProps>(
  (
    {
      className,
      animation = 'fade-in-up',
      delay = 0,
      duration = 600,
      threshold = 0.3,
      as: Component = 'div',
      children,
      style,
      ...props
    },
    _ref
  ) => {
    const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
      threshold,
      triggerOnce: true,
    });

    const animations: Record<AnimationType, string> = {
      'fade-in': 'animate-fade-in',
      'fade-in-up': 'animate-fade-in-up',
      'fade-in-down': 'animate-fade-in-down',
      'fade-in-left': 'animate-fade-in-left',
      'fade-in-right': 'animate-fade-in-right',
    };

    return (
      <Component
        ref={ref}
        className={clsx(
          isVisible ? animations[animation] : 'opacity-0',
          className
        )}
        style={{
          ...style,
          animationDelay: `${delay}ms`,
          animationDuration: `${duration}ms`,
        }}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

AnimatedSection.displayName = 'AnimatedSection';

export default AnimatedSection;
