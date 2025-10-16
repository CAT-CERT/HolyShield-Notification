import { useScrollAnimation } from '@/hooks/useScrollAnimation'

type AnimatedSectionProps = {
  children: React.ReactNode
  className?: string
  animationType?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn'
  delay?: number
}

const AnimatedSection = ({ 
  children, 
  className = '', 
  animationType = 'fadeInUp',
  delay = 0 
}: AnimatedSectionProps) => {
  const [ref, isVisible] = useScrollAnimation()

  const animationClass = isVisible 
    ? `animate-${animationType.replace(/([A-Z])/g, '-$1').toLowerCase()}` 
    : 'animate-on-scroll'

  const style = delay > 0 ? { animationDelay: `${delay}s` } : {}

  return (
    <div 
      ref={ref} 
      className={`${animationClass} ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}

export default AnimatedSection
