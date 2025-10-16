import { useEffect, useRef, useState } from 'react'

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.1
): [React.MutableRefObject<T | null>, boolean] { // ✅ 반환 타입 수정
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<T | null>(null) // ✅ useRef는 T | null

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect() // ✅ 정리 깔끔하게
  }, [threshold])

  return [ref, isVisible]
}
