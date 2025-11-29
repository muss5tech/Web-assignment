import { type HTMLAttributes } from 'react';
import clsx from 'clsx';
import AnimatedSection from './AnimatedSection';

interface SectionTitleProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
}

function SectionTitle({
  className,
  title,
  subtitle,
  align = 'left',
  ...props
}: SectionTitleProps) {
  const alignments = {
    left: 'text-left',
    center: 'flex flex-col items-center text-center mx-auto',
    right: 'text-right',
  };

  return (
    <AnimatedSection
      className={clsx('mb-12', alignments[align], className)}
      animation="fade-in-up"
      {...props}
    >
      <h2 className="font-display text-3xl md:text-4xl font-bold text-light-text-primary dark:text-foreground-primary mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-light-text-secondary dark:text-foreground-secondary text-lg max-w-2xl">
          {subtitle}
        </p>
      )}
    </AnimatedSection>
  );
}

export default SectionTitle;
