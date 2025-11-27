import { useInView } from '../hooks'
import { cn } from '../utils/helpers'
import { personalInfo } from '../data/portfolio'
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowRightIcon,
} from './Icons'

const contactLinks = [
  {
    name: 'GitHub',
    value: personalInfo.github,
    href: `https://github.com/${personalInfo.github}`,
    icon: GitHubIcon,
    color: 'hover:text-white hover:bg-[#333]',
  },
  {
    name: 'LinkedIn',
    value: personalInfo.linkedin,
    href: `https://linkedin.com/in/${personalInfo.linkedin}`,
    icon: LinkedInIcon,
    color: 'hover:text-white hover:bg-[#0077b5]',
  },
  {
    name: 'Email',
    value: `${personalInfo.email}@gmail.com`,
    href: `mailto:${personalInfo.email}@gmail.com`,
    icon: MailIcon,
    color: 'hover:text-white hover:bg-accent-primary',
  },
  {
    name: 'Phone',
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone.replace(/\s/g, '')}`,
    icon: PhoneIcon,
    color: 'hover:text-white hover:bg-accent-success',
  },
]

export function Contact() {
  const [ref, isInView] = useInView({ threshold: 0.1 })

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-accent-primary/10 via-transparent to-transparent" />
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
            <span className="text-accent-primary font-mono text-sm">Contact</span>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-accent-primary to-transparent" />
          </div>
          <h2 className="section-title">
            Let's Work <span className="gradient-text">Together</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            I'm open to discussing new projects, creative ideas, or opportunities to be
            part of your vision.
          </p>
        </div>

        {/* Main Content */}
        <div
          className={cn(
            'glass-card p-8 md:p-12',
            'opacity-0',
            isInView && 'animate-scale-in animation-delay-200'
          )}
        >
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Left - CTA */}
            <div className="space-y-6">
              <h3 className="text-2xl font-display font-bold text-text-primary">
                Get in Touch
              </h3>
              <p className="text-text-secondary leading-relaxed">
                Have a project in mind or just want to chat? Feel free to reach out
                through any of the channels below. I typically respond within 24 hours.
              </p>

              {/* Location */}
              <div className="flex items-center gap-3 text-text-secondary">
                <MapPinIcon size={20} className="text-accent-primary" />
                <span>{personalInfo.location}</span>
              </div>

              {/* Availability Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-success/10 border border-accent-success/20 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-success opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-success" />
                </span>
                <span className="text-sm text-accent-success font-medium">
                  Available for new opportunities
                </span>
              </div>
            </div>

            {/* Right - Contact Links */}
            <div className="space-y-4">
              {contactLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.name !== 'Phone' ? '_blank' : undefined}
                  rel={link.name !== 'Phone' ? 'noopener noreferrer' : undefined}
                  className={cn(
                    'group flex items-center gap-4 p-4 rounded-xl',
                    'bg-dark-700/50 border border-dark-600/30',
                    'transition-all duration-300',
                    link.color,
                    'opacity-0',
                    isInView && 'animate-slide-in-right'
                  )}
                  style={{ animationDelay: `${300 + index * 100}ms` }}
                >
                  <div className="p-3 rounded-lg bg-dark-600/50 group-hover:bg-white/10 transition-colors">
                    <link.icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-text-muted mb-0.5">{link.name}</p>
                    <p className="text-text-primary font-medium truncate">{link.value}</p>
                  </div>
                  <ArrowRightIcon
                    size={18}
                    className="text-text-muted group-hover:translate-x-1 transition-transform"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className={cn(
            'text-center mt-12',
            'opacity-0',
            isInView && 'animate-fade-in-up animation-delay-700'
          )}
        >
          <p className="text-text-muted text-sm">
            Prefer email?{' '}
            <a
              href={`mailto:${personalInfo.email}@gmail.com`}
              className="text-accent-primary hover:underline"
            >
              Send me a message
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
