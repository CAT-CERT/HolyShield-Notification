import { useId, useMemo, useState } from 'react'

type LocationSectionProps = {
  pillLabel: string
  title: string
  description: string
  address: string
  summary: {
    campusName: string
    addressDetail: string
    phone: string
  }
  guideTitle: string
  id?: string
  sections: ReadonlyArray<{
    heading: string
    cards: ReadonlyArray<{
      icon: string
      badge: {
        label: string
        tone: 'blue' | 'green' | 'purple' | 'magenta' | 'neutral'
      }
      title: string
      subtitle?: string
      details: ReadonlyArray<string>
    }>
  }>
}

type LocationSectionCard = LocationSectionProps['sections'][number]['cards'][number]

const LocationSection = ({
  pillLabel,
  title,
  description,
  address,
  summary,
  guideTitle,
  id,
  sections,
}: LocationSectionProps) => {
  const [activeTab, setActiveTab] = useState<'venue' | 'transit'>('venue')
  const venueTabId = useId()
  const transitTabId = useId()

  const sanitizedPhone = summary.phone.replace(/[^0-9]/g, '')
  const mapQuery = encodeURIComponent(address)
  const mapSrc = `https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`

  const transitRouteGroups = useMemo(() => {
    const grouped: Array<Array<{ sectionHeading: string; card: LocationSectionCard }>> = []

    sections.forEach((section) => {
      section.cards.forEach((card, index) => {
        if (!grouped[index]) {
          grouped[index] = []
        }
        grouped[index].push({ sectionHeading: section.heading, card })
      })
    })

    return grouped
  }, [sections])

  return (
    <section className="location-section" id={id} aria-labelledby="location-heading">
      <div className="location-container">
        <div className="location-header section-heading">
          <div className="section-heading-left">
            <span className="section-pill section-pill-elevated animate-glow">{pillLabel}</span>
            <span className="section-line section-line-gradient" aria-hidden="true" />
          </div>
          <h2 id="location-heading">{title}</h2>
          <p className="location-description animate-slide-in-up animate-stagger-1">{description}</p>
        </div>

        <div className="location-tabs animate-zoom-in animate-stagger-2" role="tablist" aria-label="행사 위치 및 교통 안내">
          <button
            type="button"
            role="tab"
            id={venueTabId}
            aria-selected={activeTab === "venue"}
            aria-controls={`${venueTabId}-panel`}
            className={`location-tab ${activeTab === "venue" ? "location-tab-active" : ""}`}
            onClick={() => setActiveTab("venue")}
          >
            행사 장소
          </button>
          <button
            type="button"
            role="tab"
            id={transitTabId}
            aria-selected={activeTab === "transit"}
            aria-controls={`${transitTabId}-panel`}
            className={`location-tab ${activeTab === "transit" ? "location-tab-active" : ""}`}
            onClick={() => setActiveTab("transit")}
          >
            대중교통 이용방법
          </button>
        </div>

        <div className="location-panel">
          {activeTab === 'venue' ? (
            <div
              className="location-summary-card"
              role="tabpanel"
              id={`${venueTabId}-panel`}
              aria-labelledby={venueTabId}
            >
              <div className="location-summary-header">
                <h3>{summary.campusName}</h3>
                <p>{address}</p>
              </div>
              <div className="location-summary-info">
                <div>
                  <span className="location-summary-label">주소 </span>
                  <span className="location-summary-value">{summary.addressDetail}</span>
                </div>
                <div>
                  <span className="location-summary-label">전화번호</span>
                  <a className="location-summary-value" href={`tel:${sanitizedPhone}`}>
                    {summary.phone}
                  </a>
                </div>
              </div>
              <div className="location-map" role="presentation">
                <iframe
                  title="HolyShield 2025 행사 위치 지도"
                  src={mapSrc}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          ) : (
            <div
              className="location-details"
              role="tabpanel"
              id={`${transitTabId}-panel`}
              aria-labelledby={transitTabId}
            >
              <h3 className="location-guide-title">{guideTitle}</h3>
              <div className="location-route-grid">
                {transitRouteGroups.map((group, groupIndex) => (
                  <article className="location-route-card" key={`route-group-${groupIndex}`}>
                    {group.map(({ sectionHeading, card }) => (
                      <div className="location-route-item" key={`${sectionHeading}-${card.title}`}>
                        <div className="location-card-icon">
                          <img src={card.icon} alt="" aria-hidden="true" />
                          <span className={`location-badge badge-${card.badge.tone}`}>{card.badge.label}</span>
                        </div>
                        <div className="location-card-text">
                          <span className="location-card-section">{sectionHeading}</span>
                          <h5>{card.title}</h5>
                          {card.subtitle ? <p className="location-card-subtitle">{card.subtitle}</p> : null}
                          {card.details.length > 0 ? (
                            <ul>
                              {card.details.map((detail) => (
                                <li key={detail}>{detail}</li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default LocationSection
