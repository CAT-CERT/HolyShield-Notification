type Speaker = {
  name: string
  title: string
  image: string
  track?: string
  topic?: string
  tags?: string[]
}

type SpeakerSectionProps = {
  speakers: readonly Speaker[]
  pillLabel: string
  title: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
  ctaButtons?: readonly { label: string; href: string }[]
}

const SpeakerSection = ({
  speakers,
  pillLabel,
  title,
  description,
  ctaLabel,
  ctaHref,
  ctaButtons,
}: SpeakerSectionProps) => {
  const buttons =
    ctaButtons && ctaButtons.length > 0
      ? ctaButtons
      : ctaLabel && ctaHref
        ? [{ label: ctaLabel, href: ctaHref }]
        : []

  // 트랙별로 연사 분리
  const techSpeakers = speakers.filter((s) => s.track === 'TECH')
  const careerSpeakers = speakers.filter((s) => s.track === 'CAREER')

  // 애니메이션은 항상 작동, 1개면 복제 안함
  const getTechSpeakersForCarousel = () => {
    return techSpeakers.length >= 2 ? [...techSpeakers, ...techSpeakers] : techSpeakers
  }

  const getCareerSpeakersForCarousel = () => {
    return careerSpeakers.length >= 2 ? [...careerSpeakers, ...careerSpeakers] : careerSpeakers
  }

  const renderSpeakerCard = (speaker: Speaker, index: number, keyPrefix: string) => (
    <article className="speaker-card speaker-card-horizontal" key={`${keyPrefix}-${speaker.name}-${index}`}>
      {speaker.track ? <span className="speaker-track-label">{speaker.track}</span> : null}
      {speaker.topic ? <h3 className="speaker-topic">{speaker.topic}</h3> : null}
      <div className="speaker-card-body">
        <div className="speaker-image-wrapper speaker-image-wrapper-small">
          <img src={speaker.image} alt="" loading="lazy" />
        </div>
        <div className="speaker-meta">
          <span className="speaker-name">{speaker.name}</span>
          <span className="speaker-title">{speaker.title}</span>
        </div>
      </div>
    </article>
  )

  return (
    <section className="speaker-section" aria-labelledby="conference-heading">
      <div className="container speaker-container">
        <div className="section-heading animate-fade-in-up">
          <div className="section-heading-left">
            <span className="section-pill section-pill-elevated">{pillLabel}</span>
            <span className="section-line section-line-gradient" aria-hidden="true" />
          </div>
          <h2 id="conference-heading">{title}</h2>
          {description ? <p className="section-description">{description}</p> : null}
        </div>
        <div className="speaker-carousel-container">
          {/* TECH 트랙 (윗줄) - 항상 표시 */}
          <div
            className={`speaker-carousel speaker-carousel-top ${techSpeakers.length === 1 ? 'speaker-carousel-single' : ''}`}
            aria-hidden="true"
          >
            <div className="speaker-carousel-track">
              {getTechSpeakersForCarousel().map((speaker, index) => renderSpeakerCard(speaker, index, 'top'))}
            </div>
          </div>
          {/* CAREER 트랙 (아랫줄) - 항상 표시 */}
          <div
            className={`speaker-carousel speaker-carousel-bottom ${careerSpeakers.length === 1 ? 'speaker-carousel-single' : ''}`}
          >
            <div className="speaker-carousel-track">
              {getCareerSpeakersForCarousel().map((speaker, index) => renderSpeakerCard(speaker, index, 'bottom'))}
            </div>
          </div>
          <div className="speaker-carousel-gradient speaker-carousel-gradient-left" aria-hidden="true" />
          <div className="speaker-carousel-gradient speaker-carousel-gradient-right" aria-hidden="true" />
        </div>
        {buttons.length > 0 ? (
          <div className="speaker-cta">
            {buttons.map((button, index) => (
              <a
                key={button.label}
                className={`action-button action-primary animate-fade-in-up animate-stagger-${index + 1}`}
                href={button.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {button.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default SpeakerSection
