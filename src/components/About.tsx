import { useInView } from '../hooks'
import { cn } from '../utils/helpers'
import { personalInfo } from '../data/portfolio'
import { MapPinIcon, DownloadIcon, ExternalLinkIcon, SparklesIcon } from './Icons'

const highlights = [
  { label: 'Years Experience', value: '2+' },
  { label: 'Projects Completed', value: '10+' },
  { label: 'Technologies', value: '25+' },
  { label: 'Apps Published', value: '3+' },
]

export function About() {
  const [ref, isInView] = useInView({ threshold: 0.1 })

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Image/Avatar */}
          <div
            className={cn(
              'relative',
              'opacity-0',
              isInView && 'animate-slide-in-left'
            )}
          >
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
              {/* Decorative elements */}
              <div className="absolute -inset-4 bg-gradient-to-br from-accent-primary/20 via-accent-secondary/10 to-accent-tertiary/20 rounded-3xl blur-2xl" />
              <div className="absolute inset-0 glass-card rounded-3xl p-8">
                <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-dark-700 to-dark-800 flex items-center justify-center overflow-hidden">
                  {/* Avatar placeholder with initials */}
                  <div className="relative z-10 flex flex-col items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center mb-6">
                      <span className="text-5xl font-display font-bold text-white">LN</span>
                    </div>
                    <h3 className="text-2xl font-display font-bold text-text-primary mb-2">
                      {personalInfo.fullName}
                    </h3>
                    <p className="text-text-secondary flex items-center gap-2">
                      <MapPinIcon size={16} />
                      {personalInfo.location}
                    </p>
                  </div>

                  {/* Decorative grid */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                      backgroundSize: '24px 24px',
                    }}
                  />
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 glass-card px-4 py-2 rounded-xl animate-float">
                <span className="text-sm font-medium text-accent-primary">React.js</span>
              </div>
              <div className="absolute -bottom-4 -left-4 glass-card px-4 py-2 rounded-xl animate-float animation-delay-300">
                <span className="text-sm font-medium text-accent-secondary">TypeScript</span>
              </div>
              <div className="absolute top-1/2 -right-8 glass-card px-4 py-2 rounded-xl animate-float animation-delay-500">
                <span className="text-sm font-medium text-accent-tertiary">Flutter</span>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div
            className={cn(
              'opacity-0',
              isInView && 'animate-slide-in-right animation-delay-200'
            )}
          >
            {/* Section Label */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-px bg-gradient-to-r from-accent-primary to-transparent" />
              <span className="text-accent-primary font-mono text-sm">About Me</span>
            </div>

            {/* Title */}
            <h2 className="section-title mb-6">
              Crafting Digital
              <br />
              <span className="gradient-text">Experiences</span>
            </h2>

            {/* Bio */}
            <div className="space-y-4 text-text-secondary leading-relaxed mb-8">
              <p>{personalInfo.bio.split('\n\n')[0]}</p>
              <p className="flex items-start gap-2">
                <SparklesIcon size={20} className="text-accent-primary mt-1 flex-shrink-0" />
                <span>{personalInfo.bio.split('\n\n')[1]}</span>
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {highlights.map((stat, index) => (
                <div
                  key={stat.label}
                  className={cn(
                    'glass-card p-4 text-center',
                    'opacity-0',
                    isInView && 'animate-scale-in',
                  )}
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >
                  <div className="text-2xl md:text-3xl font-display font-bold gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-text-muted">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <DownloadIcon size={18} />
                Download CV
              </a>
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <ExternalLinkIcon size={18} />
                View Online
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
