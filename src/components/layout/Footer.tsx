import { GitHubIcon, LinkedInIcon, EmailIcon } from '../Icons';
import { profile } from '../../data/profile';

function Footer() {
  const currentYear = new Date().getFullYear();

  const socialIcons = {
    github: GitHubIcon,
    linkedin: LinkedInIcon,
    email: EmailIcon,
  };

  return (
    <footer className="border-t border-light-border-secondary dark:border-border-secondary bg-light-bg-secondary/50 dark:bg-background-secondary/50">
      <div className="section-container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-light-text-muted dark:text-foreground-muted text-sm">
            © {currentYear} {profile.fullName}. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {profile.socials
              .filter((social) => social.icon !== 'phone')
              .map((social) => {
                const Icon = socialIcons[social.icon as keyof typeof socialIcons];
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-light-text-muted dark:text-foreground-muted hover:text-accent-primary transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
          </div>

          {/* Built with */}
          <p className="text-light-text-muted dark:text-foreground-muted text-sm">
            Built with{' '}
            <span className="text-accent-primary">React</span> &{' '}
            <span className="text-accent-secondary">TailwindCSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
