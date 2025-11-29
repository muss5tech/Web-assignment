import { AnimatedSection, Card, SectionTitle, UIButton } from '@/components/ui';
import { profile } from '../../data/profile';
import {
  GitHubIcon,
  LinkedInIcon,
  EmailIcon,
  PhoneIcon,
  DownloadIcon,
  ExternalLinkIcon,
  SparklesIcon,
} from '@/components';

const ContactSection = () => {
  const socialIcons = {
    github: GitHubIcon,
    linkedin: LinkedInIcon,
    email: EmailIcon,
    phone: PhoneIcon,
  };

  const contactCards = (
    <AnimatedSection animation="fade-in-up">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 mb-6 xs:mb-8">
        {profile.socials.map((social) => {
          const Icon = socialIcons[social.icon as keyof typeof socialIcons];
          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="flex items-center gap-3 xs:gap-4">
                <div className="p-2 xs:p-3 rounded-lg bg-accent-primary/10 group-hover:bg-accent-primary/20 transition-colors">
                  <Icon className="w-5 h-5 xs:w-6 xs:h-6 text-accent-primary" />
                </div>
                <div>
                  <p className="text-xs xs:text-sm text-light-text-muted dark:text-foreground-muted">
                    {social.name}
                  </p>
                  <p className="font-medium text-sm xs:text-base text-light-text-primary dark:text-foreground-primary group-hover:text-accent-primary transition-colors">
                    {social.username}
                  </p>
                </div>
              </Card>
            </a>
          );
        })}
      </div>
    </AnimatedSection>
  );

  const cvSection = (
    <AnimatedSection animation="fade-in-up">
      <Card variant="glass" className="text-center">
        <SparklesIcon className="w-6 h-6 xs:w-8 xs:h-8 text-accent-primary mx-auto mb-3 xs:mb-4" />
        <h3 className="font-display text-lg xs:text-xl font-bold text-light-text-primary dark:text-foreground-primary mb-1.5 xs:mb-2">
          View My Resume
        </h3>
        <p className="text-light-text-secondary dark:text-foreground-secondary text-xs xs:text-sm mb-4 xs:mb-5 sm:mb-6 px-2 xs:px-0">
          Download or view my complete curriculum vitae with detailed
          information about my experience, education, and skills.
        </p>
        <div className="flex flex-col xs:flex-row items-center justify-center gap-2 xs:gap-3 sm:gap-4">
          <UIButton variant="primary" className="w-full xs:w-auto">
            <DownloadIcon className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
            Download CV
          </UIButton>
          <UIButton variant="outline" className="w-full xs:w-auto">
            <ExternalLinkIcon className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
            View Online
          </UIButton>
        </div>
        <p className="text-light-text-muted dark:text-foreground-muted text-xs mt-3 xs:mt-4">
          Last updated: November 2025
        </p>
      </Card>
    </AnimatedSection>
  );

  const ctaSection = (
    <AnimatedSection animation="fade-in-up" className="text-center mt-8 xs:mt-10 sm:mt-12">
      <p className="text-light-text-secondary dark:text-foreground-secondary text-sm xs:text-base mb-3 xs:mb-4">
        Prefer email? Reach out directly at
      </p>
      <a
        href={`mailto:${profile.socials.find((s) => s.icon === 'email')?.username}@gmail.com`}
        className="font-display text-xl xs:text-2xl font-bold gradient-text hover:opacity-80 transition-opacity break-all"
      >
        mus@s5tech.co
      </a>
    </AnimatedSection>
  );

  return (
    <section
      id="contact"
      className="py-12 xs:py-16 sm:py-20 bg-light-bg-secondary/50 dark:bg-background-secondary/30"
    >
      <div className="section-container">
        <SectionTitle
          title="Let's Work Together"
          subtitle="I'm open to discussing new projects, creative ideas, or opportunities to be part of your vision."
          align="center"
        />
        <div className="max-w-2xl mx-auto">
          {contactCards}
          {cvSection}
          {ctaSection}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
