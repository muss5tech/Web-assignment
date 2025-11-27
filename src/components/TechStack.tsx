import { useState } from 'react'
import { useInView } from '../hooks'
import { cn } from '../utils/helpers'
import { techStack } from '../data/portfolio'

export function TechStack() {
  const [ref, isInView] = useInView({ threshold: 0.1 })
  const [activeCategory, setActiveCategory] = useState('frontend')

  const categories = techStack.map((stack) => ({
    id: stack.category,
    label: stack.categoryLabel,
  }))

  const activeTech = techStack.find((s) => s.category === activeCategory)

  return (
    <section id="tech-stack" className="py-24 md:py-32 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-accent-primary/10 via-transparent to-transparent" />
      </div>

      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <span className="text-accent-primary font-mono text-sm">Tech Stack</span>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-accent-primary to-transparent" />
          </div>
          <h2 className="section-title">
            Technologies I <span className="gradient-text">Work With</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Here are the technologies I've learned and applied in my work. I continue to
            expand this list as I grow and gain new experience as a developer.
          </p>
        </div>

        {/* Category Tabs */}
        <div
          className={cn(
            'flex flex-wrap justify-center gap-2 mb-12',
            'opacity-0',
            isInView && 'animate-fade-in-up animation-delay-200'
          )}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                'px-5 py-2.5 rounded-xl font-mono text-sm transition-all duration-300',
                activeCategory === category.id
                  ? 'bg-accent-primary text-white shadow-glow-sm'
                  : 'bg-dark-800/50 text-text-secondary hover:bg-dark-700 hover:text-text-primary'
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <div
          className={cn(
            'glass-card p-8 md:p-12',
            'opacity-0',
            isInView && 'animate-scale-in animation-delay-300'
          )}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {activeTech?.items.map((tech, index) => (
              <div
                key={tech.name}
                className={cn(
                  'group relative p-4 rounded-xl bg-dark-700/50 border border-dark-600/30',
                  'hover:border-accent-primary/30 hover:bg-dark-700',
                  'transition-all duration-300 hover:-translate-y-1',
                  'flex flex-col items-center justify-center text-center gap-3'
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Tech Icon Placeholder */}
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-dark-600 to-dark-700 flex items-center justify-center">
                  <span className="text-lg font-bold text-accent-primary">
                    {tech.name.charAt(0)}
                  </span>
                </div>
                <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                  {tech.name}
                </span>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-xl bg-accent-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>

        {/* All Technologies Summary */}
        <div
          className={cn(
            'mt-12 text-center',
            'opacity-0',
            isInView && 'animate-fade-in-up animation-delay-500'
          )}
        >
          <p className="text-text-muted text-sm">
            And many more tools & frameworks for building modern applications
          </p>
        </div>
      </div>
    </section>
  )
}
