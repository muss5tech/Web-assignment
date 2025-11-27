import { useState, useCallback } from 'react'
import { cn } from '../utils/helpers'
import { useScroll, useActiveSection, useClickOutside } from '../hooks'
import { navLinks, personalInfo } from '../data/portfolio'
import { MenuIcon, CloseIcon } from './Icons'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isScrolled, scrollDirection } = useScroll()
  const activeSection = useActiveSection(
    navLinks.map((link) => link.href.replace('#', ''))
  )

  const menuRef = useClickOutside<HTMLDivElement>(() => setIsMobileMenuOpen(false))

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault()
      const targetId = href.replace('#', '')
      const element = document.getElementById(targetId)
      if (element) {
        const offsetTop = element.offsetTop - 80
        window.scrollTo({ top: offsetTop, behavior: 'smooth' })
      }
      setIsMobileMenuOpen(false)
    },
    []
  )

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-dark-900/80 backdrop-blur-xl border-b border-dark-700/50'
          : 'bg-transparent',
        scrollDirection === 'down' && isScrolled
          ? '-translate-y-full'
          : 'translate-y-0'
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white font-bold text-lg transition-transform duration-300 group-hover:scale-110">
              L
            </div>
            <span className="hidden sm:block font-display font-semibold text-text-primary">
              {personalInfo.name}
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  'nav-link px-4 py-2 rounded-lg',
                  activeSection === link.href.replace('#', '') && 'active'
                )}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="btn-primary text-sm"
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={cn(
          'md:hidden absolute top-full left-0 right-0 bg-dark-900/95 backdrop-blur-xl border-b border-dark-700/50',
          'transition-all duration-300 overflow-hidden',
          isMobileMenuOpen
            ? 'max-h-[400px] opacity-100'
            : 'max-h-0 opacity-0 pointer-events-none'
        )}
      >
        <div className="px-4 py-4 space-y-1">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={cn(
                'block px-4 py-3 rounded-xl text-text-secondary font-medium transition-all duration-300',
                'hover:bg-dark-800 hover:text-text-primary',
                activeSection === link.href.replace('#', '') &&
                  'bg-dark-800 text-accent-primary'
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="btn-primary w-full justify-center"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
