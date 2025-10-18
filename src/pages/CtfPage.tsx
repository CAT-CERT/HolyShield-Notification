import { siteConfig } from '@/config/site'

 

const CtfPage = () => {
  const { ctf } = siteConfig
  const heroDescriptionCandidates = [
    ctf.heroDescription,
    ctf.heroDescription2,
    ctf.heroDescription3,
  ]
  const heroDescriptions = heroDescriptionCandidates.filter(
    (desc): desc is Exclude<(typeof heroDescriptionCandidates)[number], undefined> =>
      Boolean(desc)
  )

  return (
    <>
      <section className="subpage-hero" aria-labelledby="ctf-page-title">
        <div className="container subpage-hero-content">
          <div className="subpage-hero-text animate-fade-in-up">
            <h1 id="ctf-page-title">{ctf.heroTitle}</h1>
          </div>
          <div className="subpage-actions animate-fade-in-up animate-stagger-1">
            <a
              className="action-button action-primary"
              href={ctf.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {ctf.registrationCtaLabel}
            </a>
          </div>
          {heroDescriptions.length > 0 && (
            <div className="ctf-hero-description-card animate-fade-in-up animate-stagger-2">
              {heroDescriptions.map((desc, index) => (
                <p key={index} className="subpage-hero-description">
                  {desc}
                </p>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="detail-section" id="ctf-timeline">
        <div className="container ctf-detail-grid">
          <div className="info-block info-block-wide">
            <h2>참가 안내</h2>
            <ul className="rule-list">
              {(ctf.participation ?? []).map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </div>
          
          <div className="info-block">
            <h2>대회 일정</h2>
            <ul className="timeline-list">
              {ctf.timeline.map((item) => (
                <li key={item.label}>
                  <span className="timeline-label">{item.label}</span>
                  <span className="timeline-detail">{item.detail}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="info-block">
            <h2>참가 유의사항</h2>
            <ul className="rule-list">
              {(ctf.pageRules ?? ctf.overviewRules ?? ctf.rules ?? []).map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
            {(
              <a 
                href={'/HolyShield 2025 운영 규정.pdf'}
                className="rules-download-button"
                download={'HolyShield 2025 운영 규정.pdf'}
              >
                운영규정 다운로드
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default CtfPage

