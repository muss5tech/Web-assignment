import { profile } from '../../data/profile';
import SectionTitle from '../ui/SectionTitle';
import AnimatedSection from '../ui/AnimatedSection';
import UIButton from '../ui/UIButton';
import Card from '../ui/Card';
import {
  GitHubIcon,
  LinkedInIcon,
  EmailIcon,
  PhoneIcon,
  DownloadIcon,
  ExternalLinkIcon,
  SparklesIcon,
} from '../Icons';

function ContactSection() {
  const socialIcons = {
    github: GitHubIcon,
    linkedin: LinkedInIcon,
    email: EmailIcon,
    phone: PhoneIcon,
  };

  return (
    <section id="contact" className="py-20 bg-light-bg-secondary/50 dark:bg-background-secondary/30">
      <div className="section-container">
        <SectionTitle
          title="Let's Work Together"
          subtitle="I'm open to discussing new projects, creative ideas, or opportunities to be part of your vision."
          align="center"
        />

        <div className="max-w-2xl mx-auto">
          {/* Contact Cards */}
          <AnimatedSection animation="fade-in-up">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {profile.socials.map((social, index) => {
                const Icon =
                  socialIcons[social.icon as keyof typeof socialIcons];
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <Card
                      className="flex items-center gap-4"
                      // style={{
                      //   animationDelay: `${(index + 1) * 100}ms`,
                      // }}
                    >
                      <div className="p-3 rounded-lg bg-accent-primary/10 group-hover:bg-accent-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-accent-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-light-text-muted dark:text-foreground-muted">
                          {social.name}
                        </p>
                        <p className="font-medium text-light-text-primary dark:text-foreground-primary group-hover:text-accent-primary transition-colors">
                          {social.username}
                        </p>
                      </div>
                    </Card>
                  </a>
                );
              })}
            </div>
          </AnimatedSection>

          {/* CV Section */}
          <AnimatedSection animation="fade-in-up">
            <Card variant="glass" className="text-center">
              <SparklesIcon className="w-8 h-8 text-accent-primary mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold text-light-text-primary dark:text-foreground-primary mb-2">
                View My Resume
              </h3>
              <p className="text-light-text-secondary dark:text-foreground-secondary text-sm mb-6">
                Download or view my complete curriculum vitae with detailed
                information about my experience, education, and skills.
              </p>
              <div className="flex items-center justify-center gap-4">
                <UIButton variant="primary">
                  <DownloadIcon className="w-4 h-4" />
                  Download CV
                </UIButton>
                <UIButton variant="outline">
                  <ExternalLinkIcon className="w-4 h-4" />
                  View Online
                </UIButton>
              </div>
              <p className="text-light-text-muted dark:text-foreground-muted text-xs mt-4">
                Last updated: November 2025
              </p>
            </Card>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection animation="fade-in-up" className="text-center mt-12">
            <p className="text-light-text-secondary dark:text-foreground-secondary mb-4">
              Prefer email? Reach out directly at
            </p>
            <a
              href={`mailto:${profile.socials.find((s) => s.icon === 'email')?.username}@gmail.com`}
              className="font-display text-2xl font-bold gradient-text hover:opacity-80 transition-opacity"
            >
              mus@s5tech.co
            </a>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
