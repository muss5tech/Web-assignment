import { useTypingEffect, useInView } from '../hooks'
import { cn } from '../utils/helpers'
import { personalInfo } from '../data/portfolio'
import { GitHubIcon, LinkedInIcon, MailIcon, ArrowDownIcon } from './Icons'

const roles = ['Frontend Developer', 'Mobile Developer', 'Full Stack Developer']

export function Hero() {
  const typedRole = useTypingEffect(roles, 100, 50, 2000)
  const [ref, isInView] = useInView({ threshold: 0.1 })

  const scrollToAbout = () => {
    const element = document.getElementById('about')
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({ top: offsetTop, behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-secondary/15 rounded-full blur-3xl animate-float animation-delay-200" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent-tertiary/10 rounded-full blur-3xl animate-float animation-delay-400" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-accent-primary/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div
        ref={ref}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Status Badge */}
        <div
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2 mb-8',
            'bg-dark-800/50 backdrop-blur-sm border border-dark-600/50 rounded-full',
            'opacity-0',
            isInView && 'animate-fade-in-down'
          )}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-success opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-success" />
          </span>
          <span className="text-sm text-text-secondary">Available for opportunities</span>
        </div>

        {/* Greeting */}
        <h2
          className={cn(
            'text-xl md:text-2xl text-text-secondary mb-4',
            'opacity-0',
            isInView && 'animate-fade-in-up animation-delay-100'
          )}
        >
          Hey, I'm
        </h2>

        {/* Name */}
        <h1
          className={cn(
            'text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-6',
            'opacity-0',
            isInView && 'animate-fade-in-up animation-delay-200'
          )}
        >
          <span className="gradient-text">{personalInfo.fullName}</span>
        </h1>

        {/* Typing Role */}
        <div
          className={cn(
            'h-12 md:h-14 flex items-center justify-center mb-8',
            'opacity-0',
            isInView && 'animate-fade-in-up animation-delay-300'
          )}
        >
          <span className="text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-text-primary">
            {typedRole}
          </span>
          <span className="w-1 h-8 md:h-10 bg-accent-primary ml-1 animate-pulse" />
        </div>

        {/* Bio */}
        <p
          className={cn(
            'max-w-2xl mx-auto text-lg md:text-xl text-text-secondary mb-10 leading-relaxed',
            'opacity-0',
            isInView && 'animate-fade-in-up animation-delay-400'
          )}
        >
          Building responsive, high-performance web and mobile applications with
          <span className="text-accent-primary"> 2+ years </span>
          of experience. Creating maintainable solutions that stand the test of time.
        </p>

        {/* Social Links */}
        <div
          className={cn(
            'flex items-center justify-center gap-4 mb-12',
            'opacity-0',
            isInView && 'animate-fade-in-up animation-delay-500'
          )}
        >
          <a
            href={`https://github.com/${personalInfo.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-3 glass-card-hover"
            aria-label="GitHub Profile"
          >
            <GitHubIcon
              size={24}
              className="text-text-secondary group-hover:text-text-primary transition-colors"
            />
          </a>
          <a
            href={`https://linkedin.com/in/${personalInfo.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-3 glass-card-hover"
            aria-label="LinkedIn Profile"
          >
            <LinkedInIcon
              size={24}
              className="text-text-secondary group-hover:text-text-primary transition-colors"
            />
          </a>
          <a
            href={`mailto:${personalInfo.email}@gmail.com`}
            className="group p-3 glass-card-hover"
            aria-label="Email"
          >
            <MailIcon
              size={24}
              className="text-text-secondary group-hover:text-text-primary transition-colors"
            />
          </a>
        </div>

        {/* CTA Buttons */}
        <div
          className={cn(
            'flex flex-col sm:flex-row items-center justify-center gap-4',
            'opacity-0',
            isInView && 'animate-fade-in-up animation-delay-600'
          )}
        >
          <a href="#contact" className="btn-primary px-8 py-4 text-lg">
            Let's Work Together
          </a>
          <a href="#projects" className="btn-secondary px-8 py-4 text-lg">
            View My Work
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className={cn(
          'absolute bottom-8 left-1/2 -translate-x-1/2',
          'flex flex-col items-center gap-2 text-text-secondary',
          'hover:text-text-primary transition-colors cursor-pointer',
          'opacity-0',
          isInView && 'animate-fade-in animation-delay-800'
        )}
        aria-label="Scroll to about section"
      >
        <span className="text-sm font-medium">Scroll Down</span>
        <ArrowDownIcon size={20} className="animate-bounce" />
      </button>
    </section>
  )
}
