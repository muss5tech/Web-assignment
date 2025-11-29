import { projects, type Project } from '../../data/projects';
import SectionTitle from '../ui/SectionTitle';
import AnimatedSection from '../ui/AnimatedSection';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import { ExternalLinkIcon, GitHubIcon, CodeIcon } from '../Icons';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <AnimatedSection animation="fade-in-up" className="h-full">
      <Card className="h-full flex flex-col group">
        {/* Project Icon/Preview */}
        <div className="mb-4 p-4 rounded-lg bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 border border-white/5">
          <CodeIcon className="w-8 h-8 text-accent-primary" />
        </div>

        {/* Title */}
        <h3 className="font-display text-xl font-bold text-foreground-primary mb-3 group-hover:text-accent-primary transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-foreground-secondary text-sm leading-relaxed mb-4 flex-grow">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech) => (
            <Badge key={tech} size="sm" variant="primary">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-foreground-secondary hover:text-accent-primary transition-colors"
            >
              <ExternalLinkIcon className="w-4 h-4" />
              Live Demo
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-foreground-secondary hover:text-accent-primary transition-colors"
            >
              <GitHubIcon className="w-4 h-4" />
              Source Code
            </a>
          )}
          {!project.liveUrl && !project.repoUrl && (
            <span className="text-sm text-foreground-muted italic">
              Private project
            </span>
          )}
        </div>
      </Card>
    </AnimatedSection>
  );
}

function ProjectsSection() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20">
      <div className="section-container">
        <SectionTitle
          title="Projects"
          subtitle="A selection of projects I've worked on, showcasing my skills across different technologies."
        />

        {/* Featured Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <>
            <AnimatedSection animation="fade-in-up" className="mb-6">
              <h3 className="font-display text-xl font-semibold text-foreground-secondary">
                Other Projects
              </h3>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
