type HeroProps = {
  title: string
  eventPeriod: string
  venue: string
  description: string
  bannerImage: string
}

const Hero = ({ title, eventPeriod, venue, description, bannerImage }: HeroProps) => {
  const [primaryWord, ...restWords] = title.split(' ')
  const highlightWord = restWords.join(' ')

  return (
    <section
      className="hero"
      id="top"
      style={{ backgroundImage: `url(${bannerImage})` }}
      aria-labelledby="hero-title"
    >
      <div className="hero-content">
        <div className="hero-text">
          <h1 id="hero-title" className="animate-bounce-in">
            <span className="hero-title-primary">{primaryWord}</span>
            {highlightWord ? (
              <>
                {' '}
                <span className="hero-title-highlight">{highlightWord}</span>
              </>
            ) : null}
          </h1>
          <p className="hero-description animate-slide-in-up animate-stagger-1">{description}</p>
          <p className="hero-event animate-zoom-in animate-stagger-2">
            <span className="hero-date">{eventPeriod}</span>
            <span className="hero-event-divider" aria-hidden="true">
              |
            </span>
            <span className="hero-venue">{venue}</span>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero

