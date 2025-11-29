import { CodeIcon, ExternalLinkIcon, GitHubIcon } from '@/components';
import { AnimatedSection, Badge, Card, SectionTitle } from '@/components/ui';
import { projects, type Project } from '../../data/projects';

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const delayClass = `animation-delay-${(index + 1) * 100}`;

  const ProjectIcon = (
    <div className="mb-3 xs:mb-4 p-3 xs:p-4 rounded-lg bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 border border-light-border-secondary dark:border-border-secondary">
      <CodeIcon className="w-6 h-6 xs:w-8 xs:h-8 text-accent-primary" />
    </div>
  );

  const ProjectTitle = (
    <h3 className="font-display text-lg xs:text-xl font-bold text-light-text-primary dark:text-foreground-primary mb-2 xs:mb-3 group-hover:text-accent-primary transition-colors">
      {project.title}
    </h3>
  );

  const ProjectDescription = (
    <p className="text-light-text-secondary dark:text-foreground-secondary text-xs xs:text-sm leading-relaxed mb-3 xs:mb-4 flex-grow">
      {project.description}
    </p>
  );

  const ProjectTechStack = project.techStack.length > 0 && (
    <div className="flex flex-wrap gap-1.5 xs:gap-2 mb-3 xs:mb-4">
      {project.techStack.map((tech) => (
        <Badge key={tech} size="sm" variant="primary">
          {tech}
        </Badge>
      ))}
    </div>
  );

  const ProjectLinks = (
    <div className="flex items-center gap-2 xs:gap-3 pt-3 xs:pt-4 border-t border-light-border-secondary dark:border-border-secondary">
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 xs:gap-1.5 text-xs xs:text-sm text-light-text-secondary dark:text-foreground-secondary hover:text-accent-primary transition-colors"
        >
          <ExternalLinkIcon className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
          Live Demo
        </a>
      )}
      {project.repoUrl && (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 xs:gap-1.5 text-xs xs:text-sm text-light-text-secondary dark:text-foreground-secondary hover:text-accent-primary transition-colors"
        >
          <GitHubIcon className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
          Source Code
        </a>
      )}
      {!project.liveUrl && !project.repoUrl && (
        <span className="text-xs xs:text-sm text-light-text-muted dark:text-foreground-muted italic">
          Private project
        </span>
      )}
    </div>
  );

  return (
    <AnimatedSection animation="fade-in-up" className={`h-full ${delayClass}`}>
      <Card className="h-full flex flex-col group">
        {ProjectIcon}
        {ProjectTitle}
        {ProjectDescription}
        {ProjectTechStack}
        {ProjectLinks}
      </Card>
    </AnimatedSection>
  );
}

const ProjectsSection = () => {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  const OtherProjectsTitle = otherProjects.length > 0 && (
    <AnimatedSection animation="fade-in-up" className="mb-4 xs:mb-5 sm:mb-6">
      <h3 className="font-display text-lg xs:text-xl font-semibold text-light-text-secondary dark:text-foreground-secondary">
        Other Projects
      </h3>
    </AnimatedSection>
  );

  return (
    <section id="projects" className="py-12 xs:py-16 sm:py-20">
      <div className="section-container">
        <SectionTitle
          title="Projects"
          subtitle="A selection of projects I've worked on, showcasing my skills across different technologies."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 mb-8 xs:mb-10 sm:mb-12">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {otherProjects.length > 0 && (
          <>
            {OtherProjectsTitle}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-5 sm:gap-6">
              {otherProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index + featuredProjects.length}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default ProjectsSection;
