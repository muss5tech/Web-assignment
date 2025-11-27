import { useInView } from '../hooks'
import { cn } from '../utils/helpers'
import { experiences } from '../data/portfolio'
import { BriefcaseIcon, GraduationCapIcon } from './Icons'

export function Experience() {
  const [ref, isInView] = useInView({ threshold: 0.1 })

  return (
    <section id="experience" className="py-24 md:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-accent-primary/5 to-transparent" />
      </div>

      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={cn(
            'text-center mb-16',
            'opacity-0',
            isInView && 'animate-fade-in-up'
          )}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-accent-primary to-transparent" />
            <span className="text-accent-primary font-mono text-sm">Experience</span>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-accent-primary to-transparent" />
          </div>
          <h2 className="section-title">
            My Professional <span className="gradient-text">Journey</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            A timeline of my career progression, education, and key milestones
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent-primary via-accent-secondary to-dark-700" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={cn(
                  'relative pl-16 md:pl-20',
                  'opacity-0',
                  isInView && 'animate-fade-in-up'
                )}
                style={{ animationDelay: `${200 + index * 150}ms` }}
              >
                {/* Timeline Dot */}
                <div
                  className={cn(
                    'absolute left-4 md:left-6 w-4 h-4 rounded-full z-10',
                    'border-4 border-dark-900',
                    exp.isCurrent
                      ? 'bg-accent-primary shadow-glow-sm'
                      : 'bg-accent-secondary'
                  )}
                >
                  {exp.isCurrent && (
                    <span className="absolute inset-0 rounded-full bg-accent-primary animate-ping opacity-50" />
                  )}
                </div>

                {/* Content Card */}
                <div className="glass-card-hover p-6 md:p-8">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        {exp.technologies.length > 0 ? (
                          <BriefcaseIcon size={20} className="text-accent-primary" />
                        ) : (
                          <GraduationCapIcon size={20} className="text-accent-secondary" />
                        )}
                        <h3 className="text-xl font-display font-bold text-text-primary">
                          {exp.company}
                        </h3>
                        {exp.isCurrent && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-accent-primary/20 text-accent-primary rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-text-secondary font-medium">{exp.role}</p>
                    </div>
                    <span className="text-sm text-text-muted font-mono bg-dark-700/50 px-3 py-1 rounded-lg">
                      {exp.period}
                    </span>
                  </div>

                  {/* Description */}
                  {exp.description.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {exp.description.map((desc, i) => (
                        <li
                          key={i}
                          className="text-text-secondary text-sm leading-relaxed flex items-start gap-3"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-primary mt-2 flex-shrink-0" />
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Technologies */}
                  {exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.slice(0, 8).map((tech) => (
                        <span key={tech} className="tech-badge">
                          {tech}
                        </span>
                      ))}
                      {exp.technologies.length > 8 && (
                        <span className="tech-badge">
                          +{exp.technologies.length - 8} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
