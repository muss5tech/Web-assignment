import { useState, useEffect, useRef, useCallback, RefObject } from 'react'

/**
 * Hook to detect scroll position and direction
 */
export function useScroll() {
  const [scrollY, setScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')
  const [isScrolled, setIsScrolled] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      setScrollY(currentScrollY)
      setIsScrolled(currentScrollY > 50)
      setScrollDirection(currentScrollY > lastScrollY.current ? 'down' : 'up')

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { scrollY, scrollDirection, isScrolled }
}

/**
 * Hook to detect if an element is in viewport
 */
export function useInView(
  options: IntersectionObserverInit = { threshold: 0.1 }
): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null!)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        observer.unobserve(element)
      }
    }, options)

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [options])

  return [ref, isInView]
}

/**
 * Hook to get active section based on scroll position
 */
export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || '')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200

      for (const id of sectionIds) {
        const element = document.getElementById(id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds])

  return activeSection
}

/**
 * Hook for window resize with debounce
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }, 150)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeoutId)
    }
  }, [])

  return windowSize
}

/**
 * Hook for click outside detection
 */
export function useClickOutside<T extends HTMLElement>(
  callback: () => void
): RefObject<T> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [callback])

  return ref
}

/**
 * Hook for typing animation effect
 */
export function useTypingEffect(words: string[], typingSpeed = 100, deletingSpeed = 50, delay = 2000) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const type = useCallback(() => {
    const currentWord = words[currentWordIndex]

    if (isDeleting) {
      setCurrentText((prev) => prev.slice(0, -1))
      if (currentText === '') {
        setIsDeleting(false)
        setCurrentWordIndex((prev) => (prev + 1) % words.length)
      }
    } else {
      setCurrentText(currentWord.slice(0, currentText.length + 1))
      if (currentText === currentWord) {
        setTimeout(() => setIsDeleting(true), delay)
        return
      }
    }
  }, [currentText, currentWordIndex, isDeleting, words, delay])

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed
    const timer = setTimeout(type, speed)
    return () => clearTimeout(timer)
  }, [type, isDeleting, typingSpeed, deletingSpeed])

  return currentText
}
