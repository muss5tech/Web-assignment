import { useInView } from '../hooks';
import { cn } from '../utils/helpers';
import { projects } from '../data/portfolio';
import { FolderIcon, ExternalLinkIcon, GitHubIcon } from './Icons';

export function Projects() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-accent-secondary/10 via-transparent to-transparent" />
      </div>

      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <span className="text-accent-primary font-mono text-sm">
              Projects
            </span>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-accent-primary to-transparent" />
          </div>
          <h2 className="section-title">
            Featured <span className="gradient-text">Work</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Some of the projects I've worked on that showcase my skills and
            experience
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className={cn(
                'group glass-card-hover p-6 md:p-8 flex flex-col',
                'opacity-0',
                isInView && 'animate-fade-in-up'
              )}
              style={{ animationDelay: `${200 + index * 100}ms` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20">
                  <FolderIcon size={24} className="text-accent-primary" />
                </div>
                <div className="flex items-center gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-text-muted hover:text-text-primary transition-colors"
                      aria-label="View GitHub repository"
                    >
                      <GitHubIcon size={20} />
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-text-muted hover:text-text-primary transition-colors"
                      aria-label="View live project"
                    >
                      <ExternalLinkIcon size={20} />
                    </a>
                  )}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-display font-bold text-text-primary mb-3 group-hover:text-accent-primary transition-colors">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-grow">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tech-badge text-xs">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Hover gradient border effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-primary/0 via-accent-secondary/0 to-accent-tertiary/0 group-hover:from-accent-primary/5 group-hover:via-accent-secondary/5 group-hover:to-accent-tertiary/5 transition-all duration-500 pointer-events-none" />
            </article>
          ))}
        </div>

        {/* View More CTA */}
        <div
          className={cn(
            'text-center mt-12',
            'opacity-0',
            isInView && 'animate-fade-in-up animation-delay-600'
          )}
        >
          <a
            href="https://github.com/muss5tech"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex"
          >
            <GitHubIcon size={18} />
            View More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
