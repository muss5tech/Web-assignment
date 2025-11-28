import { experiences, type ExperienceItem } from '../../data/experience';
import SectionTitle from '../ui/SectionTitle';
import AnimatedSection from '../ui/AnimatedSection';
import Badge from '../ui/Badge';
import { BriefcaseIcon, GraduationCapIcon } from '../Icons';

function TimelineItem({
  experience,
  index,
}: {
  experience: ExperienceItem;
  index: number;
}) {
  const isEducation = experience.id === 'uit';
  const Icon = isEducation ? GraduationCapIcon : BriefcaseIcon;

  return (
    <AnimatedSection
      animation="fade-in-left"
      delay={index * 150}
      className="relative pl-8 pb-12 last:pb-0"
    >
      {/* Timeline line */}
      <div className="timeline-line" />

      {/* Timeline dot */}
      <div className="timeline-dot" />

      {/* Content */}
      <div className="bg-background-card rounded-xl border border-white/5 p-6 hover:border-accent-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent-primary/10">
              <Icon className="w-5 h-5 text-accent-primary" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-foreground-primary">
                {experience.company}
              </h3>
              <p className="text-accent-primary font-medium">
                {experience.role}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {experience.isCurrent && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-status-online/20 text-status-online border border-status-online/30">
                Current
              </span>
            )}
            <span className="text-foreground-muted text-sm">
              {experience.period}
            </span>
          </div>
        </div>

        {/* Description */}
        <ul className="space-y-2 mb-4">
          {experience.description.map((item, i) => (
            <li
              key={i}
              className="text-foreground-secondary text-sm leading-relaxed flex gap-2"
            >
              <span className="text-accent-primary mt-1.5 flex-shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Tech Stack */}
        {experience.techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
            {experience.techStack.map((tech) => (
              <Badge key={tech} size="sm" variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="py-20 bg-background-secondary/30">
      <div className="section-container">
        <SectionTitle
          title="Experience"
          subtitle="My professional journey and educational background."
        />

        <div className="max-w-3xl mx-auto">
          {experiences.map((experience, index) => (
            <TimelineItem
              key={experience.id}
              experience={experience}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;
