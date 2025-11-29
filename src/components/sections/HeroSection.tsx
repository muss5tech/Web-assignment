import { profile } from '../../data/profile';
import {
  GitHubIcon,
  LinkedInIcon,
  EmailIcon,
  PhoneIcon,
  LocationIcon,
  ArrowRightIcon,
} from '../Icons';
import UIButton from '../ui/UIButton';

const HeroSection = () => {
  const socialIcons = {
    github: GitHubIcon,
    linkedin: LinkedInIcon,
    email: EmailIcon,
    phone: PhoneIcon,
  };

  const handleContactClick = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const Avatar = (
    <div className="mb-8 opacity-0 animate-fade-in-down animation-delay-100">
      <div className="relative inline-block">
        <div className="w-32 h-32 rounded-full bg-gradient-accent p-[3px]">
          <div className="w-full h-full rounded-full bg-light-bg-primary dark:bg-background-primary flex items-center justify-center">
            <span className="font-display text-4xl font-bold gradient-text">
              {profile.name.charAt(0)}
            </span>
          </div>
        </div>
        {profile.isAvailable && (
          <div className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-status-online border-4 border-light-bg-primary dark:border-background-primary animate-pulse" />
        )}
      </div>
    </div>
  );

  const Greeting = (
    <div className="opacity-0 animate-fade-in-up animation-delay-200">
      <p className="text-light-text-secondary dark:text-foreground-secondary text-lg mb-2">
        Hey, I'm
      </p>
      <h1 className="font-display text-5xl md:text-7xl font-bold mb-4">
        <span className="gradient-text">{profile.fullName}</span>
      </h1>
    </div>
  );

  const Role = (
    <div className="opacity-0 animate-fade-in-up animation-delay-300">
      <div className="inline-flex items-center gap-3 mb-6">
        <span className="text-2xl md:text-3xl text-light-text-primary dark:text-foreground-primary font-medium">
          {profile.role}
        </span>
        {profile.isAvailable && (
          <span className="status-online text-status-online text-sm font-medium">
            S5TECH • Available
          </span>
        )}
      </div>
    </div>
  );

  const Location = (
    <div className="opacity-0 animate-fade-in-up animation-delay-400">
      <p className="flex items-center justify-center gap-2 text-light-text-muted dark:text-foreground-muted mb-6">
        <LocationIcon className="w-4 h-4" />
        {profile.location}
      </p>
    </div>
  );

  const Bio = (
    <div className="opacity-0 animate-fade-in-up animation-delay-500">
      <p className="text-light-text-secondary dark:text-foreground-secondary text-lg leading-relaxed max-w-2xl mx-auto mb-8 whitespace-pre-line">
        {profile.bio}
      </p>
    </div>
  );

  const SocialLinks = (
    <div className="opacity-0 animate-fade-in-up animation-delay-600">
      <div className="flex items-center justify-center gap-4 mb-8">
        {profile.socials.map((social) => {
          const Icon = socialIcons[social.icon as keyof typeof socialIcons];
          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-light-bg-card dark:bg-background-card border border-light-border-secondary dark:border-border-secondary hover:border-accent-primary/50 transition-all duration-300 hover:shadow-glow-sm"
            >
              <Icon className="w-5 h-5 text-light-text-secondary dark:text-foreground-secondary group-hover:text-accent-primary transition-colors" />
              <span className="text-sm text-light-text-secondary dark:text-foreground-secondary group-hover:text-light-text-primary dark:group-hover:text-foreground-primary transition-colors">
                {social.username}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );

  const CTAButton = (
    <div className="opacity-0 animate-fade-in-up animation-delay-700">
      <UIButton size="lg" onClick={handleContactClick} className="group">
        Let's Connect
        <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </UIButton>
    </div>
  );

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 pb-16"
    >
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center">
          {Avatar}
          {Greeting}
          {Role}
          {Location}
          {Bio}
          {SocialLinks}
          {CTAButton}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
