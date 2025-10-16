import mainLogoUrl from '@/assets/logo.png?url'
import hostsImageUrl from '@/assets/hosts.png?url'
import { siteConfig } from '@/config/site'

const CtfOverview = () => {
  const { ctf } = siteConfig

  return (
    <section className="ctf-overview" aria-labelledby="ctf-overview-title">
      <div className="ctf-overview-grid">
        <div className="ctf-overview-cell ctf-overview-cell-logo ctf-overview-cell-top">
          <img src={mainLogoUrl} alt="HolyShield CTF 2025 로고" />
        </div>

        <div className="ctf-overview-cell ctf-overview-cell-meta ctf-overview-cell-top">
          <div className="ctf-overview-meta-content">
            <h2 id="ctf-overview-title">{ctf.heroTitle}</h2>
            <img
              className="ctf-overview-hosts-image"
              src={hostsImageUrl}
              alt="주최 · 주관: CAT Security, The Catholic University of Korea"
            />
          </div>
          <div className="ctf-overview-contact-card" aria-label="대회 문의">
            <span className="ctf-overview-contact-label">문의: CAT-Security</span>
            <ul className="ctf-overview-contact-details">
              {ctf.contact?.phone ? (
                <li>
                  <span className="ctf-overview-contact-item-label">Tel.</span>
                  <span className="ctf-overview-contact-item-detail">{ctf.contact.phone}</span>
                </li>
              ) : null}
              {ctf.contact?.email ? (
                <li>
                  <span className="ctf-overview-contact-item-label">E-mail</span>
                  <span className="ctf-overview-contact-item-detail">{ctf.contact.email}</span>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <article
          className="ctf-overview-cell ctf-overview-cell-panel ctf-overview-cell-timeline"
          aria-labelledby="ctf-overview-summary-title"
        >
          <h3 id="ctf-overview-summary-title">주요 일정</h3>
          <ul className="ctf-overview-timeline-list">
            {ctf.timeline.map((item) => {
              const detail = item.detail.replace(/^\s*-\s*/, '')
              return (
                <li key={item.label}>
                  <span className="ctf-overview-timeline-label">{item.label}</span>
                  <span className="ctf-overview-timeline-detail">{detail}</span>
                </li>
              )
            })}
          </ul>
        </article>

        <article
          className="ctf-overview-cell ctf-overview-cell-panel ctf-overview-cell-rules"
          aria-labelledby="ctf-overview-format-title"
        >
          <h3 id="ctf-overview-format-title">대회 방식</h3>
          <ul className="ctf-overview-rules-list">
            {(ctf.overviewRules ?? ctf.pageRules ?? ctf.rules ?? []).map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}

export default CtfOverview

