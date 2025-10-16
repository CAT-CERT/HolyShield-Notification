import mainLogoUrl from '@/assets/logo.png?url'
import hostsImageUrl from '@/assets/hosts.png?url'
import { siteConfig } from '@/config/site'

const OverviewSection = () => {
  const { ctf } = siteConfig

  return (
    <section className="ctf-overview" aria-labelledby="ctf-overview-title">
      <div className="ctf-overview-container">
        <div className="ctf-overview-header">
          <div className="ctf-overview-header-top">
            <h2 id="ctf-overview-title">{ctf.heroTitle}</h2>
          </div>
          <div className="ctf-overview-header-bottom">
            <div className="ctf-overview-logo-wrapper">
              <img src={mainLogoUrl} alt="HolyShield CTF 2025 로고" />
            </div>
            <div className="ctf-overview-hosts-wrapper">
              <img
                className="ctf-overview-hosts-image"
                src={hostsImageUrl}
                alt="주최 · 주관: CAT Security, The Catholic University of Korea"
              />
            </div>
          </div>
        </div>

        <div className="ctf-overview-content">
          <article className="ctf-overview-card ctf-overview-card-timeline" aria-labelledby="contest-title">
            <h3 id="contest-title">Contest</h3>
            <div className="ctf-overview-registration">
              <strong>참가신청</strong>
              <span className="ctf-overview-timeline-detail">~ 2025. 11. 17(월) 까지</span>
            </div>
            <ul className="ctf-overview-description-list">
              <li>정보보안에 관심있는 고등, 대학(원)생으로 구성된 팀 (최대 4인 1팀)</li>
              <li>CTF 형식과 CAT-Security가 자체 기획한 RPC 동시 진행</li>
              <li>
              <span className="ctf-overview-timeline-label">문제유형: </span> Web Hacking, Pwnable, Reversing, Mobile Hacking, Penetration Testing, Malware Analysis, Live Fire
              </li>
            </ul>
          </article>

          <article className="ctf-overview-card ctf-overview-card-contact" aria-labelledby="conference-title">
            <h3 id="conference-title">Conference</h3>
            <div className="ctf-overview-registration-group">
              <div className="ctf-overview-registration">
                <strong>발표자 신청</strong>
                <span className="ctf-overview-timeline-detail">~ 2025. 11. 17(월) 까지</span>
              </div>
              <div className="ctf-overview-registration">
                <strong>참석자 신청</strong>
                <span className="ctf-overview-timeline-detail">~ 2025. 12. 05(금) 까지</span>
              </div>
            </div>
            <ul className="ctf-overview-description-list">
              <li>정보보안과 관련된 주제를 자유롭게 발표</li>
              <li>Tech Track과 Career Track 두 개의 트랙으로 나누어 진행
                <ul className="ctf-overview-sub-list">
                  <li><span className="ctf-overview-timeline-label">Tech Track:</span> 정보보안 분야의 최신 기술 동향과 연구 결과 공유하는 발표</li>
                  <li><span className="ctf-overview-timeline-label">Career Track:</span> 정보보안 분야의 진로 설계 및 커리어 개발에 대한 발표</li>
                </ul>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}

export default OverviewSection

