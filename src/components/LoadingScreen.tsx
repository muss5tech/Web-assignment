import { useState, useEffect } from 'react'
import { cn } from '../utils/helpers'

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 30
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  if (!isLoading) return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] bg-dark-950 flex flex-col items-center justify-center',
        'transition-opacity duration-500',
        progress >= 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      )}
    >
      {/* Logo */}
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center animate-pulse">
          <span className="text-4xl font-display font-bold text-white">L</span>
        </div>
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-primary to-accent-secondary blur-xl opacity-50 animate-pulse" />
      </div>

      {/* Loading text */}
      <p className="text-text-secondary text-sm mb-4 font-mono">Loading portfolio...</p>

      {/* Progress bar */}
      <div className="w-48 h-1 bg-dark-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full transition-all duration-300"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      {/* Progress percentage */}
      <p className="text-text-muted text-xs mt-2 font-mono">
        {Math.min(Math.round(progress), 100)}%
      </p>
    </div>
  )
}
