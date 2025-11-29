import { Email, GitHub, LinkedIn } from '@mui/icons-material';
import { profile } from '../../data/profile';

function Footer() {
  const currentYear = new Date().getFullYear();

  const socialIcons = {
    github: GitHub,
    linkedin: LinkedIn,
    email: Email,
  };

  const Copyright = () => (
    <p className="text-light-text-muted dark:text-foreground-muted text-xs xs:text-sm text-center md:text-left">
      © {currentYear} {profile.fullName}. All rights reserved.
    </p>
  );

  const SocialLinks = () => (
    <div className="flex items-center gap-3 xs:gap-4">
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
              <Icon className="w-4 h-4 xs:w-5 xs:h-5" />
            </a>
          );
        })}
    </div>
  );

  const BuiltWith = () => (
    <p className="text-light-text-muted dark:text-foreground-muted text-xs xs:text-sm text-center md:text-right">
      Built with <span className="text-accent-primary">React</span> &{' '}
      <span className="text-accent-secondary">TailwindCSS</span>
    </p>
  );

  return (
    <footer className="border-t border-light-border-secondary dark:border-border-secondary bg-light-bg-secondary/50 dark:bg-background-secondary/50">
      <div className="section-container py-6 xs:py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 xs:gap-4">
          <Copyright />
          <SocialLinks />
          <BuiltWith />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
