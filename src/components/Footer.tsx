import { personalInfo, navLinks } from '../data/portfolio'
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({ top: offsetTop, behavior: 'smooth' })
    }
  }

  return (
    <footer className="py-12 border-t border-dark-700/50 bg-dark-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center gap-2 mb-4"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white font-bold">
                L
              </div>
              <span className="font-display font-semibold text-text-primary">
                {personalInfo.fullName}
              </span>
            </a>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              Frontend Developer crafting responsive, high-performance web and mobile
              applications.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-text-primary mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {navLinks.slice(0, 5).map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-text-muted hover:text-text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display font-semibold text-text-primary mb-4">
              Connect
            </h4>
            <div className="flex items-center gap-3">
              <a
                href={`https://github.com/${personalInfo.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-dark-700/50 text-text-muted hover:text-text-primary hover:bg-dark-700 transition-all"
                aria-label="GitHub"
              >
                <GitHubIcon size={18} />
              </a>
              <a
                href={`https://linkedin.com/in/${personalInfo.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-dark-700/50 text-text-muted hover:text-text-primary hover:bg-dark-700 transition-all"
                aria-label="LinkedIn"
              >
                <LinkedInIcon size={18} />
              </a>
              <a
                href={`mailto:${personalInfo.email}@gmail.com`}
                className="p-2.5 rounded-lg bg-dark-700/50 text-text-muted hover:text-text-primary hover:bg-dark-700 transition-all"
                aria-label="Email"
              >
                <MailIcon size={18} />
              </a>
            </div>
            <p className="text-text-muted text-sm mt-4">Last updated: November 2025</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-dark-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm">
            © {currentYear} {personalInfo.fullName}. All rights reserved.
          </p>
          <p className="text-text-muted text-sm">
            Built with{' '}
            <span className="text-accent-primary">React</span>,{' '}
            <span className="text-accent-secondary">TypeScript</span> &{' '}
            <span className="text-accent-tertiary">TailwindCSS</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
