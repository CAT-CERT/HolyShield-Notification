import { useEffect, useMemo, useState } from 'react'

type CountdownTimerProps = {
  label: string
  targetISO: string
  id?: string
  ctaLabel?: string
  ctaHref?: string
}

type TimeParts = {
  days: string
  hours: string
  minutes: string
  seconds: string
}

const pad = (value: number, size = 2) => value.toString().padStart(size, '0')

const getTimeParts = (targetDate: Date): TimeParts => {
  const now = Date.now()
  const distance = Math.max(targetDate.getTime() - now, 0)

  const seconds = Math.floor(distance / 1000)
  const days = Math.floor(seconds / (3600 * 24))
  const hours = Math.floor((seconds % (3600 * 24)) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  return {
    days: pad(days, 2),
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(remainingSeconds),
  }
}

const CountdownTimer = ({ label, targetISO, id, ctaLabel, ctaHref }: CountdownTimerProps) => {
  const targetDate = useMemo(() => new Date(targetISO), [targetISO])
  const [parts, setParts] = useState<TimeParts>(() => getTimeParts(targetDate))

  useEffect(() => {
    const interval = window.setInterval(() => {
      setParts(getTimeParts(targetDate))
    }, 1000)

    return () => window.clearInterval(interval)
  }, [targetDate])

  return (
    <section className="countdown" id={id} aria-label={`${label} 카운트다운`}>
      <div className="countdown-content">
        <span className="countdown-label animate-bounce-in">{label}</span>
        <div className="countdown-grid" role="presentation">
          <div className="countdown-card animate-stagger-1">
            <span className="countdown-value">{parts.days}</span>
            <span className="countdown-unit">일</span>
          </div>
          <div className="countdown-card animate-stagger-2">
            <span className="countdown-value">{parts.hours}</span>
            <span className="countdown-unit">시간</span>
          </div>
          <div className="countdown-card animate-stagger-3">
            <span className="countdown-value">{parts.minutes}</span>
            <span className="countdown-unit">분</span>
          </div>
          <div className="countdown-card animate-stagger-4">
            <span className="countdown-value">{parts.seconds}</span>
            <span className="countdown-unit">초</span>
          </div>
        </div>
        {ctaLabel && ctaHref ? (
          <div className="countdown-actions">
            <a
              className="action-button action-primary animate-zoom-in animate-stagger-5 animate-shimmer"
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {ctaLabel}
            </a>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default CountdownTimer

