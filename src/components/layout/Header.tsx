import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { MenuIcon, CloseIcon } from '../Icons';
import ThemeToggle from '../ThemeToggle';

const navItems = [
  { label: 'Home', href: '#home', type: 'hash' as const },
  { label: 'Tech Stack', href: '#tech-stack', type: 'hash' as const },
  { label: 'Experience', href: '#experience', type: 'hash' as const },
  { label: 'Projects', href: '#projects', type: 'hash' as const },
  { label: 'Contact', href: '#contact', type: 'hash' as const },
  { label: 'Achievements', href: '/achievements', type: 'route' as const },
];

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-light-bg-primary/90 dark:bg-background-primary/60 backdrop-blur-lg py-2 shadow-sm dark:shadow-none'
          : 'bg-transparent py-3'
      )}
    >
      <div className="section-container">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="font-display text-2xl font-bold gradient-text hover:opacity-80 transition-opacity"
          >
            Mus.
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.type === 'route' ? (
                    <Link
                      to={item.href}
                      className="text-light-text-secondary dark:text-foreground-secondary hover:text-light-text-primary dark:hover:text-foreground-primary transition-colors duration-200 text-sm font-medium py-1"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="text-light-text-secondary dark:text-foreground-secondary hover:text-light-text-primary dark:hover:text-foreground-primary transition-colors duration-200 text-sm font-medium py-1"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-light-text-secondary dark:text-foreground-secondary hover:text-light-text-primary dark:hover:text-foreground-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <CloseIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={clsx(
            'md:hidden overflow-hidden transition-all duration-300',
            isMobileMenuOpen ? 'max-h-81 mt-4' : 'max-h-0'
          )}
        >
          <div className="flex flex-col gap-4 pt-4 border-t border-gray-200 dark:border-white/10">
            <ul className="flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.type === 'route' ? (
                    <Link
                      to={item.href}
                      className="block text-light-text-secondary dark:text-foreground-secondary hover:text-light-text-primary dark:hover:text-foreground-primary transition-colors duration-200 text-base font-medium py-2"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="block text-light-text-secondary dark:text-foreground-secondary hover:text-light-text-primary dark:hover:text-foreground-primary transition-colors duration-200 text-base font-medium py-2"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
            <div className="pt-2 border-t border-gray-200 dark:border-white/10">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
