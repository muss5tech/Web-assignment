import { clsx, type ClassValue } from 'clsx'

/**
 * Merge class names with clsx
 * This is a utility function to conditionally join class names together
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

/**
 * Format phone number for display
 */
export function formatPhone(phone: string): string {
  return phone.replace(/(\+84)(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4')
}

/**
 * Scroll to element by ID with smooth behavior
 */
export function scrollToElement(elementId: string): void {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function for scroll events
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}
