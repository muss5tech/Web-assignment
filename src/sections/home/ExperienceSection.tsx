import { experiences, type ExperienceItem } from '../../data/experience';
import { BriefcaseIcon, GraduationCapIcon } from '@/components';
import { AnimatedSection, Badge, SectionTitle } from '@/components/ui';

const TimelineLine = () => <div className="timeline-line" />;
const TimelineDot = () => <div className="timeline-dot" />;

const TimelineHeader = ({ experience }: { experience: ExperienceItem }) => {
  const isEducation = experience.id === 'uit';
  const Icon = isEducation ? GraduationCapIcon : BriefcaseIcon;

  return (
    <div className="flex flex-wrap items-start justify-between gap-3 xs:gap-4 mb-3 xs:mb-4">
      <div className="flex items-center gap-2 xs:gap-3">
        <div className="p-1.5 xs:p-2 rounded-lg bg-accent-primary/10">
          <Icon className="w-4 h-4 xs:w-5 xs:h-5 text-accent-primary" />
        </div>
        <div>
          <h3 className="font-display text-lg xs:text-xl font-bold text-light-text-primary dark:text-foreground-primary">
            {experience.company}
          </h3>
          <p className="text-accent-primary font-medium text-sm xs:text-base">{experience.role}</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 xs:gap-2 flex-wrap">
        {experience.isCurrent && (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-status-online/20 text-status-online border border-status-online/30">
            Current
          </span>
        )}
        <span className="text-light-text-muted dark:text-foreground-muted text-xs xs:text-sm">
          {experience.period}
        </span>
      </div>
    </div>
  );
};

const TimelineDescription = ({ description }: { description: string[] }) => (
  <ul className="space-y-1.5 xs:space-y-2 mb-3 xs:mb-4">
    {description.map((item, i) => (
      <li
        key={i}
        className="text-light-text-secondary dark:text-foreground-secondary text-xs xs:text-sm leading-relaxed flex gap-1.5 xs:gap-2"
      >
        <span className="text-accent-primary mt-1 xs:mt-1.5 flex-shrink-0">•</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const TimelineTechStack = ({ techStack }: { techStack: string[] }) => {
  if (!techStack.length) return null;

  return (
    <div className="flex flex-wrap gap-1.5 xs:gap-2 pt-3 xs:pt-4 border-t border-light-border-secondary dark:border-border-secondary">
      {techStack.map((tech) => (
        <Badge key={tech} size="sm" variant="outline">
          {tech}
        </Badge>
      ))}
    </div>
  );
};

const TimelineItem = ({
  experience,
  index,
}: {
  experience: ExperienceItem;
  index: number;
}) => {
  const isEven = index % 2 === 0;

  const animationDelay = `${index * 100}ms`;

  return (
    <AnimatedSection
      animation={isEven ? 'fade-in-left' : 'fade-in-right'}
      style={{ animationDelay }}
      className="relative pl-4 xs:pl-6 sm:pl-8 pb-8 xs:pb-10 sm:pb-12 last:pb-0"
    >
      <TimelineLine />
      <TimelineDot />
      <div className="bg-light-bg-card dark:bg-background-card rounded-xl border border-light-border-secondary dark:border-border-secondary p-4 xs:p-5 sm:p-6 hover:border-accent-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-card shadow-sm dark:shadow-none">
        <TimelineHeader experience={experience} />
        <TimelineDescription description={experience.description} />
        <TimelineTechStack techStack={experience.techStack} />
      </div>
    </AnimatedSection>
  );
};


const ExperienceSection = () => (
  <section id="experience" className="py-20 bg-light-bg-secondary/50 dark:bg-background-secondary/30">
    <div className="section-container">
      <SectionTitle
        title="Experience"
        subtitle="My professional journey and educational background."
      />
      <div className="max-w-3xl mx-auto">
        {experiences.map((experience, index) => (
          <TimelineItem key={experience.id} experience={experience} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export default ExperienceSection;
