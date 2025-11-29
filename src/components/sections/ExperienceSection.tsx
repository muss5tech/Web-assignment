import { experiences, type ExperienceItem } from '../../data/experience';
import SectionTitle from '../ui/SectionTitle';
import AnimatedSection from '../ui/AnimatedSection';
import Badge from '../ui/Badge';
import { BriefcaseIcon, GraduationCapIcon } from '../Icons';

const TimelineLine = () => <div className="timeline-line" />;
const TimelineDot = () => <div className="timeline-dot" />;

const TimelineHeader = ({ experience }: { experience: ExperienceItem }) => {
  const isEducation = experience.id === 'uit';
  const Icon = isEducation ? GraduationCapIcon : BriefcaseIcon;

  return (
    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-accent-primary/10">
          <Icon className="w-5 h-5 text-accent-primary" />
        </div>
        <div>
          <h3 className="font-display text-xl font-bold text-light-text-primary dark:text-foreground-primary">
            {experience.company}
          </h3>
          <p className="text-accent-primary font-medium">{experience.role}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {experience.isCurrent && (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-status-online/20 text-status-online border border-status-online/30">
            Current
          </span>
        )}
        <span className="text-light-text-muted dark:text-foreground-muted text-sm">
          {experience.period}
        </span>
      </div>
    </div>
  );
};

const TimelineDescription = ({ description }: { description: string[] }) => (
  <ul className="space-y-2 mb-4">
    {description.map((item, i) => (
      <li
        key={i}
        className="text-light-text-secondary dark:text-foreground-secondary text-sm leading-relaxed flex gap-2"
      >
        <span className="text-accent-primary mt-1.5 flex-shrink-0">•</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const TimelineTechStack = ({ techStack }: { techStack: string[] }) => {
  if (!techStack.length) return null;

  return (
    <div className="flex flex-wrap gap-2 pt-4 border-t border-light-border-secondary dark:border-border-secondary">
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
      className="relative pl-8 pb-12 last:pb-0"
    >
      <TimelineLine />
      <TimelineDot />
      <div className="bg-light-bg-card dark:bg-background-card rounded-xl border border-light-border-secondary dark:border-border-secondary p-6 hover:border-accent-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-card shadow-sm dark:shadow-none">
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
